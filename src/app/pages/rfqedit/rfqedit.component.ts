import { Component, Input, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { RfqService } from 'src/app/services/rfq.service ';
import { QuoteDetails } from 'src/app/Models/rfq';
import { constants } from 'src/app/Models/MPRConstants';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, Vendor, DynamicSearchResult } from 'src/app/Models/mpr'
import { MPRDocument, RfqItemModel, RfqItemInfoModel, RFQUnitMasters, RFQCurrencyMaster, RFQDocuments, RFQTerms } from '../../Models/rfq';;
import { MessageService } from 'primeng/api';
import * as CryptoJS from 'crypto-js';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-rfqedit',
  templateUrl: './rfqedit.component.html',
  styleUrls: ['./rfqedit.component.scss']
})
export class RFQEditComponent implements OnInit {
  orders = [];
  constructor(private messageService: MessageService, private formBuilder: FormBuilder, private spinner: NgxSpinnerService,public constants: constants, private route: ActivatedRoute, public RfqService: RfqService, private router: Router) { }
  @ViewChild('attachments', { static: false }) attachment: any;
  isDisableddoctype: boolean = true;
  selectedFile: File;
  fileList: File[] = [];
  listOfFiles: any[] = [];
  fileList1: File[] = [];
  listOfFiles1: any[] = [];
  public RFQTerms: RFQTerms;
  public RfqRevisionId: number = 0;
  public VendorQuotation; AddQuotation: FormGroup;
  public dynamicData = new DynamicSearchResult();
  public VQAddSubmitted: boolean = false;
  public AddDialog: boolean;
  public showDiscount: string;
  public responseAgree: string;
  public showTaxDuty: string;
  public showGST: string;
  public quoteDetails = new QuoteDetails();
  public docDetails: QuoteDetails;
  public technicaldocDetails: QuoteDetails;
  public rfqitemsid: number = 0;
  public quotedata = [];
  public quoteDetailsforterms = [];
  public rfqDocuments: RFQDocuments;
  public UOMArray: any[] = [];
  public UOMModel: RFQUnitMasters;
  mprdoc: MPRDocument = new MPRDocument();
  //public currncyArray: Array<RFQCurrencyMaster> = [];
  currncyArray: any[] = [];
  public currncyModel: RFQCurrencyMaster;
  public rfqItem: RfqItemModel;
  public rfqItemsresult: RfqItemModel;
  public rfqItemInfo: RfqItemInfoModel;
  public rfqItemId: string;
  documents: QuoteDetails = new QuoteDetails();
  TermsList: any[] = [];
  DocumentListMaster: any[] = [];
  public Vendor: Vendor;
  public Documents: RFQDocuments;
  public drpdwnId: string;
  isDisabledRemarks: boolean = true;
  RFQTerm: RFQTerms = new RFQTerms();
  public VendorTermsList: any[] = [];
  public istermsdisplay: boolean = false;
  public DESkey: string;
  Registration: RfqItemModel = new RfqItemModel();

