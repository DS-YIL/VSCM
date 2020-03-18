import { Component, Input, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DynamicSearchResult, Vendor } from '../../Models/mpr';
import { constants } from '../../Models/MPRConstants';
import { RfqService } from '../../services/rfq.service ';
import { RfqItemModel, MPRDocument,RfqItemInfoModel, RFQUnitMasters, RFQCurrencyMaster, RFQDocuments, RFQTerms } from '../../Models/rfq';
import { QuoteDetails} from 'src/app/Models/rfq';
import { MessageService } from 'primeng/api';
import * as CryptoJS from 'crypto-js';
@Component({
	selector: 'app-VendorQuotationAdd',
	templateUrl: './VendorQuotationAdd.component.html'
})

export class VendorQuotationAddComponent implements OnInit {
	isDisableddoctype: boolean=true;
	termsedited: boolean;
	constructor(private messageService: MessageService,private formBuilder: FormBuilder, private cdRef: ChangeDetectorRef, public RfqService: RfqService, public constants: constants, private route: ActivatedRoute) { }
	@ViewChild('attachments',{static: false}) attachment: any;

	selectedFile: File;
	fileList: File[] = [];
	listOfFiles: any[] = [];
	fileList1: File[] = [];
	listOfFiles1: any[] = [];
	public RFQTerms:RFQTerms;
	public RfqRevisionId: number = 0;
	public VendorQuotation; AddQuotation: FormGroup;
	public AddQuotationforitem: FormGroup;
	public dynamicData = new DynamicSearchResult();
	public VQAddSubmitted: boolean = false;
	public AddDialog: boolean;
	public AddDialogforitem: boolean;
	public showDiscount: string;
	public showDiscountforitem: string;
	public MultipleItems: string;
	public showitemsdesc:string;
	public responseAgree:string;
	public showTaxDuty: string;
	public showGST: string;
	public quoteDetails =new QuoteDetails();
	public quoteDetailsforterms=[];
	public rfqDocuments: RFQDocuments;
	public UOMArray: any[]=[];
	public UOMModel: RFQUnitMasters;
	public currncyArray:  any[]=[];
	public currncyModel: RFQCurrencyMaster;
	public rfqItem: RfqItemModel;
	public rfqItemInfo: RfqItemInfoModel;
	public rfqItemId: string;
	public termslist:boolean=false;
	TermsList:any[]=[];
	istermsdisplay:boolean=false;
	DocumentListMaster:any[]=[];
	public Vendor:Vendor;
	public Documents: RFQDocuments;
	public drpdwnId:string;
	isDisabledRemarks:boolean=true;
	RFQTerm:RFQTerms=new RFQTerms();
	public vendor:Vendor;
	Registration:RfqItemModel=new RfqItemModel();
mprdoc:MPRDocument=new MPRDocument();
public docDetails: QuoteDetails;
public DESkey:string;
public rfqItemsresult: RfqItemModel;
	ngOnInit() {
		
		this.Vendor= JSON.parse(localStorage.getItem("vendordetail"));
		//debugger;
		this.route.params.subscribe(params => {
			if (params["RFQRevisionId"]) {
				this.RfqRevisionId = this.decrypt(params["RFQRevisionId"]);
			}
		});
		this.GetdocumentListMaster();
		this.RFQTermListdata();
			this.rfqItem = new RfqItemModel();
			this.rfqItemInfo = new RfqItemInfoModel();
			this.UOMArray = [];
			this.UOMModel = new RFQUnitMasters();

			this.currncyArray = [];
			this.currncyModel = new RFQCurrencyMaster();

			this.loadQuotationDetails();
this.loaddocDetails();
			//this.VendorQuotation = this.formBuilder.group({
			//});

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
			MultipleItems:['', [Validators.required]],
			ItemNameForMultiple:['', [Validators.required]],
			ItemDescriptionForMultiple:['', [Validators.required]]
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
	}
	removeSelectedFileForItem(filename:any,index) {
		// Delete the item from fileNames list
		this.listOfFiles1.splice(index, 1);
		this.Registration.PhysicalPath=filename.Path;
		this.fileList1.splice(index, 1);

		this.mprdoc.RevisionId=this.RfqRevisionId;
		this.mprdoc.UploadedBy=this.Vendor.VUniqueId;
		let path=filename.Path.split('\\');
		let path1=path[0].split('_');
		this.mprdoc.DocumentName=path[1];
		this.mprdoc.Path=filename.Path;
		this.mprdoc.ItemDetailsId=path1[1];
	   this.RfqService.DeleteFile(this.Registration).subscribe(data=>{
		 this.RfqService.DeleteFileFrmYSCM(this.mprdoc).subscribe(data=>{
			 this.loadQuotationDetails();
		 })
	   })
	   
	   }
	   removeSelectedFile(filename:any,index) {
		// Delete the item from fileNames list
		this.listOfFiles.splice(index, 1);
		this.Registration.PhysicalPath=filename.Path;
		this.fileList.splice(index, 1);
		this.mprdoc.RevisionId=this.RfqRevisionId;
		
		this.mprdoc.UploadedBy=this.Vendor.VUniqueId;
		let path=filename.Path.split('\\');
		let path1=path[0].split('_');
		this.mprdoc.DocumentName=path[1];
		this.mprdoc.Path=filename;
		this.mprdoc.ItemDetailsId=path1[1];
	   this.RfqService.DeleteFile(this.Registration).subscribe(data=>{
		this.RfqService.DeleteFileFrmYSCM(this.mprdoc).subscribe(data=>{
			 
		})
	   })
	   
	   }
	GetdocumentListMaster(){
		this.RfqService.GetDocumentMasterList().
      subscribe(
      res => {
      //this._list = res; //save posts in array
      this.DocumentListMaster= res;
      let _list:any[]=[];
      for (let i = 0; i < (res.length); i++) {
      _list.push({
        DocumentTypeName:res[i].DocumentTypeName,
        DocumenTypeId:res[i].DocumenTypeId
      });
      }
      this.DocumentListMaster= _list;
      });
	}
	RFQTermListdata() {
		this.RfqService.GetTermsListForRFQ(this.RfqRevisionId).
		subscribe(
		res => {
		//this._list = res; //save posts in array
		this.TermsList= res;
		console.log("termsid",res);
		if(this.TermsList.length>=1)
		{
			this.istermsdisplay=true;
			//document.getElementById('sunmittermsid').style.display="block";
			
		}
		else{
			this.istermsdisplay=false;
			//document.getElementById('sunmittermsid').style.display="none";
		}
		let _list:any[]=[];
		for (let i = 0; i < (res.length); i++) {
		_list.push({
			Terms:res[i].Terms,
		  VRfqTermsid:res[i].VRfqTermsid
		});
		}
		this.TermsList= _list;
		});
		} 
		
