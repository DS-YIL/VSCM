import { Component, OnInit } from '@angular/core';
import { Vendor } from '../../Models/RFQModel';
import { RfqService } from 'src/app/services/rfq.service ';
import { stagPoNumbers, RemoteInvoiceDetails, RemoteInvoiceDocuments, AsnModels } from '../../Models/ASN';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { constants } from '../../Models/RFQConstants';

@Component({
  selector: 'app-invoice',
  templateUrl: './Invoice.component.html'
})
export class InvoiceComponent implements OnInit {

  constructor(public RfqService: RfqService, private messageService: MessageService, private route: ActivatedRoute, public constants: constants, private spinner: NgxSpinnerService, private router: Router) { }
  public VendorDetails: Vendor;
  public poInvoiceList: Array<any> = [];
  public AddEditDialog = false;
  public RemoteInvoiceDetails: RemoteInvoiceDetails;
  public RemoteInvoiceDocuments: RemoteInvoiceDocuments;
  public disableTaxDoc; disableInvoiceDoc; isEdit: boolean;
  public ASNId: number;
  public asnItem = new AsnModels();

  ngOnInit() {
    this.VendorDetails = JSON.parse(localStorage.getItem("vendordetail"));
    this.RemoteInvoiceDetails = new RemoteInvoiceDetails();
    this.RemoteInvoiceDetails.RemoteInvoiceDocuments = [];
    this.route.params.subscribe(params => {
      if (params["ASNId"]) {
        this.ASNId = params["ASNId"];
        this.getASNDetails();

      }
    });
  }


  getASNDetails() {
    this.spinner.show();
    this.RfqService.getAsnByAsnno(this.ASNId).subscribe(data => {
      this.spinner.hide();
      this.asnItem = data;
      //var arr = this.asnItem.RemoteASNItemDetails.map(({ PONo }) => PONo)
      //arr = arr.filter(function (item, index, inputArray) {
      //  return inputArray.indexOf(item) == index;
      //});
      //this.asnItem.PONo = arr.toString();
      this.RemoteInvoiceDetails.InvoiceNo = this.asnItem.InvoiceNo;
      this.RemoteInvoiceDetails.ASNId = this.ASNId;
      this.GetInvoiceDetails();
    })
  }

  GetInvoiceDetails() {
    this.spinner.show();
    this.RfqService.GetInvoiceDetails(this.RemoteInvoiceDetails).subscribe(data => {
      this.spinner.hide()
      if (data)
        this.RemoteInvoiceDetails = data;
    })
  }


  diablesDocs() {
    if (this.RemoteInvoiceDetails.RemoteInvoiceDocuments.filter(li => li.DocumentTypeId == 1).length >= 1)
      this.disableInvoiceDoc = true;
    else
      this.disableInvoiceDoc = false;
    if (this.RemoteInvoiceDetails.RemoteInvoiceDocuments.filter(li => li.DocumentTypeId == 2).length >= 1)
      this.disableTaxDoc = true;
    else
      this.disableTaxDoc = false;

  }
  //create update invoice data
  UpdateInvoice() {
    if (this.RemoteInvoiceDetails.RemoteInvoiceDocuments.filter(li => li.DocumentTypeId == 1).length <= 0) {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Select Tax Invoice' });
      return;
    }
    if (!this.RemoteInvoiceDetails.LRRemarks && this.RemoteInvoiceDetails.RemoteInvoiceDocuments.filter(li => li.DocumentTypeId == 4).length <= 0) {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Select Either LR/AWB/Courier Docket/B/L Remarks or Document' });
      return;
    }
    //if (this.RemoteInvoiceDetails.RemoteInvoiceDocuments.filter(li => li.DocumentTypeId == 5).length <= 0) {
    //  this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Select Freight Invoice' });
    //  return;
    //}
    if (this.RemoteInvoiceDetails.RemoteInvoiceDocuments.filter(li => li.DocumentTypeId == 6).length <= 0) {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Select Test Certificates' });
      return;
    }
    //if (this.RemoteInvoiceDetails.RemoteInvoiceDocuments.filter(li => li.DocumentTypeId == 8).length <= 0) {
    //  this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Select Bank Guarantee' });
    //  return;
    //}

    this.spinner.show();
    this.RemoteInvoiceDetails.CreatedBy = this.VendorDetails.VUniqueId;
    this.RemoteInvoiceDetails.VendorId = this.VendorDetails.vendorId;
    this.RemoteInvoiceDetails.InvoiceNo = this.asnItem.InvoiceNo;
    this.RemoteInvoiceDetails.ASNId = this.ASNId;
    this.RfqService.UpdateInvoice(this.RemoteInvoiceDetails).subscribe(data => {
      this.spinner.hide();
      if (this.isEdit == false)
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Invoice Generated' });
      if (this.isEdit == true)
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Invoice Updated' });
      this.AddEditDialog = false;
      this.GetInvoiceDetails();
    })
  }


  fileattached(event: any, docTypeId: any) {
    let fileList: FileList = event.target.files;

    let idanddocid = this.VendorDetails.VUniqueId + "_" + this.VendorDetails.vendorId + "_" + docTypeId + "_" + "Invoice";
    // let idanddocid = this.PO.DocumentTypeId + "_" + 10;
    let formData: FormData = new FormData();
    if (fileList.length > 0) {
      let file: File = fileList[0];
      formData.append(idanddocid, file, idanddocid + "_" + file.name);
      this.spinner.show();
      this.RfqService.uploadFile(formData).subscribe(data => {
        this.spinner.hide();
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'File inserted' });
        this.RemoteInvoiceDocuments = new RemoteInvoiceDocuments();
        this.RemoteInvoiceDocuments.UploadedBy = this.VendorDetails.VUniqueId;
        this.RemoteInvoiceDocuments.DocumentName = idanddocid + "_" + file.name;
        this.RemoteInvoiceDocuments.DocumentTypeId = docTypeId;
        this.RemoteInvoiceDocuments.Path = data;
        this.RemoteInvoiceDetails.RemoteInvoiceDocuments.push(this.RemoteInvoiceDocuments);
        this.diablesDocs();
      })
    }
  }

  viewDocument(path: string) {
    var path1 = path.replace(/\\/g, "/");
    path1 = this.constants.Documnentpath + path1;
    window.open(path1);
  }


  removeSelectedFile(document: any, index: any) {
    if (document.DocumentId) {
      var index1 = this.RemoteInvoiceDetails.RemoteInvoiceDocuments.findIndex(x => x.DocumentId == document.DocumentId);
      this.spinner.show();
      this.RfqService.DeleteInvoiceFile(document.DocumentId).subscribe(data => {
        this.spinner.hide();
        if (data) {
          this.RemoteInvoiceDetails.RemoteInvoiceDocuments.splice(index1, 1);
          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Deleted' });
        }
      });
    }
    else {
      this.RemoteInvoiceDetails.RemoteInvoiceDocuments.splice(index, 1);
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Deleted' });
    }
  }

}