  ngOnInit() {
    if (!localStorage.getItem("AccessToken")) {
      localStorage.removeItem("AccessToken");
      this.router.navigateByUrl("Login");
    }
    else
      this.GetdocumentListMaster();

    //  this.RFQTermListdata();
    this.Vendor = JSON.parse(localStorage.getItem("vendordetail"));
    debugger;
    this.route.params.subscribe(params => {
      if (params["RFQRevisionId"]) {
        this.RfqRevisionId = this.decrypt(params["RFQRevisionId"]);
      }
    });
    this.gettermsandconds();
    this.rfqItem = new RfqItemModel();
    this.rfqItemInfo = new RfqItemInfoModel();
    this.UOMArray = [];
    this.UOMModel = new RFQUnitMasters();

    this.loadCurrency();
    this.loadUOM();
    //this.currncyArray = [];
    this.currncyModel = new RFQCurrencyMaster();

    this.loadQuotationDetails();
    //this.loaddocDetailsbyitemsid();
    this.loaddocDetails();
    //this.VendorQuotation = this.formBuilder.group({
    //});
    //this.orders = this.getOrders();

    this.AddQuotation = this.formBuilder.group({
      orders: [''],
      Qty: ['', [Validators.required]],
      UOM: ['', [Validators.required]],
      CurrencyId: ['', [Validators.required]],
      UnitPrice: ['', [Validators.required]],
      DiscountOption: ['', [Validators.required]],
      DiscountPercentage: ['', [Validators.required]],
      Discount: ['', [Validators.required]],
      HSNCode: ['', [Validators.required]],
      VendorModelNo: ['', [Validators.required]],
      MfgPartNo: ['', [Validators.required]],
      MfgModelNo: ['', [Validators.required]],
      ManufacturerName: ['', [Validators.required]],
      CGSTPercentage: ['', [Validators.required]],
      SGSTPercentage: ['', [Validators.required]],
      PFPercentage: ['', [Validators.required]],
      PFAmount: ['', [Validators.required]],
      FreightPercentage: ['', [Validators.required]],
      FreightAmount: ['', []],
      DeliveryDate: ['', [Validators.required]],
      Remarks: ['', [Validators.required]],
      IGSTPercentage: ['', [Validators.required]],
    });
  }

