import { Component, Input, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicSearchResult, Vendor, QuoteDetails, RfqItemModel, MPRDocument, RfqItemInfoModel, RFQUnitMasters, RFQStatus, RFQCurrencyMaster, RFQDocuments, RFQTerms, VendorCommunication } from '../../Models/RFQModel';
import { constants } from '../../Models/RFQConstants';
import { RfqService } from '../../services/rfq.service ';
import { NgxSpinnerService } from "ngx-spinner";
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-VendorQuotationAdd',
  templateUrl: './VendorQuotationAdd.component.html'
})

export class VendorQuotationAddComponent implements OnInit {
  isDisableddoctype: boolean = true;
  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private router: Router, private formBuilder: FormBuilder, private spinner: NgxSpinnerService, private cdRef: ChangeDetectorRef, public RfqService: RfqService, public constants: constants, private route: ActivatedRoute) { }
  @ViewChild('attachments', { static: false }) attachment: any;
  //@ViewChild('attachment',{static: false}) attach: any;
  selectedFile: File;
  listOfFiles1: any[] = [];
  public RFQTerms: RFQTerms;
  public RfqRevisionId: number = 0;
  public VendorQuotation; AddQuotation; AddQuotationforitem; vendorCommunicationForm: FormGroup;
  public dynamicData = new DynamicSearchResult();
  public VQAddSubmitted; VendorCommunicationSubmitted; disableComBtn; disableOtherBtn; displayCommunicationDialog; displayMessageDialog: boolean = false;
  public AddDialog: boolean;
  public AddDialogforitem: boolean;
  public showDiscount: string;
  public showDiscountforitem: string;
  public MultipleItems: string;
  public showitemsdesc: string;
  public responseAgree: string;
  public showTaxDuty: string;
  public showGST: string;
  public quoteDetails = new QuoteDetails();
  public quoteDetailsforterms = [];
  public rfqDocuments: RFQDocuments;
  public UOMArray: any[] = [];
  public UOMModel: RFQUnitMasters;
  public currncyArray: any[] = [];
  public currncyModel: RFQCurrencyMaster;
  public rfqItem: RfqItemModel;
  public rfqItemInfo: RfqItemInfoModel;
  public rfqItemId: string;
  TermsList: any[] = [];
  istermsdisplay; EditItem; displayFooter; termsSubmitted: boolean = false;
  DocumentListMaster: any[] = [];
  public Vendor: Vendor;
  public Documents: RFQDocuments;
  public drpdwnId: string;
  isDisabledRemarks: boolean = true;
  RFQTerm: RFQTerms = new RFQTerms();
  public vendor: Vendor;
  Registration: RfqItemModel = new RfqItemModel();
  mprdoc: MPRDocument = new MPRDocument();
  public docDetails: QuoteDetails;
  public DESkey: string;
  public rfqItemsresult: RfqItemModel;
  public DocTypeList: Array<any> = [];
  public VendorCommunications: VendorCommunication;
  public rfqrevisions: Array<any> = [];
  public rfqStatus: RFQStatus;
  public RFQStatusTrackDetails: Array<any> = [];
  public message: string = "";
  public ItemPricecount: number = 0;

  ngOnInit() {
    this.Vendor = JSON.parse(localStorage.getItem("vendordetail"));
    if (!localStorage.getItem("AccessToken")) {
      this.router.navigateByUrl("Login");
      return true;
    }


    this.route.params.subscribe(params => {
      if (params["RFQRevisionId"]) {
        this.RfqRevisionId = this.constants.decrypt(params["RFQRevisionId"]);
      }
    });

    this.rfqItem = new RfqItemModel();
    this.rfqItemInfo = new RfqItemInfoModel();
    this.UOMArray = [];
    this.UOMModel = new RFQUnitMasters();
    this.currncyArray = [];
    this.currncyModel = new RFQCurrencyMaster();
    this.rfqStatus = new RFQStatus();

    this.loadUOM();
    this.loadCurrency();
    this.GetdocumentListMaster();
    this.RFQTermListdata();
    this.loadQuotationDetails();

    this.AddQuotation = this.formBuilder.group({
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
      //TaxDutyOption: ['', [Validators.required]],
      //CustomDuty: ['', [Validators.required]],
      //GST: ['', [Validators.required]],
      //IGSTPercentage: ['', [Validators.required]],
      CGSTPercentage: ['', [Validators.required]],
      SGSTPercentage: ['', [Validators.required]],
      PFPercentage: ['', [Validators.required]],
      PFAmount: ['', [Validators.required]],
      FreightPercentage: ['', [Validators.required]],
      FreightAmount: ['', [Validators.required]],
      DeliveryDate: ['', [Validators.required]],
      Remarks: ['', [Validators.required]],
      IGSTPercentage: ['', [Validators.required]],
      MultipleItems: ['', [Validators.required]],
      ItemNameForMultiple: ['', [Validators.required]],
      ItemDescriptionForMultiple: ['', [Validators.required]]
    });
    this.AddQuotationforitem = this.formBuilder.group({
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
      //TaxDutyOption: ['', [Validators.required]],
      //CustomDuty: ['', [Validators.required]],
      //GST: ['', [Validators.required]],
      //IGSTPercentage: ['', [Validators.required]],
      CGSTPercentage: ['', [Validators.required]],
      SGSTPercentage: ['', [Validators.required]],
      PFPercentage: ['', [Validators.required]],
      PFAmount: ['', [Validators.required]],
      FreightPercentage: ['', [Validators.required]],
      FreightAmount: ['', [Validators.required]],
      DeliveryDate: ['', [Validators.required]],
      Remarks: ['', [Validators.required]],
      IGSTPercentage: ['', [Validators.required]],
      // MultipleItems:['', [Validators.required]],
      // ItemNameForMultiple:['', [Validators.required]],
      // ItemDescriptionForMultiple:['', [Validators.required]]
    });

    this.vendorCommunicationForm = this.formBuilder.group({
      Remarks: ['', [Validators.required]],
    })
    this.VendorCommunications = new VendorCommunication();
  }

  loadQuotationDetails() {
    this.spinner.show();
    this.RfqService.GetRfqDetailsById(this.RfqRevisionId).subscribe(data => {
      this.spinner.hide();
      this.quoteDetails = data;
      this.RFQStatusTrackDetails = this.quoteDetails.RFQStatusTrackDetails.filter(li => li.RfqRevisionId == this.RfqRevisionId);
      // showing footer and disable other buttons if rfq Regretted and not acknowledged
      if (this.RFQStatusTrackDetails.filter(li => li.StatusId == 27).length > 0 && this.RFQStatusTrackDetails.filter(li => li.StatusId == 26).length == 0) {
        this.displayFooter = true;
        this.disableOtherBtn = true;
        this.disableComBtn = false;
      }

      // showing footer and disable other buttons if  rfq not acknowledged
      else if (this.RFQStatusTrackDetails.filter(li => li.StatusId == 26).length == 0) {
        this.displayFooter = true;
        this.disableOtherBtn = true;
        this.disableComBtn = false;
      }
      // for rfq responded enable communication and disable other activities
      else if (this.RFQStatusTrackDetails.filter(li => li.StatusId == 8).length > 0) {
        this.displayFooter = false;
        this.disableOtherBtn = true;
        this.disableComBtn = false;
      }
      // for inactive revision disable communication and  other activities
      else if (this.quoteDetails.ActiveRevision == false) {
        this.displayFooter = false;
        this.disableOtherBtn = true;
        this.disableComBtn = true;
      }
      else {
        this.displayFooter = false;
        this.disableOtherBtn = false;
        this.disableComBtn = false;
      }
      this.dynamicData = new DynamicSearchResult();
      this.dynamicData.query = "select * from RemoteRFQRevisions_N where rfqMasterId=" + this.quoteDetails.rfqMasterId + "";
      this.RfqService.getDBMastersList(this.dynamicData).subscribe(data => {
        this.rfqrevisions = data;
      })
    });
  }

  GetdocumentListMaster() {
    this.RfqService.GetDocumentMasterList().subscribe(res => {
      this.DocTypeList = res;
      this.DocumentListMaster = this.DocTypeList.filter(li => li.UsedBYVendor == true);
    });
  }

  //get RFQ terms List
  RFQTermListdata() {
    this.RfqService.GetTermsListForRFQ(this.RfqRevisionId).subscribe(res => {
      this.TermsList = res;
      if (this.TermsList.filter(li => (li.VendorResponse == null) || (li.VendorResponse == "null")).length > 0)
        this.termsSubmitted = false;
      else
        this.termsSubmitted = true;
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
              CurrenyId: res[i].CurrencyId
            });
          }
          this.currncyArray = _list;
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

  multipleitem(event) {
    this.AddQuotation.controls['ItemNameForMultiple'].setValue("");
    this.AddQuotation.controls['ItemDescriptionForMultiple'].setValue("");
    if (this.MultipleItems == 'true') {
      this.AddQuotation.controls['ItemNameForMultiple'].setValidators([Validators.required]);
      this.AddQuotation.controls['ItemDescriptionForMultiple'].setValidators([Validators.required]);
      //document.getElementById('singleitem').style.display='none';
    }
    else if (this.MultipleItems == 'false') {
      this.AddQuotation.controls['ItemNameForMultiple'].clearValidators();
      this.AddQuotation.controls['ItemDescriptionForMultiple'].clearValidators();
      this.AddQuotation.controls['ItemNameForMultiple'].setValue("");
      this.AddQuotation.controls['ItemDescriptionForMultiple'].setValue("");
      //document.getElementById('multipleitem').style.display='none';

    }
    this.AddQuotation.controls['ItemNameForMultiple'].updateValueAndValidity();
    this.AddQuotation.controls['ItemDescriptionForMultiple'].updateValueAndValidity();
  }
  boolDiscount(event) {
    this.AddQuotation.controls['DiscountPercentage'].setValue("");
    this.AddQuotation.controls['Discount'].setValue("");
    if (this.showDiscount == 'true') {
      this.AddQuotation.controls['DiscountPercentage'].setValidators([Validators.required]);
      this.AddQuotation.controls['Discount'].setValidators([Validators.required]);
    }
    else if (this.showDiscount == 'false') {
      this.AddQuotation.controls['DiscountPercentage'].clearValidators();
      this.AddQuotation.controls['Discount'].clearValidators();
      this.AddQuotation.controls['DiscountPercentage'].setValue("");
      this.AddQuotation.controls['Discount'].setValue("");

    }
    this.AddQuotation.controls['DiscountPercentage'].updateValueAndValidity();
    this.AddQuotation.controls['Discount'].updateValueAndValidity();
  }
  boolDiscount1(event) {
    this.AddQuotationforitem.controls['DiscountPercentage'].setValue("");
    this.AddQuotationforitem.controls['Discount'].setValue("");
    if (this.showDiscount == 'true') {
      this.AddQuotationforitem.controls['DiscountPercentage'].setValidators([Validators.required]);
      this.AddQuotationforitem.controls['Discount'].setValidators([Validators.required]);
    }
    else if (this.showDiscount == 'false') {
      this.AddQuotationforitem.controls['DiscountPercentage'].clearValidators();
      this.AddQuotationforitem.controls['Discount'].clearValidators();
      this.AddQuotationforitem.controls['DiscountPercentage'].updateValueAndValidity();
      this.AddQuotationforitem.controls['Discount'].updateValueAndValidity();
    }
    this.AddQuotationforitem.controls['DiscountPercentage'].updateValueAndValidity();
    this.AddQuotationforitem.controls['Discount'].updateValueAndValidity();
  }

  DiscountPercentageEntered(event) {
    if (this.AddQuotation.controls['DiscountPercentage'].value != "") {
      this.AddQuotation.controls['Discount'].setValue("")
      this.AddQuotation.controls['Discount'].clearValidators();
    }
    this.AddQuotation.controls['Discount'].updateValueAndValidity();
  }
  DiscountPercentageEntered1(event) {
    if (this.AddQuotationforitem.controls['DiscountPercentage'].value != "") {
      this.AddQuotationforitem.controls['Discount'].setValue("")
      this.AddQuotationforitem.controls['Discount'].clearValidators();
    }
    this.AddQuotationforitem.controls['Discount'].updateValueAndValidity();
  }
  DiscountEntered(event) {
    if (this.AddQuotation.controls['Discount'].value != "") {
      this.AddQuotation.controls['DiscountPercentage'].setValue("");
      this.AddQuotation.controls['DiscountPercentage'].clearValidators();
    }
    this.AddQuotation.controls['DiscountPercentage'].updateValueAndValidity();
  }
  DiscountEntered1(event) {
    if (this.AddQuotationforitem.controls['Discount'].value != "") {
      this.AddQuotationforitem.controls['DiscountPercentage'].setValue("");
      this.AddQuotationforitem.controls['DiscountPercentage'].clearValidators();
    }
    this.AddQuotationforitem.controls['DiscountPercentage'].updateValueAndValidity();
  }

  PFPercentage() {
    if (this.AddQuotation.controls['PFPercentage'].value != "" || this.AddQuotation.controls['PFPercentage'].value == "0") {
      this.AddQuotation.controls['PFAmount'].setValue("");
      this.AddQuotation.controls['PFAmount'].clearValidators();
      this.AddQuotation.controls['PFAmount'].disable();
    }
    this.AddQuotation.controls['PFAmount'].updateValueAndValidity();
  }
  PFPercentage1() {
    if (this.AddQuotationforitem.controls['PFPercentage'].value != "") {
      this.AddQuotationforitem.controls['PFAmount'].setValue("");
      this.AddQuotationforitem.controls['PFAmount'].clearValidators();
    }
    this.AddQuotationforitem.controls['PFAmount'].updateValueAndValidity();
  }

  PFAmount() {
    if (this.AddQuotation.controls['PFAmount'].value != "" || this.AddQuotation.controls['PFAmount'].value == "0") {
      this.AddQuotation.controls['PFPercentage'].setValue("");
      this.AddQuotation.controls['PFPercentage'].clearValidators();
      this.AddQuotation.controls['PFPercentage'].disable();
    }
    this.AddQuotation.controls['PFPercentage'].updateValueAndValidity();
  }
  PFAmount1() {
    if (this.AddQuotationforitem.controls['PFAmount'].value != "") {
      this.AddQuotationforitem.controls['PFPercentage'].setValue("");
      this.AddQuotationforitem.controls['PFPercentage'].clearValidators();
    }
    this.AddQuotationforitem.controls['PFPercentage'].updateValueAndValidity();
  }

  FreightPercentage() {
    if (this.AddQuotation.controls['FreightPercentage'].value != "" || this.AddQuotation.controls['FreightPercentage'].value == "0") {
      this.AddQuotation.controls['FreightAmount'].setValue("");
      this.AddQuotation.controls['FreightAmount'].clearValidators();
      this.AddQuotation.controls['FreightAmount'].disable();
    }
    this.AddQuotation.controls['FreightAmount'].updateValueAndValidity();
  }
  FreightPercentage1() {
    if (this.AddQuotationforitem.controls['FreightPercentage'].value != "") {
      this.AddQuotationforitem.controls['FreightAmount'].setValue("");
      this.AddQuotationforitem.controls['FreightAmount'].clearValidators();
    }
    this.AddQuotationforitem.controls['FreightAmount'].updateValueAndValidity();
  }
  FreightAmount() {
    if (this.AddQuotation.controls['FreightAmount'].value != "" || this.AddQuotation.controls['FreightAmount'].value == "0") {
      this.AddQuotation.controls['FreightPercentage'].setValue("");
      this.AddQuotation.controls['FreightPercentage'].clearValidators();
      this.AddQuotation.controls['FreightPercentage'].disable();
    }
    this.AddQuotation.controls['FreightPercentage'].updateValueAndValidity();
  }
  FreightAmount1() {
    if (this.AddQuotationforitem.controls['FreightAmount'].value != "") {
      this.AddQuotationforitem.controls['FreightPercentage'].setValue("");
      this.AddQuotationforitem.controls['FreightPercentage'].clearValidators();
    }
    this.AddQuotationforitem.controls['FreightPercentage'].updateValueAndValidity();
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
    // if (this.AddQuotation.controls['IGSTPercentage'].value != ""){
    // 	this.AddQuotation.controls['SGSTPercentage'].setValue("");
    // 	//this.AddQuotation.controls['CGSTPercentage'].setValue("");
    // 	this.AddQuotation.controls['SGSTPercentage'].clearValidators();
    // 	this.AddQuotation.controls['CGSTPercentage'].clearValidators();
    // 	this.AddQuotation.controls['SGSTPercentage'].updateValueAndValidity();
    // 	this.AddQuotation.controls['CGSTPercentage'].updateValueAndValidity();
    // 	//this.AddQuotation.controls['CGSTPercentage'].clearValidators();
    // 	//alert("data");
    // }

  }
  IGSTEnablefromCGST() {
    if (this.AddQuotation.controls['CGSTPercentage'].value != "" || this.AddQuotation.controls['CGSTPercentage'].value == "0") {
      this.AddQuotation.controls['IGSTPercentage'].setValue("");
      this.AddQuotation.controls['IGSTPercentage'].clearValidators();
      this.AddQuotation.controls['IGSTPercentage'].updateValueAndValidity();
      this.AddQuotation.controls['IGSTPercentage'].disable()
    }
  }
  IGSTEnablefromSGST() {
    if (this.AddQuotation.controls['SGSTPercentage'].value != "" || this.AddQuotation.controls['SGSTPercentage'].value == "0") {
      this.AddQuotation.controls['IGSTPercentage'].setValue("");
      this.AddQuotation.controls['IGSTPercentage'].clearValidators();
      this.AddQuotation.controls['IGSTPercentage'].updateValueAndValidity();
      this.AddQuotation.controls['IGSTPercentage'].disable()
    }
  }

  boolDiscountonload(event) {
    if (!this.rfqItemInfo.Discount && !this.rfqItemInfo.DiscountPercentage) {
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
    this.AddQuotation.controls['DiscountPercentage'].updateValueAndValidity();
    this.AddQuotation.controls['Discount'].updateValueAndValidity();
  }

  //rfq terms submit
  SubmitTerms() {
    this.termsSubmitted = false;
    this.spinner.show();
    this.RfqService.VendorTermsUpdate(this.TermsList).subscribe(data => {
      this.spinner.hide();
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Terms & Conditions Submitted' });
      this.TermsList = data;
      if (this.TermsList.filter(li => (li.VendorResponse == null) || (li.VendorResponse == "null")).length > 0)
        this.termsSubmitted = false;
      else
        this.termsSubmitted = true;
    });

  }

  ShowAddDialog(rfqItemId: any, QuotationQty: any, documents: any, item: any) {
    this.EditItem = true;
    this.disableValidations();
    this.RfqService.checkrfqitemsid(rfqItemId).subscribe(
      data => {
        if (data == true) {
          this.MultipleItems = "true";
          //this.EditItem == false;
        }
        else {
          this.MultipleItems = "false";
          //this.EditItem == true;
          this.AddQuotation.controls['ItemNameForMultiple'].clearValidators();
          this.AddQuotation.controls['ItemDescriptionForMultiple'].clearValidators();
          this.AddQuotation.controls['MultipleItems'].clearValidators();
          this.AddQuotation.controls['ItemNameForMultiple'].setValue("");
          this.AddQuotation.controls['ItemDescriptionForMultiple'].setValue("");
          this.AddQuotation.controls['MultipleItems'].setValue("");

          this.AddQuotation.controls['ItemNameForMultiple'].updateValueAndValidity();
          this.AddQuotation.controls['ItemDescriptionForMultiple'].updateValueAndValidity();
          this.AddQuotation.controls['MultipleItems'].updateValueAndValidity();
        }
      }
    )
    this.AddDialog = true;
    this.AddQuotation.reset();//To reset the values entered previously
    this.rfqItemInfo = new RfqItemInfoModel();
    this.rfqItemInfo.RFQItemsId = rfqItemId;
    this.rfqItemInfo.ItemName = item.ItemName;
    this.rfqItemInfo.ItemDescription = item.ItemDescription;
    this.rfqItemInfo.Quantity = QuotationQty;
    if (QuotationQty)
      this.rfqItem.QuotationQty = QuotationQty;
    this.rfqItem.RFQItemId = rfqItemId;

    this.showDiscount = "";
    this.showTaxDuty = "";
    this.VQAddSubmitted = false;//Removes the Validation error when attempted to click the Add button
    this.listOfFiles1 = documents;
    this.UOMModel.UnitID = 0;

    this.currncyModel.CurrencyId = 0;

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

  //diable validation if quantity is 0
  disableValidations() {
    if (this.rfqItemInfo.Quantity == 0) {
      this.AddQuotation.controls['UOM'].setValue("0");
      this.AddQuotation.controls['UOM'].clearValidators();
      this.AddQuotation.controls['CurrencyId'].setValue("0");
      this.AddQuotation.controls['CurrencyId'].clearValidators();
      this.AddQuotation.controls['UnitPrice'].setValue("");
      this.AddQuotation.controls['UnitPrice'].clearValidators();
      this.AddQuotation.controls['DiscountOption'].setValue("");
      this.AddQuotation.controls['DiscountOption'].clearValidators();
      this.AddQuotation.controls['DiscountPercentage'].setValue("");
      this.AddQuotation.controls['DiscountPercentage'].clearValidators();
      this.AddQuotation.controls['Discount'].setValue("");
      this.AddQuotation.controls['Discount'].clearValidators();
      this.AddQuotation.controls['HSNCode'].setValue("");
      this.AddQuotation.controls['HSNCode'].clearValidators();
      this.AddQuotation.controls['VendorModelNo'].setValue("");
      this.AddQuotation.controls['VendorModelNo'].clearValidators();
      this.AddQuotation.controls['MfgPartNo'].setValue("");
      this.AddQuotation.controls['MfgPartNo'].clearValidators();
      this.AddQuotation.controls['MfgModelNo'].setValue("");
      this.AddQuotation.controls['MfgModelNo'].clearValidators();
      this.AddQuotation.controls['ManufacturerName'].setValue("");
      this.AddQuotation.controls['ManufacturerName'].clearValidators();
      this.AddQuotation.controls['CGSTPercentage'].setValue("");
      this.AddQuotation.controls['CGSTPercentage'].clearValidators();
      this.AddQuotation.controls['SGSTPercentage'].setValue("");
      this.AddQuotation.controls['SGSTPercentage'].clearValidators();
      this.AddQuotation.controls['PFPercentage'].setValue("");
      this.AddQuotation.controls['PFPercentage'].clearValidators();
      this.AddQuotation.controls['PFAmount'].setValue("0");
      this.AddQuotation.controls['PFAmount'].clearValidators();
      this.AddQuotation.controls['FreightPercentage'].setValue("");
      this.AddQuotation.controls['FreightPercentage'].clearValidators();
      this.AddQuotation.controls['FreightAmount'].setValue("0");
      this.AddQuotation.controls['FreightAmount'].clearValidators();
      this.AddQuotation.controls['DeliveryDate'].setValue("");
      this.AddQuotation.controls['DeliveryDate'].clearValidators();
      this.AddQuotation.controls['IGSTPercentage'].setValue("0");
      this.AddQuotation.controls['IGSTPercentage'].clearValidators();
      //this.AddQuotation.controls['MultipleItems'].setValue("");
      //this.AddQuotation.controls['MultipleItems'].clearValidators();
      //this.AddQuotation.controls['ItemNameForMultiple'].setValue("");
      //this.AddQuotation.controls['ItemNameForMultiple'].clearValidators();
      //this.AddQuotation.controls['ItemDescriptionForMultiple'].setValue("");
      //this.AddQuotation.controls['ItemDescriptionForMultiple'].setValue("");
      //this.AddQuotation.controls['ItemDescriptionForMultiple'].clearValidators();
    }
    else {
      this.AddQuotation.controls['UOM'].setValidators([Validators.required]);
      this.AddQuotation.controls['CurrencyId'].setValidators([Validators.required]);
      this.AddQuotation.controls['UnitPrice'].setValidators([Validators.required]);
      this.AddQuotation.controls['DiscountOption'].setValidators([Validators.required]);
      //this.AddQuotation.controls['DiscountPercentage'].setValidators([Validators.required]);
      //this.AddQuotation.controls['Discount'].setValidators([Validators.required]);
      this.AddQuotation.controls['HSNCode'].setValidators([Validators.required]);
      this.AddQuotation.controls['VendorModelNo'].setValidators([Validators.required]);
      this.AddQuotation.controls['MfgPartNo'].setValidators([Validators.required]);
      this.AddQuotation.controls['MfgModelNo'].setValidators([Validators.required]);
      this.AddQuotation.controls['ManufacturerName'].setValidators([Validators.required]);
      this.AddQuotation.controls['CGSTPercentage'].setValidators([Validators.required]);
      this.AddQuotation.controls['SGSTPercentage'].setValidators([Validators.required]);
      this.AddQuotation.controls['PFPercentage'].setValidators([Validators.required]);
      this.AddQuotation.controls['PFAmount'].setValidators([Validators.required]);
      this.AddQuotation.controls['FreightPercentage'].setValidators([Validators.required]);
      this.AddQuotation.controls['FreightAmount'].setValidators([Validators.required]);
      this.AddQuotation.controls['DeliveryDate'].setValidators([Validators.required]);
      this.AddQuotation.controls['IGSTPercentage'].setValidators([Validators.required]);
      //this.AddQuotation.controls['MultipleItems'].setValidators([Validators.required]);
      //this.AddQuotation.controls['ItemNameForMultiple'].setValidators([Validators.required]);
      //this.AddQuotation.controls['ItemDescriptionForMultiple'].setValidators([Validators.required]);

    }

    this.AddQuotation.controls['UOM'].updateValueAndValidity();
    this.AddQuotation.controls['CurrencyId'].updateValueAndValidity();
    this.AddQuotation.controls['UnitPrice'].updateValueAndValidity();
    this.AddQuotation.controls['DiscountOption'].updateValueAndValidity();
    this.AddQuotation.controls['DiscountPercentage'].updateValueAndValidity();
    this.AddQuotation.controls['Discount'].updateValueAndValidity();
    this.AddQuotation.controls['HSNCode'].updateValueAndValidity();
    this.AddQuotation.controls['VendorModelNo'].updateValueAndValidity();
    this.AddQuotation.controls['MfgPartNo'].updateValueAndValidity();
    this.AddQuotation.controls['MfgModelNo'].updateValueAndValidity();
    this.AddQuotation.controls['ManufacturerName'].updateValueAndValidity();
    this.AddQuotation.controls['CGSTPercentage'].updateValueAndValidity();
    this.AddQuotation.controls['SGSTPercentage'].updateValueAndValidity();
    this.AddQuotation.controls['PFPercentage'].updateValueAndValidity();
    this.AddQuotation.controls['PFAmount'].updateValueAndValidity();
    this.AddQuotation.controls['FreightPercentage'].updateValueAndValidity();
    this.AddQuotation.controls['FreightAmount'].updateValueAndValidity();
    this.AddQuotation.controls['DeliveryDate'].updateValueAndValidity();
    this.AddQuotation.controls['IGSTPercentage'].updateValueAndValidity();
    //this.AddQuotation.controls['MultipleItems'].updateValueAndValidity();
    //this.AddQuotation.controls['ItemNameForMultiple'].updateValueAndValidity();
    //this.AddQuotation.controls['ItemDescriptionForMultiple'].updateValueAndValidity();
  }

  ShowEditDialog(quoteDetail: any, item: any) {
    this.rfqItemInfo = new RfqItemInfoModel();
    this.EditItem = true;
    this.AddDialog = true;
    this.showDiscount = "";
    this.listOfFiles1 = item.RemoteRFQDocuments

    //hide multiple  items option
    this.AddQuotation.controls['ItemNameForMultiple'].clearValidators();
    this.AddQuotation.controls['ItemDescriptionForMultiple'].clearValidators();
    this.AddQuotation.controls['MultipleItems'].clearValidators();
    this.AddQuotation.controls['ItemNameForMultiple'].setValue("");
    this.AddQuotation.controls['ItemDescriptionForMultiple'].setValue("");
    this.AddQuotation.controls['MultipleItems'].setValue("");

    this.AddQuotation.controls['ItemNameForMultiple'].updateValueAndValidity();
    this.AddQuotation.controls['ItemDescriptionForMultiple'].updateValueAndValidity();
    this.AddQuotation.controls['MultipleItems'].updateValueAndValidity();
    this.rfqItemInfo.ItemName = item.ItemName;
    this.rfqItemInfo.ItemDescription = item.ItemDescription;

    this.rfqItemInfo.DiscountPercentage = quoteDetail.DiscountPercentage;
    this.rfqItemInfo.Discount = quoteDetail.Discount;
    if (this.rfqItemInfo.Discount || this.rfqItemInfo.DiscountPercentage)
      this.showDiscount = 'true';
    else
      this.showDiscount = 'false';
    this.boolDiscountonload(event);



    this.rfqItemInfo.Quantity = quoteDetail.Qty;
    this.rfqItemInfo.Remarks = quoteDetail.Remarks;
    this.rfqItemInfo.UnitPrice = quoteDetail.UnitPrice;
    this.rfqItemInfo.RFQItemsId = quoteDetail.RFQItemsId;
    // this.rfqItemInfo.Quantity=quoteDetail["Qty"].toInt32(defaultValue);
    this.rfqItemInfo.RFQSplitItemId = quoteDetail.RFQSplitItemId;
    this.rfqItemInfo.UOM = quoteDetail.UOM;
    this.rfqItemInfo.CurrencyId = quoteDetail.CurrencyId;
    this.rfqItemInfo.DeliveryDate = quoteDetail.DeliveryDate;
    if (quoteDetail.Qty)
      this.rfqItem.QuotationQty = quoteDetail.Qty;
    this.rfqItem.RFQItemId = quoteDetail.RFQItemsId;
    this.rfqItem.HSNCode = item.HSNCode;
    this.rfqItem.MfgPartNo = item.MfgPartNo;
    this.rfqItem.MfgModelNo = item.MfgModelNo;
    this.rfqItem.ManufacturerName = item.ManufacturerName;
    this.rfqItem.VendorModelNo = item.VendorModelNo;
    this.rfqItem.PFAmount = item.PFAmount;
    this.rfqItem.CGSTPercentage = item.CGSTPercentage;
    this.rfqItem.IGSTPercentage = item.IGSTPercentage;
    this.rfqItem.SGSTPercentage = item.SGSTPercentage;
    this.rfqItem.PFPercentage = item.PFPercentage;
    this.rfqItem.FreightAmount = item.FreightAmount;
    this.rfqItem.FreightPercentage = item.FreightPercentage;

    this.showTaxDuty = "";
    this.VQAddSubmitted = false;//Removes the Validation error when attempted to click the Add button

    if (item.PFAmount || item.PFAmount == "0")
      this.PFAmount();
    if (item.PFPercentage || item.PFPercentage == "0")
      this.PFPercentage();
    if (item.FreightAmount || item.FreightAmount == "0")
      this.FreightAmount();
    if (item.FreightPercentage || item.FreightPercentage == "0")
      this.FreightPercentage();
    if (item.IGSTPercentage || item.IGSTPercentage == "0")
      this.IGSTPercentageenable();
    if (item.CGSTPercentage || item.CGSTPercentage == "0")
      this.IGSTEnablefromCGST();
    if (item.SGSTPercentage || item.SGSTPercentage == "0")
      this.IGSTEnablefromSGST();
    if (quoteDetail.Qty == 0)
      this.disableValidations();
  }

  ShowAddDialogitem(quoteDetail: any) {
    this.rfqItemInfo.ItemName = quoteDetail.ItemName;
    this.rfqItemInfo.ItemDescription = quoteDetail.ItemDescription;
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

    this.AddDialogforitem = true;
    var defaultValue = 0;
    this.rfqItemInfo.Quantity = quoteDetail["Qty"];
    console.log("show data", this.rfqItemInfo.Quantity);
    this.rfqItemInfo.Remarks = quoteDetail["Remarks"];
    this.rfqItemInfo.UnitPrice = quoteDetail["UnitPrice"];
    this.rfqItemInfo.RFQItemsId = quoteDetail.RfqItemsId;
    this.rfqItem.HSNCode = this.quoteDetails["RemoteRFQItems_N"][0].HSNCode;
    // this.rfqItemInfo.Quantity=quoteDetail["Qty"].toInt32(defaultValue);
    this.rfqItemInfo.RFQSplitItemId = quoteDetail["RFQSplitItemId"];
    this.rfqItemInfo.UOM = quoteDetail["UOM"];
    this.rfqItemInfo.CurrencyId = quoteDetail["CurrencyId"];
    this.rfqItemInfo.DeliveryDate = quoteDetail.DeliveryDate;

    this.rfqItem.MfgPartNo = this.quoteDetails["RemoteRFQItems_N"][0].MfgPartNo;
    this.rfqItem.MfgModelNo = this.quoteDetails["RemoteRFQItems_N"][0].MfgModelNo;
    this.rfqItem.ManufacturerName = this.quoteDetails["RemoteRFQItems_N"][0].ManufacturerName;
    this.rfqItem.VendorModelNo = this.quoteDetails["RemoteRFQItems_N"][0].VendorModelNo;
    this.rfqItem.PFAmount = this.quoteDetails["RemoteRFQItems_N"][0].PFAmount;
    this.rfqItem.CGSTPercentage = this.quoteDetails["RemoteRFQItems_N"][0].CGSTPercentage;
    this.rfqItem.IGSTPercentage = this.quoteDetails["RemoteRFQItems_N"][0].IGSTPercentage;
    this.rfqItem.SGSTPercentage = this.quoteDetails["RemoteRFQItems_N"][0].SGSTPercentage;
    this.rfqItem.PFPercentage = this.quoteDetails["RemoteRFQItems_N"][0].PFPercentage;
    this.rfqItem.FreightAmount = quoteDetail.FreightAmount;
    this.rfqItem.FreightPercentage = quoteDetail.FreightPercentage;
    if (this.rfqItem.FreightAmount != "") {
      this.AddQuotationforitem.controls['FreightPercentage'].setValue("");
      this.AddQuotationforitem.controls['FreightPercentage'].clearValidators();
      this.AddQuotationforitem.controls['FreightPercentage'].updateValueAndValidity();
    }
    if (this.rfqItem.FreightPercentage != "") {
      this.AddQuotationforitem.controls['FreightAmount'].setValue("");
      this.AddQuotationforitem.controls['FreightAmount'].clearValidators();
      this.AddQuotationforitem.controls['FreightAmount'].updateValueAndValidity();
    }
    if (this.rfqItem.PFAmount != null) {
      this.AddQuotationforitem.controls['PFPercentage'].setValue("");
      this.AddQuotationforitem.controls['PFPercentage'].clearValidators();
      this.AddQuotationforitem.controls['PFPercentage'].updateValueAndValidity();
    }
    else if (this.rfqItem.PFPercentage != null) {
      this.AddQuotationforitem.controls['PFAmount'].setValue("");
      this.AddQuotationforitem.controls['PFAmount'].clearValidators();
      this.AddQuotationforitem.controls['PFAmount'].updateValueAndValidity();
    }
    if (this.rfqItem.CGSTPercentage != null) {
      this.AddQuotationforitem.controls['IGSTPercentage'].setValue("");
      this.AddQuotationforitem.controls['IGSTPercentage'].clearValidators();
      this.AddQuotationforitem.controls['IGSTPercentage'].updateValueAndValidity();
    }
    else if (this.rfqItem.IGSTPercentage != null) {
      this.AddQuotationforitem.controls['SGSTPercentage'].setValue("");
      this.AddQuotationforitem.controls['SGSTPercentage'].clearValidators();
      this.AddQuotationforitem.controls['SGSTPercentage'].updateValueAndValidity();
      this.AddQuotationforitem.controls['CGSTPercentage'].setValue("");
      this.AddQuotationforitem.controls['CGSTPercentage'].clearValidators();
      this.AddQuotationforitem.controls['CGSTPercentage'].updateValueAndValidity();
    }

    //this.AddQuotation.reset();
    this.showDiscount = "";
    this.showTaxDuty = "";
    this.VQAddSubmitted = false;//Removes the Validation error when attempted to click the Add button


    //this.UOMModel.UnitID = 0;


    //	this.currncyModel.CurrencyId = 0;
  }

  Cancel() {
    this.AddDialog = false;
  }
  Cancelforitem() {
    this.AddDialogforitem = false;
  }

  InsertQuotation() {
    this.VQAddSubmitted = true;
    if (this.AddQuotation.invalid) {
      return;
    }
    else {

      this.rfqItem.iteminfo = [];
      if (!this.rfqItemInfo.DeliveryDate)
        this.rfqItemInfo.DeliveryDate = null;
      this.rfqItem.iteminfo.push(this.rfqItemInfo);
      this.rfqItem.RFQRevisionId = this.RfqRevisionId;
      if (this.MultipleItems == 'true')
        this.rfqItem.multipleitem = 'yes';
      this.rfqItem.UpdatedBy = this.Vendor.VUniqueId;
      this.spinner.show();
      this.RfqService.InsertOrEditRfqItemInfo(this.rfqItem).subscribe(data => {
        this.spinner.hide();
        this.AddDialog = false;

        this.loadQuotationDetails();
      });
    }
  }

  getTechnicalDocs(details: any) {
    let docList: Array<any> = details;
    return docList.filter(li => li.DocumentType == 6);
  }

  removeFile(filename: any, index: any, type: any, itemIndex: any) {
    this.Registration.PhysicalPath = filename.Path;
    this.Registration.Id = filename.RfqDocId;
    this.rfqItem.iteminfo.splice(index, 1);
    this.mprdoc.RevisionId = this.RfqRevisionId;
    this.mprdoc.UploadedBy = this.Vendor.VUniqueId;
    let path = filename.Path.split('\\');
    let path1 = path[0].split('_');
    this.mprdoc.DocumentName = path[1];
    this.mprdoc.Path = filename.Path;
    this.mprdoc.ItemDetailsId = path1[1];
    this.spinner.show();
    this.RfqService.DeleteFile(this.Registration).subscribe(data => {
      this.spinner.hide();
      if (data) {
        if (type == "Other")
          this.quoteDetails.RemoteRFQDocuments.splice(index, 1);
        if (type == "Technical")
          this.quoteDetails.RemoteRFQItems_N[itemIndex].RemoteRFQDocuments.splice(index, 1);
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'File Deleted' });
      }

    })
  }

  removeSelectedFileForItem(filename: any, index) {
    // Delete the item from fileNames list

    this.Registration.PhysicalPath = filename.Path;
    this.Registration.Id = filename.RfqDocId;

    this.mprdoc.RevisionId = this.RfqRevisionId;
    this.mprdoc.UploadedBy = this.Vendor.VUniqueId;
    let path = filename.Path.split('\\');
    let path1 = path[0].split('_');
    this.mprdoc.DocumentName = path[1];
    this.mprdoc.Path = filename.Path;
    this.mprdoc.ItemDetailsId = path1[1];
    this.spinner.show();
    this.RfqService.DeleteFile(this.Registration).subscribe(data => {
      this.spinner.hide();
      if (data) {
        this.listOfFiles1.splice(index, 1);
        //this.fileList1.splice(index, 1);
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'File Deleted' });
        // this.RfqService.DeleteFileFrmYSCM(this.mprdoc).subscribe(data => {
        this.loadQuotationDetails();
        //})
      }
    })

  }
  //removeSelectedFile(filename: any, index) {
  //  this.Registration.PhysicalPath = filename.Path;
  //  this.Registration.Id = filename.RfqDocId;
  //  this.mprdoc.RevisionId = this.RfqRevisionId;
  //  this.mprdoc.UploadedBy = this.Vendor.VUniqueId;
  //  let path = filename.Path.split('\\');
  //  let path1 = path[2].split('_');
  //  this.mprdoc.DocumentName = path[3];
  //  this.mprdoc.Path = filename.Path;
  //  this.mprdoc.ItemDetailsId = path1[1];
  //  this.spinner.show();
  //  this.RfqService.DeleteFile(this.Registration).subscribe(data => {
  //    this.spinner.hide();
  //    if (data) {
  //      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'File Deleted' });
  //      this.quoteDetails.RemoteRFQDocuments.splice(index, 1);
  //    }
  //  })

  //}

  fileattached(event: any, formName: string, data: string) {
    let fileList: FileList = event.target.files;
    let formData: FormData = new FormData();
    if (fileList.length > 0) {
      let doctypeid = document.getElementById('DocTypeid')["value"];
      let revid = this.RfqRevisionId + "_" + doctypeid + "_" + this.Vendor.VUniqueId + "_" + "VendorquoteAdd";
      for (let i = 0; i <= fileList.length - 1; i++) {
        this.Documents = new RFQDocuments();
        let file: File = fileList[i];
        formData.append(revid, file, revid + "_" + file.name);
        this.Documents.DocumentName = revid + "_" + file.name;
        this.Registration.filedata = formData;
        this.Registration.filedata;
        //this.Documents.uniqueid=this.uniqueid;
        this.Registration.DocDetailsLists.push(this.Documents);
        //var selectedFile = this.file[i].filename;//event.target.files[i];
        //this.fileList.push(file);
        this.quoteDetails.RemoteRFQDocuments.push(this.Documents);

      }
      this.spinner.show();
      this.RfqService.InsertDocument(formData).subscribe(data => {
        this.loadQuotationDetails();
        this.spinner.hide();
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'File inserted  sucessfully' });
        // this.RfqService.InsertDocumentToYSCM(formData).subscribe(data => {
        //if (data != null) {
        //alert("Sucessfully updated in YSCM");
        //this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'File inserted  sucessfully to YSCM' });
        //}
        //})
      })
    }

  }

  fileattachedforitem(event: any) {
    let listfile: FileList = event.target.files;
    let formData: FormData = new FormData();
    if (listfile.length > 0) {
      let revid = "Technical" + this.RfqRevisionId + "_" + this.rfqItemInfo.RFQItemsId + "_" + this.Vendor.VUniqueId + "_" + "VendorquoteAdd";
      for (let i = 0; i <= listfile.length - 1; i++) {
        this.Documents = new RFQDocuments();
        let file: File = listfile[i];
        formData.append(revid, file, revid + "_" + file.name);
        this.Documents.DocumentName = revid + "_" + file.name;
        this.Registration.filedata = formData;
        this.Registration.filedata;
        //this.Documents.uniqueid=this.uniqueid;
        this.Registration.DocDetailsLists.push(this.Documents);
        //var selectedFile = this.file[i].filename;//event.target.files[i];
        //this.fileList1.push(file);
        this.listOfFiles1.push(this.Documents)

      }
      //this.RfqService.InsertDocumentToYSCM(formData).subscribe(data => {
      this.spinner.show();
      this.RfqService.InsertDocument(formData).subscribe(data => {
        this.spinner.hide();
        if (data) {
          this.Documents.Path = data;
          this.loadQuotationDetails();
          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'File inserted  sucessfully to YSCM' });
          //alert("Sucessfully updated in YSCM");
        }
      })
      // })
    }

  }

  showMessageDialog() {
    if (this.TermsList.filter(li => (li.VendorResponse == null) || (li.VendorResponse == "null")).length > 0) {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: ' Select all responses in terms & conditions' });
      return true;
    }
    if (this.termsSubmitted == false) {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Submit terms & conditions' });
      return true;
    }
    this.displayMessageDialog = true;
    this.ItemPricecount = 0;
    this.quoteDetails.RemoteRFQItems_N.forEach(item => {
      if (item.RemoteRFQItemsInfo_N.length > 0)
        this.ItemPricecount = this.ItemPricecount + 1;
    });
    if (this.ItemPricecount == 1)
      this.message = "" + this.ItemPricecount + " item price is updated out of " + this.quoteDetails.RemoteRFQItems_N.length + " items requested in RFQ";
    else
      this.message = "" + this.ItemPricecount + " item prices are updated out of " + this.quoteDetails.RemoteRFQItems_N.length + " items requested in RFQ";


  }

  FinalSubmit() {
    this.spinner.show();
    this.RfqService.FinalSumit(this.RfqRevisionId, this.Vendor.VUniqueId).subscribe(data => {
      this.spinner.hide();
      this.displayMessageDialog = false;
      this.disableOtherBtn = true;
      if (data[0] == "true") {
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: ' Updated sucessfully' });
      }
    });

  }

  InsertQuotationforitem() {
    this.VQAddSubmitted = true;
    if (this.AddQuotationforitem.invalid) {
      return;
    }
    else {
      //this.rfqItemInfo.UOM = 1;//this.UOMModel.UnitID;
      //this.rfqItem.iteminfo = [];
      this.rfqItem.RFQSplitItemId = this.rfqItemInfo.RFQSplitItemId;
      this.rfqItem.RFQItemId = this.rfqItemInfo.RFQItemsId;
      //    this.rfqItem.RFQVendorbomItemId=this.rfqItemInfo.RFQVendorbomItemId;
      this.rfqItem.iteminfo.push(this.rfqItemInfo);
      this.rfqItem.RFQRevisionId = this.RfqRevisionId;
      // this.quoteDetails = [];
      this.spinner.show();
      this.RfqService.editRfqItemInfo(this.rfqItem).subscribe(data => {
        this.spinner.hide();
        this.rfqItemsresult = data;
        this.AddDialogforitem = false;
        if (this.rfqItemsresult[0]["errormsg"] == "Success") {

          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Updated sucessfully' });
          this.loadQuotationDetails();
        }
        //this.quoteDetails = data;
        //this.loadQuotationDetails();
      });
    }
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
  onRFQItemInfo(rfqItemInfo: RfqItemInfoModel, RFQItemsId: number, ItemIndex: number, index: number) {
    this.vendor = (JSON.parse(localStorage.getItem('AccessToken')));
    this.vendor.access_token = this.vendor.access_token;
    this.spinner.show();
    this.RfqService.RfqIteminfoDeleteByid(rfqItemInfo.RFQSplitItemId, RFQItemsId).subscribe(data => {
      this.spinner.hide();
      //   if (data == true)
      //this.rfqItem.ite.splice(index, 1);
      this.quoteDetails["RemoteRFQItems_N"][ItemIndex].RemoteRFQItemsInfo_N.splice(index, 1);
      //this.loadQuotationDetails();
    })
  }
  onRFQItemInfo1(ItemId: number, rfqItemInfo: RfqItemInfoModel, ItemIndex: number, index: number) {
    this.vendor = (JSON.parse(localStorage.getItem('AccessToken')));
    this.vendor.access_token = this.vendor.access_token
    this.spinner.show();
    this.RfqService.RfqIteminfoDeleteByidformultiple(ItemId, rfqItemInfo.RFQVendorbomItemId).subscribe(data => {
      this.spinner.hide();
      //   if (data == true)
      //this.rfqItem.ite.splice(index, 1);
      this.quoteDetails["RemoteRFQItems_N"][ItemIndex].RemoteRFQItemsInfo_N.splice(index, 1);
      this.loadQuotationDetails();
    })
  }

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }
  viewDocument(path: string, documentname: string) {
    //this.doc = this.sanitizer.bypassSecurityTrustResourceUrl("http://10.29.15.68:90/SCMDocs/2.xlsx");
    var path1 = path.replace(/\\/g, "/");
    path1 = this.constants.Documnentpath + path1;
    window.open(path1);
    //window.open("http://10.29.15.68:90/SCMDocs/2.xlsx");
    //this.showFileViewer = true;   
  }

  // add communication against revision
  showCommunicationDialogToAdd(dialogName: string) {
    this[dialogName] = true;
    this.VendorCommunications = new VendorCommunication();
  }


  //add communication against item
  showCommunicationDialogToAddeachitem(dialogName: string, rfqitem: any) {
    this[dialogName] = true;
    this.VendorCommunications = new VendorCommunication();
    this.VendorCommunications.RFQItemsId = rfqitem;
  }

  dialogCancel(dialogName) {
    this[dialogName] = false;
  }

  onCommnicationSubmit(dialogName: string) {
    this.VendorCommunicationSubmitted = true
    if (this.vendorCommunicationForm.invalid) {
      return;
    }
    this.VendorCommunications.RemarksFrom = this.Vendor.VUniqueId;
    this.VendorCommunications.RFQRevisionId = this.RfqRevisionId;
    this.VendorCommunications.RfqMasterId = this.quoteDetails.rfqMasterId;
    //this.quoteDetails.RemoteRFQCommunications.push(this.VendorCommunications);
    this.spinner.show();
    this.RfqService.InsertVendorCommunication(this.VendorCommunications).subscribe(data => {
      this.spinner.hide();
      if (data) {
        this.quoteDetails.RemoteRFQMaster.RemoteRFQCommunications = data;
        this[dialogName] = false;
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Updated sucessfully' });
      }
    });
    console.log(this.VendorCommunications.Remarks, "remarks");

  }

  //statusUpdate
  onstatusUpdate(statusId: any) {
    if (!this.rfqStatus.Remarks) {
      this.messageService.add({ severity: 'error', summary: 'Validation', detail: "Enter Remarks" });
      return true;
    }
    this.spinner.show();
    this.quoteDetails.StatusId = statusId;
    this.rfqStatus.RfqRevisionId = this.RfqRevisionId;
    this.rfqStatus.StatusId = statusId;
    this.rfqStatus.updatedby = this.Vendor.VUniqueId;
    this.RfqService.rfqStatusUpdate(this.rfqStatus).subscribe(data => {
      this.spinner.hide();
      if (this.rfqStatus.StatusId == 26) {//acknowledged
        this.displayFooter = false;
        this.disableOtherBtn = false;
      }
      if (data)
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Status Updated' });
    });
  }

  //get document type
  getDocType(docType: number) {
    if (docType && this.DocTypeList.length > 0) {
      return this.DocTypeList.filter(li => li.DocumenTypeId == docType)[0].DocumentTypeName;
    }
  }


  //redirect to vendorquotation page
  redirectToVendorQuotation(details: any) {
    //this.router.navigate(['/VSCM/VendorQuotation', this.constants.encryptData(details.rfqRevisionId)]);
    this.router.navigate([]).then(result => {
      window.open('/VSCM/VendorQuotation/' + this.constants.encryptData(details.rfqRevisionId) + '', '_blank');
    });
  }

  //scroll within page
  scrollToView(id) {
    var elmnt = document.getElementById(id);
    if (elmnt)
      elmnt.scrollIntoView(false);
  }

  //get revisionno
  getRevisionNo(revisionId: any) {
    var revisionno = "";
    if (this.rfqrevisions.length > 0) {
      revisionno = this.rfqrevisions.filter(li => li.rfqRevisionId == revisionId)[0].RevisionNo;
    }
    return revisionno;
  }
}
