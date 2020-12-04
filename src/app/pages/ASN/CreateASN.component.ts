import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { AsnModels, PONumbers } from '../../Models/ASN';
import { RfqService } from 'src/app/services/rfq.service ';;
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Vendor, DynamicSearchResult } from '../../Models/RFQModel';
import { NgxSpinnerService } from 'ngx-spinner'
import { constants } from '../../models/RFQConstants'

@Component({
  selector: 'app-create-asn',
  templateUrl: './CreateASN.component.html'
})
export class CreateAsnComponent implements OnInit {
  public CreatASN: FormGroup;
  public ASNSubmitted: boolean = false;
  public disableSubmit: boolean = true;
  public dynamicData = new DynamicSearchResult();
  public asnItem = new AsnModels();
  public AsnfilterForm: FormGroup;
  public lstPONumbers: Array<PONumbers>;
  public ponumber: string;
  public Vendor: Vendor;
  public asnid: number = 0;
  public RemoteASNItemDetails: Array<any> = [];
  public selectedItemDetailsList: Array<any> = [];
  public IncoTermsList: Array<any> = [];
  public ModeOfTransportList: Array<any> = [];

  constructor(public constants: constants, private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService, public RfqService: RfqService, private messageService: MessageService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.Vendor = JSON.parse(localStorage.getItem("vendordetail"));
    this.asnItem = new AsnModels();
    this.asnItem.PONo = "";
    this.asnItem.ShipFrom = this.Vendor.Street;

    this.CreatASN = this.formBuilder.group({
      PONo: ['', [Validators.required]],
      InvoiceNo: ['', [Validators.required]],
      InvoiceDate: ['', [Validators.required]],
      ShipFrom: ['', [Validators.required]],
      ShipTo: ['', [Validators.required]],
      ShippingDate: ['', [Validators.required]],
      DeliveryDate: ['', [Validators.required]],
      FreightInvNo: ['', [Validators.required]],
      TransporterName: ['', [Validators.required]],
      BillofLodingNumber: ['', [Validators.required]],
      IncotermLoc: ['', [Validators.required]],
      IncoTerm: ['', [Validators.required]],
      IncotermDescription: ['', [Validators.required]],
      ModeOfTransport: ['', [Validators.required]],
      DeliveryNote: ['', [Validators.required]],
      TotalGrossWeight_Kgs: ['', [Validators.required]],
      TotalNetWeight_Kgs: ['', [Validators.required]],
      TotalVolume: ['', [Validators.required]],
      Insurance: ['', [Validators.required]],
    });

    this.CreatASN.controls['IncotermDescription'].clearValidators();

    this.route.params.subscribe(params => {
      if (params["ASNId"]) {
        this.asnid = params["ASNId"];
        this.getASNDetails();
      }
    });
    this.getIncoTerms();
    this.getModeofTransport();
    this.getPoDetails();
  }

  getIncoTerms() {
    this.dynamicData = new DynamicSearchResult();
    this.dynamicData.query = "select * from IncoTerms  where DeleteFlag =0 order by SortBy asc";
    this.RfqService.getDBMastersList(this.dynamicData).subscribe(data => {
      this.IncoTermsList = data;
    })
  }

  getModeofTransport() {
    this.dynamicData = new DynamicSearchResult();
    this.dynamicData.query = "select * from ModeOfTransport  where DeleteFlag =0 order by SortBy asc";
    this.RfqService.getDBMastersList(this.dynamicData).subscribe(data => {
      this.ModeOfTransportList = data;
    })
  }
  //get ASN Details
  getASNDetails() {
    this.spinner.show();
    this.RfqService.getAsnByAsnno(this.asnid).subscribe(data => {
      this.spinner.hide();
      this.asnItem = data;
      this.RemoteASNItemDetails = this.asnItem.RemoteASNItemDetails;
    })
  }


  onIncoTermChange() {
    if (this.asnItem.IncoTerm == "Other") {
      this.CreatASN.controls['IncotermDescription'].setValidators([Validators.required]);
    }
    else {
      this.CreatASN.controls['IncotermDescription'].clearValidators();
      this.asnItem.IncotermDescription = "";
    }
    this.CreatASN.controls['IncotermDescription'].updateValueAndValidity();
  }

  checkQuantity(details: any) {

    if (!details.PoCumulativeQty && (details.ASNQty > (details.POQty))) {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Entered ASN Quantity should not be greater than PO Qty ' });
      return;
    }
    if (details.PoCumulativeQty && details.ASNQty > details.PoCumulativeQty) {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Entered ASN Quantity should not be greater than PO Cumulative Qty' });
      return;
    }
  }

  //check box selection event
  selectItemList(event: any, details: any,id:any) {
    var index = this.RemoteASNItemDetails.findIndex(x => x.rfqitemsid == details.rfqitemsid);
    if (event.target.checked == true) {
      if (!details.ASNQty) {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter ASN Quantity' });
        (<HTMLInputElement>document.getElementById("Item" + id)).checked = false;
        return;
      }
      this.selectedItemDetailsList.push(details);
    }
    else {
      this.selectedItemDetailsList.splice(index, 1);
    }
  }
  //agree inputs
  agreeInputs(event: any) {
    if (event.target.checked == true)
      this.disableSubmit = false;
    else
      this.disableSubmit = true;
  }
  //submit ASN 
  submitAsn() {
    this.ASNSubmitted = true;
    if (this.CreatASN.invalid) {
      return;
    }
    if (this.selectedItemDetailsList.length <= 0) {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Select at least one Item' });
      return;
    }
    this.asnItem.VendorId = this.Vendor.vendorId;
    this.asnItem.CreatedBy = this.Vendor.VUniqueId;
    this.asnItem.RemoteASNItemDetails = this.selectedItemDetailsList;
    this.spinner.show();
    this.RfqService.InsertandEditAsn(this.asnItem).subscribe(data => {
      this.spinner.hide();
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Asn Generated Sucessfully' });
      this.router.navigate(['VSCM/ASNList']);
    })

  }

  //get po detai;s
  getPoDetails() {
    this.spinner.show();
    this.RfqService.getPONumbersbyVendor(this.Vendor.vendorId).subscribe(data => {
      this.spinner.hide();
      this.lstPONumbers = data;
    })

  }
  getItemDetailsByPoNo() {
    this.spinner.show();
    this.RfqService.getItemDetailsByPoNo(this.asnItem.PONo).subscribe(data => {
      this.spinner.hide();
      this.RemoteASNItemDetails = data;
    })
  }


  //date format
  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }

}
