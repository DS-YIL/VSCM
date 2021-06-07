import { Component, OnInit } from '@angular/core';
import { RfqService } from 'src/app/services/rfq.service ';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner'
import { MessageService } from 'primeng/api';
import { constants } from 'src/app/Models/RFQConstants';
import { Employee, Vendor, BankGuarantee, RemoteBGDocument } from 'src/app/Models/RFQModel';

@Component({
  selector: 'app-bg-view',
  templateUrl: './BGView.component.html'
})
export class BGViewComponent implements OnInit {

  public employee: Employee;
  public VendorDetails: Vendor;
  public BGItem = new BankGuarantee();
  public bgid: number = 0;
  public RemoteBGDocuments = new RemoteBGDocument();
  constructor(public RfqService: RfqService, private router: Router, private route: ActivatedRoute, private messageService: MessageService, public constants: constants, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    if (localStorage.getItem("vendordetail"))
      this.VendorDetails = JSON.parse(localStorage.getItem("vendordetail"));
    else {
      this.router.navigateByUrl("Login");
      return true;
    }
    this.BGItem = new BankGuarantee();
    this.route.params.subscribe(params => {
      this.bgid = this.constants.decrypt(params["BGId"]);
      this.getBGDetails();
    });

  }

  //get BG Details
  getBGDetails() {
    this.spinner.show();
    this.RfqService.getBGDetails(this.bgid).subscribe(data => {
      this.spinner.hide();
      this.BGItem = data;
    })
  }

  //update BG data
  onBGUpdate() {
    
    if (!this.BGItem.BGSerialNo) {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter BG Serial No' });
      return;
    }
    if (!this.BGItem.WarrantyExpiryDate) {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Select Warranty Expiry Date' });
      return;
    }
    if (!this.BGItem.BGDate) {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Select BG Date' });
      return;
    }
    if (!this.BGItem.BGValue) {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter BG Value' });
      return;
    }
    if (!this.BGItem.BGExpiryDate) {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Select BGExpiry Date' });
      return;
    }
    if (!this.BGItem.ClaimDate) {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Select Claim Date' });
      return;
    }
    if (!this.BGItem.Items) {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter Items' });
      return;
    }

    if (this.BGItem.RemoteBGDocuments.length <= 0) {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Select Supporting Document' });
      return;
    }
    this.BGItem.CreatedBy = this.VendorDetails.VUniqueId;
    this.spinner.show();
    this.RfqService.updateBG(this.BGItem).subscribe(data => {
      this.spinner.hide();
      if (data)
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'BG Submitted' });   
      this.BGItem = data;
    })
  }

  fileattached(event: any, docTypeId: any) {
    let fileList: FileList = event.target.files;
    let idanddocid = this.VendorDetails.VUniqueId + "_" + this.VendorDetails.vendorId + "_" + docTypeId + "_" + "BG";
    // let idanddocid = this.PO.DocumentTypeId + "_" + 10;
    let formData: FormData = new FormData();
    if (fileList.length > 0) {
      let file: File = fileList[0];
      formData.append(idanddocid, file, idanddocid + "_" + file.name);
      this.spinner.show();
      this.RfqService.uploadFile(formData).subscribe(data => {
        this.spinner.hide();
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'File inserted' });
        this.RemoteBGDocuments = new RemoteBGDocument();
        this.RemoteBGDocuments.UploadedBy = this.VendorDetails.VUniqueId;
        this.RemoteBGDocuments.DocumentName = idanddocid + "_" + file.name;
        this.RemoteBGDocuments.Path = data;
        this.BGItem.RemoteBGDocuments.push(this.RemoteBGDocuments);
      })
    }
  }
  removeSelectedFile(document: any, index: any) {
    if (document.DocId) {
      var index1 = this.BGItem.RemoteBGDocuments.findIndex(x => x.DocId == document.DocId);
      this.spinner.show();
      this.RfqService.DeleteBGFile(document.DocId).subscribe(data => {
        this.spinner.hide();
        if (data) {
          this.BGItem.RemoteBGDocuments.splice(index1, 1);
          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Deleted' });
        }
      });
    }
    else {
      this.BGItem.RemoteBGDocuments.splice(index, 1);
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Deleted' });
    }
  }

  viewDocument(path: string) {
    var path1 = path.replace(/\\/g, "/");
    path1 = this.constants.Documnentpath + path1;
    window.open(path1);
  }
  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }
}