		onChange(id:string,textid:string) {
			this.termsedited=true;
			this.isDisabledRemarks=false;
			 let disableid="text_"+textid;
			if(id=="NotAgree") 
			{
				(<HTMLInputElement>document.getElementById(disableid)).validity;// = false;
			
			(<HTMLInputElement>document.getElementById(disableid)).disabled = false;
			(<HTMLInputElement>document.getElementById(disableid)).required = true;
			//console.log(disableid,"textid");
			}
			else{
				(<HTMLInputElement>document.getElementById(disableid)).disabled = true;
				(<HTMLInputElement>document.getElementById(disableid)).required = false;
		   }
		   
		   }
		SubmitTerms(){
			for(let i=0;i<this.TermsList.length;i++)
			{
				
				this.drpdwnId=this.TermsList[i].VRfqTermsid;
				document.getElementsByClassName(this.drpdwnId);
			   let textid="text_"+this.drpdwnId;
			 
				var   remarks= ((document.getElementById(textid) as HTMLInputElement).value);
				let response= document.getElementById(this.drpdwnId)["value"];
				if(response=="NotAgree"){
					//textid.setValidators([Validators.required]);
					document.getElementById(textid).setAttribute('Validators','required');
					
				}
				let newName = {
					VRfqTermsid:this.drpdwnId,
					VendorResponse:response,
				Remarks:remarks,
				RFQRevisionId:this.RfqRevisionId
				 };
				
			
             this.quoteDetailsforterms.push(newName);
			
			}
			this.RfqService.VendorTermsUpdate(this.quoteDetailsforterms).subscribe(data => {
				this.quoteDetailsforterms = data;
				if(this.quoteDetailsforterms[0]["errmsg"]=="OK")
				{
					this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Terms Updated sucessfully' });
				}

			});
			
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
		if (this.AddQuotation.controls['PFPercentage'].value != "") {
			this.AddQuotation.controls['PFAmount'].setValue("");
			this.AddQuotation.controls['PFAmount'].clearValidators();
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
		if (this.AddQuotation.controls['PFAmount'].value != "") {
			this.AddQuotation.controls['PFPercentage'].setValue("");
			this.AddQuotation.controls['PFPercentage'].clearValidators();
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
		if (this.AddQuotation.controls['FreightPercentage'].value != "") {
			this.AddQuotation.controls['FreightAmount'].setValue("");
			this.AddQuotation.controls['FreightAmount'].clearValidators();
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
		if (this.AddQuotation.controls['FreightAmount'].value != "") {
			this.AddQuotation.controls['FreightPercentage'].setValue("");
			this.AddQuotation.controls['FreightPercentage'].clearValidators();
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
	getDocType(docType:number)
    {
  if(docType==1)
  return "Technical File";
  else if(docType==2){
  return "Commercial File";
  }
  else{
  return "Terms and conditions";
  }
    }
	loadQuotationDetails() {
		this.RfqService.GetRfqDetailsById(this.RfqRevisionId).subscribe(data => {
			
			this.quoteDetails = data;
			console.log("data",data);
			// if(data.length!=0)
			// {
			// 	this.istermsdisplay=true;

			// }
			// else{

			// }
			console.log("quotedata",this.quoteDetails );
			
		});
	}
	decrypt(data) {
		this.DESkey="123456$#@$^@1ERF";
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
	loaddocDetails() {
		this.RfqService.GetdocDetailsById(this.RfqRevisionId).subscribe(data => {
		  this.listOfFiles = data;
		  //console.log("data1",this.docDetails);
		});
	  }
	IGSTPercentageenable(){
		if (this.AddQuotation.controls['IGSTPercentage'].value != ""){
			this.AddQuotation.controls['SGSTPercentage'].setValue("");
			//this.AddQuotation.controls['CGSTPercentage'].setValue("");
			this.AddQuotation.controls['SGSTPercentage'].clearValidators();
			this.AddQuotation.controls['CGSTPercentage'].clearValidators();
			this.AddQuotation.controls['SGSTPercentage'].updateValueAndValidity();
			this.AddQuotation.controls['CGSTPercentage'].updateValueAndValidity();
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
	IGSTEnablefromCGST(){
		if (this.AddQuotation.controls['CGSTPercentage'].value != "")
		{
			this.AddQuotation.controls['IGSTPercentage'].setValue("");
			this.AddQuotation.controls['IGSTPercentage'].clearValidators();
			this.AddQuotation.controls['IGSTPercentage'].updateValueAndValidity();
		}	
	}
	IGSTEnablefromSGST(){
		if (this.AddQuotation.controls['SGSTPercentage'].value != "")
		{
			this.AddQuotation.controls['IGSTPercentage'].setValue("");
			this.AddQuotation.controls['IGSTPercentage'].clearValidators();
		}	
	}
	ShowAddDialog(rfqItemId: any,QuotationQty:any,documents:any,item:any) {
		this.AddDialog = true;
		this.rfqItemInfo.RFQItemsId = rfqItemId;
		this.rfqItemInfo.ItemName=item.ItemName;
		this.rfqItemInfo.ItemDescription=item.ItemDescription;
		//this.rfqItemInfo.Quantity=QuotationQty;
		this.rfqItem.QuotationQty=QuotationQty;
		console.log("qty",this.rfqItemInfo.Quantity);
		this.rfqItem.RFQItemId = rfqItemId;
		this.AddQuotation.reset();//To reset the values entered previously
		this.showDiscount = "";
		this.showTaxDuty = "";
		this.VQAddSubmitted = false;//Removes the Validation error when attempted to click the Add button
this.listOfFiles1=documents;
		this.loadUOM();
		this.UOMModel.UnitID = 0;

		this.loadCurrency();
		this.currncyModel.CurrencyId = 0;
	}

	loadUOM() {
		this.RfqService.GetUnitMasterList().subscribe(
		  res => {
		  //this._list = res; //save posts in array
		  this.UOMArray= res;
		  let _list:any[]=[];
		  for (let i = 0; i < (res.length); i++) {
		  _list.push({
			UnitName:res[i].UnitName,
			UnitID:res[i].UnitID  
		  });
		  }
		  this.UOMArray= _list;
		  });
	  }

	 loadCurrency() {
      this.RfqService.GetAllMasterCurrency().
      subscribe(
      res => {
      //this._list = res; //save posts in array
      this.currncyArray= res;
      let _list:any[]=[];
      for (let i = 0; i < (res.length); i++) {
      _list.push({
        CurrencyName:res[i].CurrencyName,
        CurrenyId:res[i].CurrenyId
      });
      }
      this.currncyArray= _list;
      });
      } 
	  FinalSubmit(){
		this.RfqService.FinalSumit(this.RfqRevisionId).subscribe(data => {
			 
			if(data[0]=="true")
			{
				this.messageService.add({ severity: 'success', summary: 'Success Message', detail: ' Updated sucessfully' });
			}

		});
		 
	  }
	  boolDiscountonload(event) {
		if(this.rfqItemInfo.Discount=="0" && this.rfqItemInfo.DiscountPercentage=="0")
		{
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
	  ShowAddDialogitem(quoteDetail:any) {
		 this.loadUOM();
		this.rfqItemInfo.ItemName=quoteDetail.ItemName;
		this.rfqItemInfo.ItemDescription=quoteDetail.ItemDescription;
		this.quoteDetails["RemoteRFQItems_N"][0].RemoteRFQItemsInfo_N
		this.rfqItemInfo.DiscountPercentage=quoteDetail["DiscountPercentage"];
		this.rfqItemInfo.Discount=quoteDetail["Discount"];
		if(this.rfqItemInfo.Discount=="0" && this.rfqItemInfo.DiscountPercentage=="0")
		{
		  this.showDiscount = 'true';
		  this.boolDiscountonload(event);
		  //this.rfqItemInfo.DiscountOption=false;
		}
		else{
		  this.showDiscount = 'false';
		  this.boolDiscountonload(event);
		  //this.rfqItemInfo.DiscountOption=true;
		}
		
		this.AddDialogforitem = true;
		var defaultValue = 0;
		this.rfqItemInfo.Quantity=quoteDetail["Qty"];
		console.log("show data", this.rfqItemInfo.Quantity);
		this.rfqItemInfo.Remarks=quoteDetail["Remarks"];
		this.rfqItemInfo.UnitPrice=quoteDetail["UnitPrice"];
	   this.rfqItemInfo.RFQItemsId=quoteDetail.RfqItemsId;
	   this.rfqItem.HSNCode=this.quoteDetails["RemoteRFQItems_N"][0].HSNCode;
	  // this.rfqItemInfo.Quantity=quoteDetail["Qty"].toInt32(defaultValue);
	this.rfqItemInfo.RFQSplitItemId=quoteDetail["RFQSplitItemId"];
	this.rfqItemInfo.UOM=quoteDetail["UOM"];
	this.rfqItemInfo.CurrencyId=quoteDetail["CurrencyId"];
	this.rfqItemInfo.DeliveryDate=quoteDetail.DeliveryDate;
	
	this.rfqItem.MfgPartNo=this.quoteDetails["RemoteRFQItems_N"][0].MfgPartNo;
	this.rfqItem.MfgModelNo=this.quoteDetails["RemoteRFQItems_N"][0].MfgModelNo;
	this.rfqItem.VendorModelNo=this.quoteDetails["RemoteRFQItems_N"][0].VendorModelNo;
	this.rfqItem.PFAmount=this.quoteDetails["RemoteRFQItems_N"][0].PFAmount;
	this.rfqItem.CGSTPercentage=this.quoteDetails["RemoteRFQItems_N"][0].CGSTPercentage;
	this.rfqItem.IGSTPercentage=this.quoteDetails["RemoteRFQItems_N"][0].IGSTPercentage;
	this.rfqItem.SGSTPercentage=this.quoteDetails["RemoteRFQItems_N"][0].SGSTPercentage;
	this.rfqItem.PFPercentage=this.quoteDetails["RemoteRFQItems_N"][0].PFPercentage;
	this.rfqItem.FreightAmount=quoteDetail.FreightAmount;
	this.rfqItem.FreightPercentage=quoteDetail.FreightPercentage;
	if(this.rfqItem.FreightAmount!=""){
		this.AddQuotationforitem.controls['FreightPercentage'].setValue("");
		this.AddQuotationforitem.controls['FreightPercentage'].clearValidators();
		this.AddQuotationforitem.controls['FreightPercentage'].updateValueAndValidity();
	}
	 if(this.rfqItem.FreightPercentage!=""){
		this.AddQuotationforitem.controls['FreightAmount'].setValue("");
		this.AddQuotationforitem.controls['FreightAmount'].clearValidators();
		this.AddQuotationforitem.controls['FreightAmount'].updateValueAndValidity();
	 }
	if(this.rfqItem.PFAmount!=null){
	  this.AddQuotationforitem.controls['PFPercentage'].setValue("");
	  this.AddQuotationforitem.controls['PFPercentage'].clearValidators();
	  this.AddQuotationforitem.controls['PFPercentage'].updateValueAndValidity();
	}
	else if(this.rfqItem.PFPercentage!=null){
	  this.AddQuotationforitem.controls['PFAmount'].setValue("");
	  this.AddQuotationforitem.controls['PFAmount'].clearValidators();
	  this.AddQuotationforitem.controls['PFAmount'].updateValueAndValidity();  
	}
	if(this.rfqItem.CGSTPercentage!=null)
	{
	  this.AddQuotationforitem.controls['IGSTPercentage'].setValue("");
	  this.AddQuotationforitem.controls['IGSTPercentage'].clearValidators();
	  this.AddQuotationforitem.controls['IGSTPercentage'].updateValueAndValidity();
	}
	else if(this.rfqItem.IGSTPercentage!=null){
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
	
			this.loadCurrency();
		//	this.currncyModel.CurrencyId = 0;
	  }
	InsertQuotation() {
		this.VQAddSubmitted = true;
		if (this.AddQuotation.invalid) {
			return;
		}
		else {
			//this.rfqItemInfo.UOM = this.UOMModel.UnitID;
			//this.rfqItem.iteminfo = [];
			this.rfqItem.iteminfo.push(this.rfqItemInfo);
			this.rfqItem.RFQRevisionId = this.RfqRevisionId;
          //this.quoteDetails 
			this.RfqService.InsertRfqItemInfo(this.rfqItem).subscribe(data => {
			  this.rfqItem = data;
				this.AddDialog = false;
              //this.quoteDetails = data;
              this.loadQuotationDetails();
			});
		}
  }
 
  fileattachedforitem(event:any) {
	let listfile: FileList = event.target.files;
	let formData: FormData = new FormData();
	if (listfile.length > 0) {
	  let revid="Technical"+this.RfqRevisionId+"_"+this.rfqItemInfo.RFQItemsId+"_"+this.Vendor.VUniqueId;
	  for(let i=0;i<=listfile.length-1;i++)
	{
	  this.Documents=new RFQDocuments();
	  let file: File = listfile[i];
	  formData.append(revid, file,file.name);
	  this.Documents.DocumentName=revid+"\\"+file.name;
	this.Registration.filedata=formData;
	this.Registration.filedata;
	//this.Documents.uniqueid=this.uniqueid;
	this.Registration.DocDetailsLists.push(this.Documents);
	//var selectedFile = this.file[i].filename;//event.target.files[i];
	this.fileList1.push(file);
	this.listOfFiles1.push(revid+"\\"+file.name)
	
	}
	this.RfqService.InsertDocumentToYSCM(formData).subscribe(data => { 
		this.Documents.Path=data;
		
		this.RfqService.InsertDocument(formData).subscribe(data=>{
			if(data!=null){
				this.loadQuotationDetails();
				this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'File inserted  sucessfully to YSCM' });
				//alert("Sucessfully updated in YSCM");
			}
		})
  })
  }
  
}
//   fileattached(event: any,formName: string) {
// 	  let listfile: FileList = event.target.files;
// 	  let formData: FormData = new FormData();
//       if (listfile.length > 0) {
// 		  let doctypeid=document.getElementById('DocTypeid')["value"];
// 		let revid=this.RfqRevisionId+"_"+doctypeid+"_"+this.Vendor.VUniqueId;
// 		for(let i=0;i<=listfile.length-1;i++)
//       {
//         this.Documents=new RFQDocuments();
//         let file: File = listfile[i];
//         formData.append(revid, file,file.name);
//         this.Documents.DocumentName=revid+"_"+file.name;
//       this.Registration.filedata=formData;
//       this.Registration.filedata;
//       //this.Documents.uniqueid=this.uniqueid;
//       this.Registration.DocDetailsLists.push(this.Documents);
//       //var selectedFile = this.file[i].filename;//event.target.files[i];
//       this.fileList.push(file);
//       this.listOfFiles.push(revid+"_"+file.name)
      
//       }
// 	  this.RfqService.InsertDocument(formData).subscribe(data => { 
      
// 	})
// 	}
    
//   }

fileattached(event: any, formName: string) {
	let fileList: FileList = event.target.files;
	let formData: FormData = new FormData();
	  if (fileList.length > 0) {
	  let doctypeid=document.getElementById('DocTypeid')["value"];
	let revid=this.RfqRevisionId+"_"+doctypeid+"_"+this.Vendor.VUniqueId;
	for(let i=0;i<=fileList.length-1;i++)
	  {
		this.Documents=new RFQDocuments();
		let file: File = fileList[i];
		formData.append(revid, file,file.name);
		this.Documents.DocumentName=revid+"\\"+file.name;
	  this.Registration.filedata=formData;
	  this.Registration.filedata;
	  //this.Documents.uniqueid=this.uniqueid;
	  this.Registration.DocDetailsLists.push(this.Documents);
	  //var selectedFile = this.file[i].filename;//event.target.files[i];
	  this.fileList.push(file);
	  this.listOfFiles.push(revid+"\\"+file.name)
	  
	  }
	this.RfqService.InsertDocument(formData).subscribe(data => { 
		this.RfqService.InsertDocumentToYSCM(formData).subscribe(data=>{
			if(data!=null){
				//alert("Sucessfully updated in YSCM");
				this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'File inserted  sucessfully to YSCM' });
			}
		})
  })
  }
	
  }
	Cancel() {
		this.AddDialog = false;
  }
  Cancelforitem() {
	this.AddDialogforitem = false;
}
InsertQuotationforitem() {
	this.VQAddSubmitted = true;
	if (this.AddQuotationforitem.invalid) {
	  return;
	}
	else {
	  //this.rfqItemInfo.UOM = 1;//this.UOMModel.UnitID;
	  //this.rfqItem.iteminfo = [];
	   this.rfqItem.RFQSplitItemId=this.rfqItemInfo.RFQSplitItemId;
	   this.rfqItem.RFQItemId=this.rfqItemInfo.RFQItemsId;
	//    this.rfqItem.RFQVendorbomItemId=this.rfqItemInfo.RFQVendorbomItemId;
	  this.rfqItem.iteminfo.push(this.rfqItemInfo);
	  this.rfqItem.RFQRevisionId = this.RfqRevisionId;
		 // this.quoteDetails = [];
	  this.RfqService.editRfqItemInfo(this.rfqItem).subscribe(data => {
		this.rfqItemsresult = data;
		this.AddDialog = false;
		if(this.rfqItemsresult[0]["errormsg"]=="Success")
			  {
	   
				  this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Updated sucessfully' });
		this.loadQuotationDetails();
	  }
			  //this.quoteDetails = data;
			  //this.loadQuotationDetails();
	  });
	}
  }
  onChangedoctype(id:string) {
	if(id!="0")
	{
	  this.isDisableddoctype = false;
	  //document.getElementById('fileattach1').setAttribute('disabled','false')
	}
	else{
	  this.isDisableddoctype = true;
	
	}
	}
  onRFQItemInfo(rfqItemInfo: RfqItemInfoModel,RFQItemsId:number, index: number) {
	this.vendor=(JSON.parse(localStorage.getItem('AccessToken')));
	this.vendor.access_token=this.vendor.access_token
    this.RfqService.RfqIteminfoDeleteByid(rfqItemInfo.RFQSplitItemId,RFQItemsId).subscribe(data => {
		
    //   if (data == true)
		//this.rfqItem.ite.splice(index, 1);
		this.quoteDetails["RemoteRFQItems_N"][0].RemoteRFQItemsInfo_N.splice(index,1);
		//this.loadQuotationDetails();
    })
  }
  onRFQItemInfo1(ItemId:number,rfqItemInfo: RfqItemInfoModel, index: number) {
	this.vendor=(JSON.parse(localStorage.getItem('AccessToken')));
	this.vendor.access_token=this.vendor.access_token
    this.RfqService.RfqIteminfoDeleteByidformultiple(ItemId,rfqItemInfo.RFQVendorbomItemId).subscribe(data => {
		
    //   if (data == true)
		//this.rfqItem.ite.splice(index, 1);
		this.quoteDetails["RemoteRFQItems_N"][0].RemoteRFQItemsInfo_N.splice(index,1);
		//this.loadQuotationDetails();
    })
  }
}
