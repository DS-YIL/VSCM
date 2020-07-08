import { Component, Input, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { RfqService } from 'src/app/services/rfq.service ';
import { QuoteDetails,VendorCommunication} from 'src/app/Models/rfq';
import { constants } from 'src/app/Models/MPRConstants';
import { ActivatedRoute, Router } from '@angular/router';
import {Employee,Vendor,MPRReminderTracking } from 'src/app/Models/mpr';
import { MessageService } from 'primeng/api';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-VendorQuotationView',
  templateUrl: './VendorQuotationView.component.html'
})

export class VendorQuotationViewComponent implements OnInit {

  constructor( private messageService: MessageService,private formBuilder: FormBuilder,public RfqService: RfqService, public constants: constants, private route: ActivatedRoute, private router: Router) { }
  @ViewChild('dialog', { read: ElementRef, static: true })
  public showMaterialForm; showVendorForm; showOtherDetailsForm; communicationFormEdit; showCommunicationForm: boolean = false;
  public displayInchargeDialog; showVendorDialog; showDocumentationDialog; displayCommunicationDialog; showFileViewer: boolean = false;
  public Vendor:Vendor;
  vendorCommunicationForm: FormGroup;
  public vendor:Vendor;
  public RfqRevisionId: number = 0;
  public encrytedrfqid:number=0;
  public rfqitemsid:number=0;
  public quoteDetails: QuoteDetails;
  public rfqno:string;
  public docDetails: QuoteDetails;
  public technicaldocDetails: QuoteDetails;
  public VendorCommunications: VendorCommunication;
  public VendorCommunicationsList:Array<VendorCommunication>;
  public  VendorCommunicationSubmitted = false;
public VendorTermsList:any[]=[];
public DESkey:string;
  istermsdisplay:boolean=false; 
  historydisplay:boolean=false;
  ngOnInit() {
   
    if (!localStorage.getItem("AccessToken"))
    {
    localStorage.removeItem("AccessToken");
    this.router.navigateByUrl("Login");
    }
    else
   this.vendor = JSON.parse(localStorage.getItem("vendordetail"));
    this.quoteDetails = new QuoteDetails();
    this.route.params.subscribe(params => {
      if (params["RFQRevisionId"]!=0) {
        this.encrytedrfqid=this.decrypt(params["RFQRevisionId"]);
        this.RfqRevisionId = params["RFQRevisionId"];
        this.loadQuotationDetails();
        this.loaddocDetails();
        this.loaddocDetailsbyitemsid();
        this.CommunicationHistory();
        this.gettermsandconds();
      }
    });
    this.vendorCommunicationForm = this.formBuilder.group({
      Remarks: ['', [Validators.required]],
      setReminder: ['', [Validators.required]],
      sendemail: ['', [Validators.required]],
      ReminderDate: ['', [Validators.required]],
      toEmail: ['', [Validators.required]],
      ccEmail: ['', [Validators.required]]

    })
    
    this.VendorCommunications = new VendorCommunication();
  }
  
  loaddocDetails() {
    
    this.RfqService.GetdocDetailsById(this.encrytedrfqid).subscribe(data => {
      this.docDetails = data;
  
      console.log("data1",this.docDetails);
     
    });
  }
  loaddocDetailsbyitemsid() {
    let rfqitem=this.quoteDetails.RemoteRFQItemsInfo_N
    this.RfqService.GetdocDetailsByIdanditemsid(this.encrytedrfqid,this.rfqitemsid).subscribe(data => {
      this.technicaldocDetails = data;
  
      console.log("data2",this.docDetails);
     
    });
  }
  viewDocument(path: string, documentname: string) {
		//this.doc = this.sanitizer.bypassSecurityTrustResourceUrl("http://10.29.15.68:90/SCMDocs/2.xlsx");
		var path1 = path.replace(/\\/g, "/");
		path1 = this.constants.Documnentpath + path1;
		window.open(path1);
		//window.open("http://10.29.15.68:90/SCMDocs/2.xlsx");
		//this.showFileViewer = true;   
	  }
  loadQuotationDetails() {
    this.RfqService.GetRfqDetailsById(this.encrytedrfqid).subscribe(data => {
      this.quoteDetails = data;
//this.quoteDetails.rfqmaster["RfqNo"]= this.quoteDetails["RemoteRFQMaster"]["RFQNo"];
//console.log("rfqnumber",this.quoteDetails.rfqmaster["RfqNo"]);
//console.log("this.quoteDetails",this.quoteDetails["RemoteRFQMaster"]["RFQNo"],this.quoteDetails.RfqNo)
      let docs=this.quoteDetails.RemoteRFQDocuments.length;
      console.log("data",this.quoteDetails);
      if(docs!=0)
			{
				this.istermsdisplay=true;
			}
    });
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
  EditRFQ(){
    this.router.navigate(['/VSCM/RFQEdit',this.RfqRevisionId]);
  }
  removeCommunication(details: MPRReminderTracking) {
    // var index = this.MPRCommunications.MPRReminderTrackings.findIndex(x => x.MailTo == details.MailTo);
    // this.MPRCommunications.MPRReminderTrackings.splice(index, 1);

  }
  onCommnicationSubmit(dialogName: string) {
   this.VendorCommunicationSubmitted=true
    this.VendorCommunications.RemarksFrom = this.vendor.VUniqueId;
this.VendorCommunications.RFQRevisionId=this.RfqRevisionId;

this.RfqService.InsertVendorCommunication(this.VendorCommunications).subscribe(data => {
  this.quoteDetails = data;
 if(data=="OK")
 {
  this[dialogName] = false;
  this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Updated sucessfully' });
 }
});
    console.log(this.VendorCommunications.Remarks,"remarks");
    
  }
  dialogCancel( dialogName) {
    this[dialogName] = false;
    this.VendorCommunicationSubmitted=false;
  }
  showCommunicationDialogToAdd(dialogName: string,) {
    this[dialogName] = true;
    this.VendorCommunications = new VendorCommunication();
  }

  showCommunicationDialogToAddeachitem(dialogName: string,rfqitem:any) {
    this[dialogName] = true;
    console.log("rfqitemsid",rfqitem);
    this.VendorCommunications = new VendorCommunication();
    this.VendorCommunications.RFQItemsId=rfqitem;
  }
  CommunicationHistory(){
   
    this.RfqService.GetVendorCommunicationForRFQRevId(this.encrytedrfqid).subscribe(data => {
      this.VendorCommunicationsList = data;
      if(data.length!=0)
      {
        this.historydisplay=true;
      }
   // console.log("commdata",this.VendorCommunicationsList);
    });
  }
 
  gettermsandconds() {
    this.RfqService.gettermsandconditionsByid(this.encrytedrfqid).
    subscribe(
    res => {
    //this._list = res; //save posts in array
    this.VendorTermsList= res;
    let _list:any[]=[];
    for (let i = 0; i < (res.length); i++) {
    _list.push({
      Terms:res[i].Terms,
      VRfqTermsid:res[i].VRfqTermsid,
      remarks:res[i].remarks,
      VendorResponse:res[i].VendorResponse,
    });
    }
    this.VendorTermsList= _list;
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
}
