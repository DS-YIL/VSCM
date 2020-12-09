import { Component, OnInit } from '@angular/core';
import { Vendor } from '../../Models/RFQModel';
import { RfqService } from 'src/app/services/rfq.service ';
import { stagPoNumbers, InvoiceDetails, InvoiceDocuments } from '../../Models/ASN';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { constants } from '../../Models/RFQConstants';

@Component({
  selector: 'app-invoiceList',
  templateUrl: './InvoiceList.component.html',
  styleUrls: ['./InvoiceList.component.scss']
})
export class InvoiceListComponent implements OnInit {

  constructor(public RfqService: RfqService, private messageService: MessageService, public constants: constants, private spinner: NgxSpinnerService, private router: Router) { }
  public VendorDetails: Vendor;
  public poInvoiceList: Array<stagPoNumbers> = [];
  public AddEditDialog = false;
  public InvoiceDetails: InvoiceDetails;
  public InvoiceDocuments: InvoiceDocuments;
  public disableTaxDoc; disableInvoiceDoc; isEdit: boolean;


  ngOnInit() {
    this.VendorDetails = JSON.parse(localStorage.getItem("vendordetail"));
    this.InvoiceDetails = new InvoiceDetails();
    this.InvoiceDetails.InvoiceDocuments = [];
    this.GetPOList();
  }


  GetPOList() {
    this.spinner.show();
    this.RfqService.getPOInvoiceDetailsbyVendor(this.VendorDetails.vendorId).subscribe(data => {
      this.spinner.hide()
      this.poInvoiceList = data;
    })
  }

  ShowAddDialog(poDetails: any) {
    this.isEdit = false;
    this.InvoiceDetails = new InvoiceDetails();
    this.InvoiceDetails.PONo = poDetails.PONo;
    this.InvoiceDetails.VendorId = this.VendorDetails.vendorId;
    this.InvoiceDetails.CreatedBy = this.VendorDetails.VUniqueId;
    this.AddEditDialog = true;
  }


  //Edit invoice details
  ShowEditDialog(invoiceDetails: any) {
    this.isEdit = true;
    this.AddEditDialog = true;
    this.InvoiceDetails = invoiceDetails;
    this.diablesDocs();
  }

  diablesDocs() {
    if (this.InvoiceDetails.InvoiceDocuments.filter(li => li.DocumentTypeId == 1).length >= 1)
      this.disableInvoiceDoc = true;
    else
      this.disableInvoiceDoc = false;
    if (this.InvoiceDetails.InvoiceDocuments.filter(li => li.DocumentTypeId == 2).length >= 1)
      this.disableTaxDoc = true;
    else
      this.disableTaxDoc = false;

  }
  //create update invoice data
  UpdateInvoice() {
    this.spinner.show();
    this.RfqService.UpdateInvoice(this.InvoiceDetails).subscribe(data => {
      this.spinner.hide();
      if (this.isEdit == false)
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Invoice Generated' });
      if (this.isEdit == true)
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Invoice Updated' });
      this.AddEditDialog = false;
      this.GetPOList();
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
        this.InvoiceDocuments = new InvoiceDocuments();
        this.InvoiceDocuments.UploadedBy = this.VendorDetails.VUniqueId;
        this.InvoiceDocuments.DocumentName = idanddocid + "_" + file.name;
        this.InvoiceDocuments.DocumentTypeId = docTypeId;
        this.InvoiceDocuments.Path = data;
        this.InvoiceDetails.InvoiceDocuments.push(this.InvoiceDocuments);
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
      var index1 = this.InvoiceDetails.InvoiceDocuments.findIndex(x => x.DocumentId == document.DocumentId);
      this.spinner.show();
      this.RfqService.DeleteInvoiceFile(document.DocumentId).subscribe(data => {
        this.spinner.hide();
        if (data) {
          this.InvoiceDetails.InvoiceDocuments.splice(index1, 1);
          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Deleted' });
        }
      });
    }
    else {
      this.InvoiceDetails.InvoiceDocuments.splice(index, 1);
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Deleted' });
    }
  }

}
