import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { AsnModels, PONumbers } from '../../Models/ASN';
import { RfqService } from 'src/app/services/rfq.service ';;
import { FormGroup, FormBuilder } from '@angular/forms';
import { Vendor } from '../../Models/RFQModel';
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-create-asn',
  templateUrl: './CreateASN.component.html'
})
export class CreateAsnComponent implements OnInit {
  items: MenuItem[];
  public asnItem = new AsnModels();
  public AsnfilterForm: FormGroup;
  public lstPONumbers: Array<PONumbers>;
  public ponumber: string;
  public Vendor: Vendor;
  public asnid: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService, public RfqService: RfqService, private messageService: MessageService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.Vendor = JSON.parse(localStorage.getItem("vendordetail"));
    this.asnItem = new AsnModels();
    this.asnItem.PO_ReferenceNo = "";
    this.route.params.subscribe(params => {
      if (params["ASNId"]) {
        this.asnid = params["ASNId"];
        this.getASNDetails();
      }
    });

    this.checkPOExist();
  }

  //get ASN Details
  getASNDetails() {
    this.spinner.show();
    this.RfqService.getAsnByAsnno(this.asnid).subscribe(data => {
      this.spinner.hide();
      this.asnItem = data;
    })
  }


  //submit ASN 
  submitAsn() {
    if (this.asnItem.PO_ReferenceNo == null || this.asnItem.PO_ReferenceNo == "") {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Select PO Reference No in ShipmentHeader' });
      return true;
    }

    else if (this.asnItem.HSNCode == null || this.asnItem.HSNCode == "") {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter  HSNCode in ShipmentHeader' });
      return true;
    }
    else if (this.asnItem.DeliveryDate == null) {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter Delivery Date in ShipmentHeader' });
      return true;
    }
    else if (this.asnItem.Qty == null || this.asnItem.Qty == 0) {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter Quantity in ShipmentHeader' });
      return true;
    }
    else if (this.asnItem.MeansOfTransport == null || this.asnItem.MeansOfTransport == "") {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter Means of Transport in ShipmentHeader ' });
      return true;
    }
    else if (this.asnItem.ShipFrom == null || this.asnItem.ShipFrom == "") {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter Ship From in Shipment Lines.' });
      return true;
    }
    else if (this.asnItem.ShipTo == null || this.asnItem.ShipTo == "") {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter Ship To in Shipment Lines.' });
      return true;
    }
    else if (this.asnItem.CustomerLocation == null || this.asnItem.CustomerLocation == "") {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Customer Location in Shipment Lines' });
      return true;
    }
    else if (this.asnItem.CountryOfOrigin == null || this.asnItem.CountryOfOrigin == "") {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Country Of Origin in Shipment Lines.' });
      return true;
    }
    else if (this.asnItem.OriginalPOItem == null || this.asnItem.OriginalPOItem == "") {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter Original PO Item in Item Details.' });
      return true;
    }
    else if (this.asnItem.CustomerBatchNo == null || this.asnItem.CustomerBatchNo == "") {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter Customer Batch No in Item Details.' });
      return true;
    }
    else {
      this.spinner.show();
      this.RfqService.InsertAsn(this.asnItem).subscribe(data => {
        this.spinner.hide();
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Asn Generated Sucessfully' });
        this.router.navigate(['VSCM/ASNList']);
      })
    }
  }

  //check po exist or not
  checkPOExist() {
    this.spinner.show();
    this.RfqService.getPONumbersbyVendor(this.Vendor.vendorId).subscribe(data => {
      this.spinner.hide();
      this.lstPONumbers = data;
      return this.lstPONumbers;
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