  decrypt(data) {
    this.DESkey = "123456$#@$^@1ERF";
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.DESkey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  // IGSTPercentageenable(){
  //   if (this.AddQuotation.controls['IGSTPercentage'].value != ""){
  //     this.AddQuotation.controls['SGSTPercentage'].setValue("");
  //     this.AddQuotation.controls['CGSTPercentage'].setValue("");
  //     // this.AddQuotation.controls['SGSTPercentage'].clearValidators();
  //     // this.AddQuotation.controls['CGSTPercentage'].clearValidators();
  //     this.AddQuotation.controls['SGSTPercentage'].updateValueAndValidity();
  //     this.AddQuotation.controls['CGSTPercentage'].updateValueAndValidity();
  //     //this.AddQuotation.controls['CGSTPercentage'].clearValidators();
  //     //alert("data");
  //   }

  // }

  FreightAmount() {
    if (this.AddQuotation.controls['FreightAmount'].value != "" || this.AddQuotation.controls['FreightAmount'].value == "0") {
      this.AddQuotation.controls['FreightPercentage'].setValue("");
      this.AddQuotation.controls['FreightPercentage'].clearValidators();
      this.AddQuotation.controls['FreightPercentage'].disable();
    }
    this.AddQuotation.controls['FreightPercentage'].updateValueAndValidity();
  }
  FreightPercentage() {
    if (this.AddQuotation.controls['FreightPercentage'].value != "" || this.AddQuotation.controls['FreightPercentage'].value == "0") {
      this.AddQuotation.controls['FreightAmount'].setValue("");
      this.AddQuotation.controls['FreightAmount'].clearValidators();
      this.AddQuotation.controls['FreightAmount'].disable();
    }
    this.AddQuotation.controls['FreightAmount'].updateValueAndValidity();
  }
  PFPercentage() {
    if (this.AddQuotation.controls['PFPercentage'].value != "" || this.AddQuotation.controls['PFPercentage'].value == "0") {
      this.AddQuotation.controls['PFAmount'].setValue("");
      this.AddQuotation.controls['PFAmount'].clearValidators();
      this.AddQuotation.controls['PFAmount'].disable();
    }
    this.AddQuotation.controls['PFAmount'].updateValueAndValidity();
  }
  PFAmount() {
    if (this.AddQuotation.controls['PFAmount'].value != "" || this.AddQuotation.controls['PFAmount'].value == "0") {
      this.AddQuotation.controls['PFPercentage'].setValue("");
      this.AddQuotation.controls['PFPercentage'].clearValidators();
      this.AddQuotation.controls['PFPercentage'].disable();
    }
    this.AddQuotation.controls['PFPercentage'].updateValueAndValidity();
  }
  IGSTEnablefromSGST() {
    if (this.AddQuotation.controls['SGSTPercentage'].value != "" || this.AddQuotation.controls['SGSTPercentage'].value == "0") {
      this.AddQuotation.controls['IGSTPercentage'].setValue("");
      this.AddQuotation.controls['IGSTPercentage'].clearValidators();
      this.AddQuotation.controls['IGSTPercentage'].updateValueAndValidity();
      this.AddQuotation.controls['IGSTPercentage'].disable()
    }
  }
  IGSTEnablefromCGST() {
    if (this.AddQuotation.controls['CGSTPercentage'].value != "" || this.AddQuotation.controls['CGSTPercentage'].value == "0") {
      this.AddQuotation.controls['IGSTPercentage'].setValue("");
      this.AddQuotation.controls['IGSTPercentage'].clearValidators();
      this.AddQuotation.controls['IGSTPercentage'].updateValueAndValidity();
      this.AddQuotation.controls['IGSTPercentage'].disable()
    }
  }
  IGSTPercentageenable() {
    if (this.AddQuotation.controls['IGSTPercentage'].value != "" || this.AddQuotation.controls['IGSTPercentage'].value == "0") {
      this.AddQuotation.controls['SGSTPercentage'].setValue("");
      this.AddQuotation.controls['CGSTPercentage'].setValue("");
      this.AddQuotation.controls['SGSTPercentage'].clearValidators();
      this.AddQuotation.controls['CGSTPercentage'].clearValidators();
      this.AddQuotation.controls['SGSTPercentage'].updateValueAndValidity();
      this.AddQuotation.controls['CGSTPercentage'].updateValueAndValidity();
      this.AddQuotation.controls['SGSTPercentage'].disable();
      this.AddQuotation.controls['CGSTPercentage'].disable();
      //this.AddQuotation.controls['CGSTPercentage'].clearValidators();
      //alert("data");
    }
  }

  boolDiscount(event) {
    if (this.showDiscount == 'true') {
      this.AddQuotation.controls['DiscountPercentage'].setValidators([Validators.required]);
      this.AddQuotation.controls['Discount'].setValidators([Validators.required]);

    }
    else if (this.showDiscount == 'false') {
      this.AddQuotation.controls['DiscountPercentage'].setValue("");
      this.AddQuotation.controls['Discount'].setValue("");
      this.AddQuotation.controls['DiscountPercentage'].clearValidators();
      this.AddQuotation.controls['Discount'].clearValidators();
    }
    this.AddQuotation.controls['DiscountPercentage'].updateValueAndValidity();
    this.AddQuotation.controls['Discount'].updateValueAndValidity();
  }
  boolDiscountonload(event) {
    if (this.rfqItemInfo.Discount == "0" && this.rfqItemInfo.DiscountPercentage == "0") {
      this.AddQuotation.controls['DiscountPercentage'].setValue("");
      this.AddQuotation.controls['Discount'].setValue("");
    }

    if (this.showDiscount == 'true') {
      this.AddQuotation.controls['DiscountPercentage'].setValidators([Validators.required]);
      this.AddQuotation.controls['Discount'].setValidators([Validators.required]);

    }
    else if (this.showDiscount == 'false') {
      this.AddQuotation.controls['DiscountPercentage'].setValue("");
      this.AddQuotation.controls['Discount'].setValue("");
      this.AddQuotation.controls['DiscountPercentage'].clearValidators();
      this.AddQuotation.controls['Discount'].clearValidators();
    }
    // this.AddQuotation.controls['DiscountPercentage'].updateValueAndValidity();
    // this.AddQuotation.controls['Discount'].updateValueAndValidity();
  }
  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }
  GetdocumentListMaster() {
    this.RfqService.GetDocumentMasterList().
      subscribe(
        res => {
          //this._list = res; //save posts in array
          this.DocumentListMaster = res;
          let _list: any[] = [];
          for (let i = 0; i < (res.length); i++) {
            _list.push({
              DocumentTypeName: res[i].DocumentTypeName,
              DocumenTypeId: res[i].DocumenTypeId
            });
          }
          this.DocumentListMaster = _list;
        });
  }
  Cancel() {
    this.AddDialog = false;
  }
  onChangedoctype(id: string) {
    if (id != "0") {
      this.isDisableddoctype = false;
      //document.getElementById('fileattach1').setAttribute('disabled','false')
    }
    else {
      this.isDisableddoctype = true;

    }
  }
  Adddoc() {
    document.getElementById('docadddiv').style.display = "block";
  }
  removeSelectedFile(filename: any, index) {
    // Delete the item from fileNames list
    this.listOfFiles.splice(index, 1);
    this.Registration.PhysicalPath = filename;
    this.fileList.splice(index, 1);
    this.mprdoc.RevisionId = this.RfqRevisionId;

    this.mprdoc.UploadedBy = this.Vendor.VUniqueId;
    let path = filename.split('\\');
    let path1 = path[0].split('_');
    this.mprdoc.DocumentName = path[1];
    this.mprdoc.Path = filename;
    this.mprdoc.ItemDetailsId = path1[1];
    this.RfqService.DeleteFile(this.Registration).subscribe(data => {
      this.RfqService.DeleteFileFrmYSCM(this.mprdoc).subscribe(data => {
      })
    })

  }
  removeFile(filename: any, index) {
    // Delete the item from fileNames list
    this.listOfFiles.splice(index, 1);
    this.Registration.PhysicalPath = filename;
    this.rfqItem.iteminfo.splice(index, 1);
    this.mprdoc.RevisionId = this.RfqRevisionId;

    this.mprdoc.UploadedBy = this.Vendor.VUniqueId;
    let path = filename.split('\\');
    let path1 = path[0].split('_');
    this.mprdoc.DocumentName = path[1];
    this.mprdoc.Path = filename;
    this.mprdoc.ItemDetailsId = path1[1];
    this.RfqService.DeleteFile(this.Registration).subscribe(data => {
      this.RfqService.DeleteFileFrmYSCM(this.mprdoc).subscribe(data => {
      })
      this.quoteDetails.RemoteRFQDocuments.splice(index, 1);
    })

  }
  fileattachedforitem(event: any) {
    let listfile: FileList = event.target.files;
    let formData: FormData = new FormData();
    if (listfile.length > 0) {
      let revid = "Technical" + this.RfqRevisionId + "_" + this.rfqItemInfo.RFQItemsId + "_" + this.Vendor.VUniqueId;
      for (let i = 0; i <= listfile.length - 1; i++) {
        this.Documents = new RFQDocuments();
        let file: File = listfile[i];
        formData.append(revid, file, file.name);
        this.Documents.DocumentName = revid + "\\" + file.name;
        this.Registration.filedata = formData;
        this.Registration.filedata;
        //this.Documents.uniqueid=this.uniqueid;
        this.Registration.DocDetailsLists.push(this.Documents);
        //var selectedFile = this.file[i].filename;//event.target.files[i];
        this.fileList1.push(file);
        this.listOfFiles1.push(revid + "\\" + file.name)

      }
      this.RfqService.InsertDocument(formData).subscribe(data => {
        this.RfqService.InsertDocumentToYSCM(formData).subscribe(data => {
          if (data != null) {
            //alert("Sucessfully updated in YSCM");
            this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'File inserted  sucessfully to YSCM' });
          }
        })
      })
    }

  }
  fileattached(event: any, formName: string) {
    let fileList: FileList = event.target.files;
    let formData: FormData = new FormData();
    if (fileList.length > 0) {
      let doctypeid = document.getElementById('DocTypeid')["value"];
      let revid = this.RfqRevisionId + "_" + doctypeid + "_" + this.Vendor.VUniqueId;
      for (let i = 0; i <= fileList.length - 1; i++) {
        this.Documents = new RFQDocuments();
        let file: File = fileList[i];
        formData.append(revid, file, file.name);
        this.Documents.DocumentName = revid + "_" + file.name;
        this.Registration.filedata = formData;
        this.Registration.filedata;
        //this.Documents.uniqueid=this.uniqueid;
        this.Registration.DocDetailsLists.push(this.Documents);
        //var selectedFile = this.file[i].filename;//event.target.files[i];
        this.fileList.push(file);
        this.listOfFiles.push(revid + "_" + file.name)

      }
      this.RfqService.InsertDocument(formData).subscribe(data => {
        if (data[0]["errmsg"] == "OK") {
          this.RfqService.InsertDocumentToYSCM(formData).subscribe(data => {
            if (data != null) {
              //alert("Sucessfully updated in YSCM");
              this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'File inserted  sucessfully to YSCM' });
            }
          })
          this.loadQuotationDetails();
        }
      })
    }

  }
  getDocType(docType: number) {
    if (docType == 1)
      return "Technical File";
    else if (docType == 2) {
      return "Commercial File";
    }
    else {
      return "Terms and conditions";
    }
  }
  // InsertQuotation() {
  //   this.VQAddSubmitted = true;
  //   if (this.AddQuotation.invalid) {
  //     return;
  //   }
  //   else {
  //     //this.rfqItemInfo.UOM = this.UOMModel.UnitID;
  //     //this.rfqItem.iteminfo = [];
  //     this.rfqItem.iteminfo.push(this.rfqItemInfo);
  //     this.rfqItem.RFQRevisionId = this.RfqRevisionId;
  //         //this.quoteDetails 
  //     this.RfqService.editRfqItemInfo(this.rfqItem).subscribe(data => {
  //       this.rfqItemsresult = data;
  //       this.AddDialog = false;
  //       if(this.rfqItemsresult[0]["errormsg"]=="Success")
  // 		{

  // 			this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Updated sucessfully' });
  //       this.loadQuotationDetails();
  //     }
  //             //this.quoteDetails = data;

  //     });
  //   }
  // }
  InsertQuotation() {
    this.VQAddSubmitted = true;
    if (this.AddQuotation.invalid) {
      return;
    }
    else {
      //this.rfqItemInfo.UOM = 1;//this.UOMModel.UnitID;
      //this.rfqItem.iteminfo = [];
      this.rfqItem.RFQSplitItemId = this.rfqItemInfo.RFQSplitItemId;
      this.rfqItem.RFQItemId = this.rfqItemInfo.RFQItemsId;
      this.rfqItem.iteminfo.push(this.rfqItemInfo);
      this.rfqItem.RFQRevisionId = this.RfqRevisionId;
      // this.quoteDetails = [];
      this.spinner.show();
      this.RfqService.editRfqItemInfo(this.rfqItem).subscribe(data => {
        this.spinner.hide();
        this.rfqItemsresult = data;
        this.AddDialog = false;
        if (this.rfqItemsresult[0]["errormsg"] == "Success") {

          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Updated sucessfully' });
          this.loadQuotationDetails();
        }
        //this.quoteDetails = data;
        //this.loadQuotationDetails();
      });
    }
  }
  loaddocDetails() {
    this.RfqService.GetdocDetailsById(this.RfqRevisionId).subscribe(data => {
      this.docDetails = data;

      console.log("data1", this.docDetails);

    });
  }
  //   loaddocDetailsbyitemsid(item:number) {
  //   for(let i=0;i<=this.quoteDetails["RemoteRFQItems_N"].length;i++)
  //   {
  //     let item=this.quoteDetails["RemoteRFQItems_N"][i].RFQItemsId;
  //   this.RfqService.GetdocDetailsByIdanditemsid(this.RfqRevisionId,item).subscribe(data => {
  //     this.technicaldocDetails = data;
  //     console.log("data2",this.docDetails);

  //   });
  // }
  //}
  loadQuotationDetails() {
    this.RfqService.GetRfqDetailsById(this.RfqRevisionId).subscribe(data => {
      this.quoteDetails = data;
      //console.log(this.quoteDetails.rfqmaster["RfqNo"], "this.quoteDetails");
      let docs = this.quoteDetails.RemoteRFQDocuments.length
      if (docs != 0) {
        this.istermsdisplay = true;
      }


      console.log("docdetails", this.quoteDetails)
      //this.quotedata=data["Rfqiteminfo"];
      // console.log(this.quotedata,"dataquoteDetails");
    });

  }
  loadUOM() {
    this.RfqService.GetUnitMasterList().subscribe(
      res => {
        //this._list = res; //save posts in array
        this.UOMArray = res;
        let _list: any[] = [];
        for (let i = 0; i < (res.length); i++) {
          _list.push({
            UnitName: res[i].UnitName,
            UnitID: res[i].UnitID
          });
        }
        this.UOMArray = _list;
      });
  }
  loadCurrency() {
    this.RfqService.GetAllMasterCurrency().
      subscribe(
        res => {
          //this._list = res; //save posts in array
          this.currncyArray = res;
          let _list: any[] = [];
          for (let i = 0; i < (res.length); i++) {
            _list.push({
              CurrencyName: res[i].CurrencyName,
              CurrenyId: res[i].CurrenyId
            });
          }
          this.currncyArray = _list;
        });
  }
  DiscountPercentageEntered(event) {
    if (this.AddQuotation.controls['DiscountPercentage'].value != "") {
      this.AddQuotation.controls['Discount'].setValue("")
      this.AddQuotation.controls['Discount'].clearValidators();
    }
    this.AddQuotation.controls['Discount'].updateValueAndValidity();
  }
  ShowAddDialog(quoteDetail: any, item: any) {
    this.rfqItemInfo.ItemName = item.ItemName;
    this.rfqItemInfo.ItemDescription = item.ItemDescription;
    this.quoteDetails["RemoteRFQItems_N"][0].RemoteRFQItemsInfo_N
    this.rfqItemInfo.DiscountPercentage = quoteDetail["DiscountPercentage"];
    this.rfqItemInfo.Discount = quoteDetail["Discount"];
    if (this.rfqItemInfo.Discount == "0" && this.rfqItemInfo.DiscountPercentage == "0") {
      this.showDiscount = 'true';
      this.boolDiscountonload(event);
      //this.rfqItemInfo.DiscountOption=false;
    }
    else {
      this.showDiscount = 'false';
      this.boolDiscountonload(event);
      //this.rfqItemInfo.DiscountOption=true;
    }

    this.AddDialog = true;
    var defaultValue = 0;
    this.rfqItemInfo.Quantity = quoteDetail["Qty"];
    console.log("show data", this.rfqItemInfo.Quantity);
    this.rfqItemInfo.Remarks = quoteDetail["Remarks"];
    this.rfqItemInfo.UnitPrice = quoteDetail["UnitPrice"];
    this.rfqItemInfo.RFQItemsId = quoteDetail["RFQItemsId"];
    this.rfqItem.HSNCode = this.quoteDetails["RemoteRFQItems_N"][0].HSNCode;
    // this.rfqItemInfo.Quantity=quoteDetail["Qty"].toInt32(defaultValue);
    this.rfqItemInfo.RFQSplitItemId = quoteDetail["RFQSplitItemId"];
    this.rfqItemInfo.UOM = quoteDetail["UOM"];
    this.rfqItemInfo.CurrencyId = quoteDetail["CurrencyId"];
    this.rfqItemInfo.DeliveryDate = quoteDetail["DeliveryDate"];

    this.rfqItem.MfgPartNo = this.quoteDetails["RemoteRFQItems_N"][0].MfgPartNo;
    this.rfqItem.MfgModelNo = this.quoteDetails["RemoteRFQItems_N"][0].MfgModelNo;
    this.rfqItem.VendorModelNo = this.quoteDetails["RemoteRFQItems_N"][0].VendorModelNo;
    this.rfqItem.PFAmount = this.quoteDetails["RemoteRFQItems_N"][0].PFAmount;
    this.rfqItem.CGSTPercentage = this.quoteDetails["RemoteRFQItems_N"][0].CGSTPercentage;
    this.rfqItem.IGSTPercentage = this.quoteDetails["RemoteRFQItems_N"][0].IGSTPercentage;
    this.rfqItem.SGSTPercentage = this.quoteDetails["RemoteRFQItems_N"][0].SGSTPercentage;
    this.rfqItem.PFPercentage = this.quoteDetails["RemoteRFQItems_N"][0].PFPercentage;
    this.rfqItem.FreightAmount = this.quoteDetails["RemoteRFQItems_N"][0].FreightAmount;
    this.rfqItem.FreightPercentage = this.quoteDetails["RemoteRFQItems_N"][0].FreightPercentage;
    //if(this.rfqItem.PFAmount!=null){
    //  this.AddQuotation.controls['PFPercentage'].setValue("");
    //  this.AddQuotation.controls['PFPercentage'].clearValidators();
    //  this.AddQuotation.controls['PFPercentage'].updateValueAndValidity();
    //}
    //else if(this.rfqItem.PFPercentage!=null){
    //  this.AddQuotation.controls['PFAmount'].setValue("");
    //  this.AddQuotation.controls['PFAmount'].clearValidators();
    //  this.AddQuotation.controls['PFAmount'].updateValueAndValidity();  
    //}
    //if(this.rfqItem.CGSTPercentage!=null)
    //{
    //  this.AddQuotation.controls['IGSTPercentage'].setValue("");
    //  this.AddQuotation.controls['IGSTPercentage'].clearValidators();
    //  this.AddQuotation.controls['IGSTPercentage'].updateValueAndValidity();
    //}
    //else if(this.rfqItem.IGSTPercentage!=null){
    //  this.AddQuotation.controls['SGSTPercentage'].setValue("");
    //  this.AddQuotation.controls['SGSTPercentage'].clearValidators();
    //  this.AddQuotation.controls['SGSTPercentage'].updateValueAndValidity();
    //  this.AddQuotation.controls['CGSTPercentage'].setValue("");
    //  this.AddQuotation.controls['CGSTPercentage'].clearValidators();
    //  this.AddQuotation.controls['CGSTPercentage'].updateValueAndValidity();
    //}

    //this.AddQuotation.reset();
    this.showDiscount = "";
    this.showTaxDuty = "";
    this.VQAddSubmitted = false;//Removes the Validation error when attempted to click the Add button


    //this.UOMModel.UnitID = 0;

    this.loadCurrency();
    //	this.currncyModel.CurrencyId = 0;
    this.AddQuotation.controls['PFAmount'].setValue("0");
    this.AddQuotation.controls['FreightAmount'].setValue("0");
    this.AddQuotation.controls['IGSTPercentage'].setValue("0");

    this.PFAmount();
    this.PFPercentage();
    this.FreightAmount();
    this.FreightPercentage();
    this.IGSTPercentageenable();
    this.IGSTEnablefromCGST();
    this.IGSTEnablefromSGST();
  }

  gettermsandconds() {
    this.RfqService.gettermsandconditionsByid(this.RfqRevisionId).
      subscribe(
        res => {
          //this._list = res; //save posts in array
          this.VendorTermsList = res;
          let _list: any[] = [];
          for (let i = 0; i < (res.length); i++) {
            _list.push({
              Terms: res[i].Terms,
              VRfqTermsid: res[i].VRfqTermsid,
              remarks: res[i].remarks,
              VendorResponse: res[i].VendorResponse,
            });
          }
          this.VendorTermsList = _list;
        });
  }
  // loadCurrency() {
  // 	this.RfqService.GetAllMasterCurrency().subscribe(data => {
  //     this.currncyArray = data;

  // 	});
  // }
}
