import { Component, OnInit } from '@angular/core';
import { Vendor } from '../../../Models/mpr';
import { RfqService } from '../../services/rfq.service ';
import { PONumbers, DocDetailsList } from '../../ASN/create-asn/asn';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-polist',
  templateUrl: './polist.component.html',
  styleUrls: ['./polist.component.scss']
})
export class POListComponent implements OnInit {

  constructor(public RfqService: RfqService, private messageService: MessageService, private router: Router) { }
  public vendor: Vendor;
  public lstPONumbers: Array<PONumbers> = [];
 // public invoiceDetails: PONumbers;
  public AddDialogforitem = false;
  public ViewDialogforitem = false;
  public EditDialogforitem = false;
  public AddInvoice: FormGroup;
  public poNumber: number;
  public InvoiceNo: number;
  public Remarks: string;
  public PO = new PONumbers();
  public PONum: PONumbers;
  public Documents: DocDetailsList;
  fileList_Tax: File[] = [];
  listOfFiles_Tax: any[] = [];
  fileList_Other: File[] = [];
  listOfFiles_Other: any[] = [];
  fileList_Invoice: File[] = [];
  listOfFiles_Invoice: any[] = [];
  public txtInvoice = '';
  fileToUpload: File = null;
  public invoiceDocumentId: string;
  public taxDocumentId: string;
  public otherDocumentId: string;



  ngOnInit() {
    debugger;
    this.vendor = JSON.parse(localStorage.getItem("vendordetail"));
   // alert(this.vendor.vendorId);
    this.GetPOList();
  }


  GetPOList() {
    debugger;
    this.RfqService.getPONumbersbyVendor(this.vendor.vendorId).subscribe(data => {
      this.lstPONumbers = data;
     console.log(this.lstPONumbers);
     //   alert(this.lstPONumbers);
    return this.lstPONumbers;
    })
  }
  ShowAddDialog(poNumber: any) {
    debugger;
  //  alert(poNumber);
    this.AddDialogforitem = true;
    this.listOfFiles_Invoice = [];
    this.listOfFiles_Tax = [];
    this.listOfFiles_Other = [];
    this.poNumber = poNumber;
    this.txtInvoice = '';
    return this.poNumber;
    
  }

  ShowViewDialog(InvoiceNo: any) {
    alert(InvoiceNo);
    this.ViewDialogforitem = true;
    this.RfqService.getInvoiceByInvoiceNo(InvoiceNo).subscribe(data => {
      console.log(data);
      this.PO = data;
    });
  }

  ShowEditDialog(invoiceNo: any) {

    this.EditDialogforitem = true;
    this.RfqService.getInvoiceByInvoiceNo(invoiceNo).subscribe(data => {
      console.log(data);
      this.PO = data;
    });
  }

  CreateInvoice() {
    debugger;
    //var PONum = new PONumbers();
    this.PO.PONumber = this.poNumber;
    this.PO.VendorId = this.vendor.vendorId;
    this.PO.VuniqueId = this.vendor.VUniqueId;
    console.log(this.PO);
    this.RfqService.InsertInvoice(this.PO).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Invoice Generated Sucessfully' });
      this.AddDialogforitem = false;
      this.router.navigate(['VSCM/Invoice']);
    })
  }

  EditInvoice() {
    debugger;
    //this.PO.PONumber = this.poNumber;
    this.PO.VendorId = this.vendor.vendorId;
    this.PO.VuniqueId = this.vendor.VUniqueId;
    console.log(this.PO);
    this.RfqService.EditInvoice(this.PO).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Invoice Updated Sucessfully' });
      this.EditDialogforitem = false;
      this.router.navigate(['VSCM/Invoice']);
    })
  }

  fileattached_Tax(event: any) {
    debugger;
    let fileList: FileList = event.target.files;
    this.PO.DocumentTypeId = 2;
    if (this.taxDocumentId == undefined) {
      this.taxDocumentId = "0";
    }
    let idanddocid = "Tax_" + this.vendor.UserName + "_" + this.vendor.vendorId + "_docId" + this.taxDocumentId;
   // let idanddocid = this.PO.DocumentTypeId + "_" + 10;
    let formData: FormData = new FormData();
    if (fileList.length > 0) {

      for (let i = 0; i <= fileList.length - 1; i++) {
        this.Documents = new DocDetailsList();
        let file: File = fileList[i];
        formData.append(idanddocid, file, idanddocid + "_" + file.name);
        this.Documents.DocumentName = idanddocid + "_" + file.name;
        this.Documents.DocumentTypeId = this.PO.DocumentTypeId;
        this.PO.filedata = formData;
        this.PO.filedata;
        //this.Documents.uniqueid=this.uniqueid;
        this.PO.DocDetailsLists.push(this.Documents);
        //var selectedFile = this.file[i].filename;//event.target.files[i];
        this.fileList_Tax.push(file);
        this.listOfFiles_Tax.push(idanddocid + "_" + file.name)
      }
      this.RfqService.uploadFileInvoice(formData).subscribe(data => {
        this.taxDocumentId = data[0].DocumentId
      })
    }
  }

  fileattached_Invoice(event: any) {
    debugger;
    alert(this.invoiceDocumentId)
    let fileList: FileList = event.target.files;
    this.PO.DocumentTypeId = 1;
    if (this.invoiceDocumentId == undefined) {
      this.invoiceDocumentId = "0";
    }
    // let idanddocid = this.PO.DocumentTypeId + "_" + 10;
    let idanddocid = "Invoice_" + this.vendor.UserName + "_" + this.vendor.vendorId + "_docId" +this.invoiceDocumentId;
    let formData: FormData = new FormData();
    if (fileList.length > 0) {

      for (let i = 0; i <= fileList.length - 1; i++) {
        this.Documents = new DocDetailsList();
        let file: File = fileList[i];
        formData.append(idanddocid, file, idanddocid + "_" + file.name);
        this.Documents.DocumentName = idanddocid + "_" + file.name;
        this.Documents.DocumentTypeId = this.PO.DocumentTypeId;
        this.PO.filedata = formData;
        this.PO.filedata;
        this.Documents.DocumentId = this.invoiceDocumentId;
        //this.Documents.uniqueid=this.uniqueid;
        this.PO.DocDetailsLists.push(this.Documents);
        //var selectedFile = this.file[i].filename;//event.target.files[i];
        this.fileList_Invoice.push(file);
        this.listOfFiles_Invoice.push(idanddocid + "_" + file.name)
        this.RfqService.uploadFileInvoice(formData).subscribe(data => {
       //   console.log(data);
        //  alert(data);
          this.invoiceDocumentId = data[0].DocumentId;
         // alert("document Id: " +data[0].DocumentId);
        })
      }
     
    }
  }

  fileattached_Other(event: any) {
    debugger;
    let fileList: FileList = event.target.files;
    this.PO.DocumentTypeId = 3;
    if (this.otherDocumentId == undefined) {
      this.otherDocumentId = "0";
    }

    let idanddocid = "Other_" + this.vendor.UserName + "_" + this.vendor.vendorId + "_docId" + this.otherDocumentId + "_docName" + this.PO.DocumentName;
   // let idanddocid = this.PO.DocumentTypeId + "_" + 10;
    let formData: FormData = new FormData();
    if (fileList.length > 0) {

      for (let i = 0; i <= fileList.length - 1; i++) {
        this.Documents = new DocDetailsList();
        let file: File = fileList[i];
        formData.append(idanddocid, file, idanddocid + "_" + file.name);
        this.Documents.DocumentName = idanddocid + "_" + file.name;
        this.Documents.DocumentTypeId = this.PO.DocumentTypeId;
        this.PO.filedata = formData;
        this.PO.filedata;
        this.PO.DocDetailsLists.push(this.Documents);
        this.fileList_Other.push(file);
        this.listOfFiles_Other.push(idanddocid + "_" + file.name)
        this.RfqService.uploadFileInvoice(formData).subscribe(data => {
          this.otherDocumentId = data[0].DocumentId;
        })
      }
    }
  }

  removeSelectedFileInvoice(selected, index) {

  }

  //removeSelectedFileForItem(filename: any, index) {
  //  // Delete the item from fileNames list
  //  this.listOfFiles1.splice(index, 1);
  //  this.Registration.PhysicalPath = filename.Path;
  //  this.fileList1.splice(index, 1);

  //  this.mprdoc.RevisionId = this.RfqRevisionId;
  //  this.mprdoc.UploadedBy = this.Vendor.VUniqueId;
  //  let path = filename.Path.split('\\');
  //  let path1 = path[0].split('_');
  //  this.mprdoc.DocumentName = path[1];
  //  this.mprdoc.Path = filename.Path;
  //  this.mprdoc.ItemDetailsId = path1[1];
  //  this.RfqService.DeleteFile(this.Registration).subscribe(data => {
  //    this.RfqService.DeleteFileFrmYSCM(this.mprdoc).subscribe(data => {
  //      this.loadQuotationDetails();
  //    })
  //  })

  //}
}
