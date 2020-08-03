import { Component, OnInit,ViewChild } from '@angular/core';
import { DocDetailsList,StateList,NaturOfBusiness} from './vendor-registration';
import {RfqService} from 'src/app/services/rfq.service '
 import { RfqItemModel, RfqItemInfoModel,VendorRegistration, RFQUnitMasters, RFQCurrencyMaster, RFQDocuments, RFQTerms } from '../../../Models/rfq';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { verifyHostBindings } from '@angular/compiler';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-vendor-register',
  templateUrl: './vendor-register.component.html',
  styleUrls: ['./vendor-register.component.scss']
})
export class VendorRegisterComponent implements OnInit {
  form: FormGroup;
  private formData: FormData = new FormData();
 Registration:VendorRegistration=new VendorRegistration();
  AddQuotation: FormGroup;
  constructor(private messageService: MessageService,private formBuilder: FormBuilder,public RFQservice:RfqService) { }
  public Documents: DocDetailsList;
  public VQAddSubmitted: boolean = false;
 public VendorData: VendorRegistration;
 public VendorDetails: VendorRegistration;
 public showEvaluation: string;
 public MSME:string;
 public Onetimevendor: string;
 public returnId:string;
   StateList:any[]=[];
   NaturOfBusinessList:any[]=[];
   DocumentList:any[]=[];
   uniqueid:string;
   onetimevendor:boolean=true;
   LabelName:any;
   PANLabel:boolean=false;
   isDisabledaddress = true;
   isDisabledGST:boolean=true;
   isDisabledPAN:boolean=true;
   isDisabledCIN:boolean=true;
   isDisabledBank:boolean=true;
   isDisabledCheque:boolean=true;
   isDisabledInspecter:boolean=true;
   isDisabledESI:boolean=true;
   isDisabledPollution:boolean=true;
   isDisabledExcise:boolean=true;
   isDisabledGSTChange:boolean=true;
   isDisabledIncorporation:boolean=true;
   isDisabledPANChange:boolean=true;
   errormsg:boolean=false;
   docid:number;
file:string;
@ViewChild('attachments',{static: false}) attachment: any;

selectedFile: File;
fileList1: File[] = [];
listOfFiles1: any[] = [];
fileList2: File[] = [];
listOfFiles2: any[] = [];
fileList3: File[] = [];
listOfFiles3: any[] = [];
fileList4: File[] = [];
listOfFiles4: any[] = [];
fileList5: File[] = [];
listOfFiles5: any[] = [];
fileList6: File[] = [];
listOfFiles6: any[] = [];
fileList7: File[] = [];
listOfFiles7: any[] = [];
fileList8: File[] = [];
listOfFiles8: any[] = [];
fileList9: File[] = [];
listOfFiles9: any[] = [];
fileList10: File[] = [];
listOfFiles10: any[] = [];

removeSelectedFile1(filename:any,index) {
 // Delete the item from fileNames list
 this.listOfFiles1.splice(index, 1);
 this.Registration.PhysicalPath=filename;
 this.fileList1.splice(index, 1);
this.RFQservice.DeleteFile(this.Registration).subscribe(data=>{
  
})

}
removeSelectedFile2(filename:any,index) {
  // Delete the item from fileNames list
  this.listOfFiles2.splice(index, 1);
  this.Registration.PhysicalPath=filename;
  this.fileList2.splice(index, 1);
 this.RFQservice.DeleteFile(this.Registration).subscribe(data=>{
   
 })
 
 }
 removeSelectedFile3(filename:any,index) {
  // Delete the item from fileNames list
  this.listOfFiles3.splice(index, 1);
  this.Registration.PhysicalPath=filename;
  this.fileList3.splice(index, 1);
 this.RFQservice.DeleteFile(this.Registration).subscribe(data=>{
   
 })
 
 }
 removeSelectedFile4(filename:any,index) {
  // Delete the item from fileNames list
  this.listOfFiles4.splice(index, 1);
  this.Registration.PhysicalPath=filename;
  this.fileList4.splice(index, 1);
 this.RFQservice.DeleteFile(this.Registration).subscribe(data=>{
   
 })
 
 }
 removeSelectedFile5(filename:any,index) {
  // Delete the item from fileNames list
  this.listOfFiles5.splice(index, 1);
  this.Registration.PhysicalPath=filename;
  this.fileList5.splice(index, 1);
 this.RFQservice.DeleteFile(this.Registration).subscribe(data=>{
   
 })
 
 }
 removeSelectedFile6(filename:any,index) {
  // Delete the item from fileNames list
  this.listOfFiles6.splice(index, 1);
  this.Registration.PhysicalPath=filename;
  this.fileList6.splice(index, 1);
 this.RFQservice.DeleteFile(this.Registration).subscribe(data=>{
   
 })
 
 }
 removeSelectedFile7(filename:any,index) {
  // Delete the item from fileNames list
  this.listOfFiles7.splice(index, 1);
  this.Registration.PhysicalPath=filename;
  this.fileList7.splice(index, 1);
 this.RFQservice.DeleteFile(this.Registration).subscribe(data=>{
 })
 }
 removeSelectedFile8(filename:any,index) {
  // Delete the item from fileNames list
  this.listOfFiles8.splice(index, 1);
  this.Registration.PhysicalPath=filename;
  this.fileList8.splice(index, 1);
 this.RFQservice.DeleteFile(this.Registration).subscribe(data=>{
 })
 }
 removeSelectedFile9(filename:any,index) {
  // Delete the item from fileNames list
  this.listOfFiles9.splice(index, 1);
  this.Registration.PhysicalPath=filename;
  this.fileList9.splice(index, 1);
 this.RFQservice.DeleteFile(this.Registration).subscribe(data=>{
 })
 }
 removeSelectedFile10(filename:any,index) {
  // Delete the item from fileNames list
  this.listOfFiles10.splice(index, 1);
  this.Registration.PhysicalPath=filename;
  this.fileList10.splice(index, 1);
 this.RFQservice.DeleteFile(this.Registration).subscribe(data=>{
 })
 }
  ngOnInit() {
    this.VendorData = new VendorRegistration();
    this.VendorDetails=new VendorRegistration();
    this.VendorDetails= JSON.parse(localStorage.getItem("vendordetail"));
    this.returnId=this.VendorDetails.VendorCode;
    this.StateListdata();
    this.NOfBusinessListdata();
this.DocumentListdata();
//this.hideandshowdiv();
this.getvendordetails();
this.AddQuotation = this.formBuilder.group({
  orders: [''],
  State: ['', [Validators.required]],
  street: ['', [Validators.required]],
  VendorName:['',[Validators.required]],
  City:['',[Validators.required]],
  showEvaluation:['',[Validators.required]],
  Onetimevendor:['',[Validators.required]],
  MSME:['',[Validators.required]],
  LocalBranch:['',[Validators.required]],
  PostalCode:['',[Validators.required]],
  BusinessArea:['',[Validators.required]],
  VendorNoInSAP:['',[Validators.required]],
  PhoneExn:['',[Validators.required]],
  Mobile:['',[Validators.required]],
  email:['',[Validators.required]],
  Fax:['',[Validators.required]],
  ContactPerson:['',[Validators.required]],
  contPhone:['',[Validators.required]],
  GSTNo:['',[Validators.required]],
  PANNo:['',[Validators.required]],
  CINNo:['',[Validators.required]],
  TanNo:['',[Validators.required]],
  PaymentTerms:['',[Validators.required]],
  BankerName:['',[Validators.required]],
  LocationOrBranch:['',[Validators.required]],
  AccNo:['',[Validators.required]],
  IFSCCode:['',[Validators.required]],
  AccountHolderName:['',[Validators.required]],
  NaturOfBusiness:['',[Validators.required]],
  BankDetails:['',[Validators.required]],
});
  }
  StateListdata() {
    this.RFQservice.GetStateNames().
    subscribe(
    res => {
    //this._list = res; //save posts in array
    this.StateList= res;
    let _list:any[]=[];
    for (let i = 0; i < (res.length); i++) {
    _list.push({
      StateName:res[i].StateName,
      StateId:res[i].StateId
    });
    }
    this.StateList= _list;
    });
    } 

    DocumentListdata() {
      this.RFQservice.GetDocumentNames().
      subscribe(
      res => {
      //this._list = res; //save posts in array
      this.DocumentList= res;
      let _list:any[]=[];
      for (let i = 0; i < (res.length); i++) {
      _list.push({
        DocumentName:res[i].DocumentName,
        DocId:res[i].DocId
      });
      }
      this.DocumentList= _list;
      });
      } 
    NOfBusinessListdata() {
      this.RFQservice.GetNatureofBusinessList().
      subscribe(
      res => {
      //this._list = res; //save posts in array
      this.NaturOfBusinessList= res;
      let _list:any[]=[];
      for (let i = 0; i < (res.length); i++) {
      _list.push({
        NatureofbusinessName:res[i].NatureofbusinessName,
        NaturofBusinessId:res[i].NaturofBusinessId
      });
      }
      this.NaturOfBusinessList= _list;
      });
      } 
 
  
onChange1(id:string) {
if(id=="1")
{
  this.isDisabledaddress = false;
  //document.getElementById('fileattach1').setAttribute('disabled','false')
}
else{
  this.isDisabledaddress = true;

}
}
onChange2(id:string) {
if(id=="2")
{
  this.isDisabledGST=false;
  
}
else{
  this.isDisabledGST=true;
}
}
onChange3(id:string) {
 if(id=="3") 
 {
  this.isDisabledPAN=false;
 }
 else{
  this.isDisabledPAN=true;
}
}
onChange4(id:string) {
  if(id=="4") 
  {
   this.isDisabledCIN=false;
  }
  else{
   this.isDisabledCIN=true;
 }
 }
 onChange5(id:string) {
  if(id=="5") 
  {
   this.isDisabledBank=false;
  }
  else{
   this.isDisabledBank=true;
 }
 }
 onChange6(id:string) {
  if(id=="6") 
  {
   this.isDisabledCheque=false;
  }
  else{
   this.isDisabledCheque=true;
 }
 }
 onChange7(id:string) {
  if(id=="7") 
  {
   this.isDisabledInspecter=false;
  }
  else{
   this.isDisabledInspecter=true;
 }
 }
 onChange8(id:string) {
  if(id=="8") 
  {
   this.isDisabledESI=false;
  }
  else{
   this.isDisabledESI=true;
 }
 }
 onChange9(id:string) {
  if(id=="9") 
  {
   this.isDisabledPollution=false;
  }
  else{
   this.isDisabledPollution=true;
 }
 }
 onChange10(id:string) {
  if(id=="10") 
  {
   this.isDisabledExcise=false;
  }
  else{
   this.isDisabledExcise=true;
 }
 }

 save(form: any): boolean {
   
  if (!form.valid) {
      return false;
  }
   return true;
}
Savevendor(form: any) {
  
  // if(form.status!="INVALID"){
     this.VQAddSubmitted =false;
    
  let name=this.VendorData.VendorName;
  let street=this.VendorData.street;
  this.VendorData.UniqueId= this.VendorDetails.UniqueId;
  this.VendorData.vendorId=this.VendorDetails.vendorId;
  this.VendorData.VendorCode=this.VendorDetails.VendorCode;
  //this.Registration.PhysicalPath=this.file;
  this.VendorData.stateid=document.getElementById('stateid')["value"];
  this.VendorData.NatureofBusiness=document.getElementById('drp_Business')["value"];
  
  var dtaa=document.getElementsByName("input[name='onetimeven']:checked");
  console.log("data suces",dtaa);
  this.RFQservice.VendorregisterSave(this.VendorData)
  .subscribe(data=>{
  let id=data;
  //this.uniqueid=data[0].UniqueId;
  //this.uniqueid="10";
  if(data[0].UniqueId!=null || data[0].UniqueId!=0)
  {
    this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Data saved sucessfully' });
  this.returnId=data[0].UniqueId;
  }
  
  })
    }
 // }
 hideandshowdiv(){
   if(this.returnId==null || this.returnId=="" || this.returnId==undefined)
   {
     document.getElementById("docdetailsid").style.display="block";
     document.getElementById("docdetailsid1").style.display ="block";
   }
   else{
    document.getElementById("docdetailsid").style.display="block";
    document.getElementById("docdetailsid1").style.display="block";
   }
 }
  
  getvendordetails(){
    this.RFQservice.getvendordetails(this.VendorDetails.vendorId).subscribe(data=>{
this.VendorData=data;
    })
  }
  
  
  FinalSubmit(form: any) {
    this.VQAddSubmitted = true;
    if(form.status!="INVALID"){
     // this.VQAddSubmitted =false;
let name=this.Registration.VendorName;
let street=this.Registration.street;
this.Registration.UniqueId=17;
//this.Registration.PhysicalPath=this.file;
this.Registration.stateid=document.getElementById('stateid')["value"];
this.Registration.NatureofBusiness=document.getElementById('drp_Business')["value"];

var dtaa=document.getElementsByName("input[name='onetimeven']:checked");
console.log("data suces",dtaa);
this.RFQservice.VendorregisterSave(this.Registration)
.subscribe(data=>{
let id=data;
//this.uniqueid=data[0].UniqueId;
this.uniqueid="10";
if(data[0].UniqueId!=null || data[0].UniqueId!=0)
{

}

})
  }
  // else{
  //   this.VQAddSubmitted = false;
  // }
}

  fileattached1(event: any, formName: string) {
    debugger;
    let fileList: FileList = event.target.files;
    this.Registration.DocumentTypeId=document.getElementById('drp_documenttype1')["value"];
    let idanddocid=this.Registration.DocumentTypeId+"_"+10;
    let formData: FormData = new FormData();
    if (fileList.length > 0) {
      
      for(let i=0;i<=fileList.length-1;i++)
      {
        this.Documents=new DocDetailsList();
        let file: File = fileList[i];
        formData.append(idanddocid, file,idanddocid+"_"+file.name);
        this.Documents.DocumentName=idanddocid+"_"+file.name;
      this.Documents.DocumentTypeId=this.Registration.DocumentTypeId;
      this.Registration.filedata=formData;
      this.Registration.filedata;
      //this.Documents.uniqueid=this.uniqueid;
      this.Registration.DocDetailsLists.push(this.Documents);
      //var selectedFile = this.file[i].filename;//event.target.files[i];
      this.fileList1.push(file);
      this.listOfFiles1.push(idanddocid+"_"+file.name)
      
      }
      
      //var data = new Blob([file], { type: 'text/plain;charset=utf-8' });
     

      this.RFQservice.uploadFile(formData).subscribe(data => { 
      
      })
    }
  }

  fileattached2(event: any, formName: string) {
    let fileList: FileList = event.target.files;
    this.Registration.DocumentTypeId=document.getElementById('drp_documenttype2')["value"];
    let idanddocid=this.Registration.DocumentTypeId+"_"+10;
    let formData: FormData = new FormData();
    if (fileList.length > 0) {
      
      for(let i=0;i<=fileList.length-1;i++)
      {
        this.Documents=new DocDetailsList();
        let file: File = fileList[i];
        formData.append(idanddocid, file,idanddocid+"_"+file.name);
        this.Documents.DocumentName=idanddocid+"_"+file.name;
      this.Documents.DocumentTypeId=this.Registration.DocumentTypeId;
      this.Registration.filedata=formData;
      this.Registration.filedata;
      //this.Documents.uniqueid=this.uniqueid;
      this.Registration.DocDetailsLists.push(this.Documents);
      //var selectedFile = this.file[i].filename;//event.target.files[i];
      this.fileList2.push(file);
      this.listOfFiles2.push(idanddocid+"_"+file.name)
      }
      
      //var data = new Blob([file], { type: 'text/plain;charset=utf-8' });
     

      this.RFQservice.uploadFile(formData).subscribe(data => { 
      })
    }
  }
  fileattached3(event: any, formName: string) {
    let fileList: FileList = event.target.files;
    this.Registration.DocumentTypeId=document.getElementById('drp_documenttype3')["value"];
    let idanddocid=this.Registration.DocumentTypeId+"_"+10;
    let formData: FormData = new FormData();
    if (fileList.length > 0) {
      
      for(let i=0;i<=fileList.length-1;i++)
      {
        this.Documents=new DocDetailsList();
        let file: File = fileList[i];
        formData.append(idanddocid, file,idanddocid+"_"+file.name);
        this.Documents.DocumentName=idanddocid+"_"+file.name;
      this.Documents.DocumentTypeId=this.Registration.DocumentTypeId;
      this.Registration.filedata=formData;
      this.Registration.filedata;
      //this.Documents.uniqueid=this.uniqueid;
      this.Registration.DocDetailsLists.push(this.Documents);
      //var selectedFile = this.file[i].filename;//event.target.files[i];
      this.fileList3.push(file);
      this.listOfFiles3.push(idanddocid+"_"+file.name)
      }
      this.RFQservice.uploadFile(formData).subscribe(data => { 
      })
    }
  }
  fileattached4(event: any, formName: string) {
    let fileList: FileList = event.target.files;
    this.Registration.DocumentTypeId=document.getElementById('drp_documenttype4')["value"];
    let idanddocid=this.Registration.DocumentTypeId+"_"+10;
    let formData: FormData = new FormData();
    if (fileList.length > 0) {
      
      for(let i=0;i<=fileList.length-1;i++)
      {
        this.Documents=new DocDetailsList();
        let file: File = fileList[i];
        formData.append(idanddocid, file,idanddocid+"_"+file.name);
        this.Documents.DocumentName=idanddocid+"_"+file.name;
      this.Documents.DocumentTypeId=this.Registration.DocumentTypeId;
      this.Registration.filedata=formData;
      this.Registration.filedata;
      //this.Documents.uniqueid=this.uniqueid;
      this.Registration.DocDetailsLists.push(this.Documents);
      //var selectedFile = this.file[i].filename;//event.target.files[i];
      this.fileList4.push(file);
      this.listOfFiles4.push(idanddocid+"_"+file.name)
      }
      this.RFQservice.uploadFile(formData).subscribe(data => { 
      })
    }
  }
  fileattached5(event: any, formName: string) {
    let fileList: FileList = event.target.files;
    this.Registration.DocumentTypeId=document.getElementById('drp_documenttype5')["value"];
    let idanddocid=this.Registration.DocumentTypeId+"_"+10;
    let formData: FormData = new FormData();
    if (fileList.length > 0) {
      
      for(let i=0;i<=fileList.length-1;i++)
      {
        this.Documents=new DocDetailsList();
        let file: File = fileList[i];
        formData.append(idanddocid, file,idanddocid+"_"+file.name);
        this.Documents.DocumentName=idanddocid+"_"+file.name;
      this.Documents.DocumentTypeId=this.Registration.DocumentTypeId;
      this.Registration.filedata=formData;
      this.Registration.filedata;
      //this.Documents.uniqueid=this.uniqueid;
      this.Registration.DocDetailsLists.push(this.Documents);
      //var selectedFile = this.file[i].filename;//event.target.files[i];
      this.fileList5.push(file);
      this.listOfFiles5.push(idanddocid+"_"+file.name)
      }
      this.RFQservice.uploadFile(formData).subscribe(data => { 
      })
    }
  }
  fileattached6(event: any, formName: string) {
    let fileList: FileList = event.target.files;
    this.Registration.DocumentTypeId=document.getElementById('drp_documenttype6')["value"];
    let idanddocid=this.Registration.DocumentTypeId+"_"+10;
    let formData: FormData = new FormData();
    if (fileList.length > 0) {
      
      for(let i=0;i<=fileList.length-1;i++)
      {
        this.Documents=new DocDetailsList();
        let file: File = fileList[i];
        formData.append(idanddocid, file,idanddocid+"_"+file.name);
        this.Documents.DocumentName=idanddocid+"_"+file.name;
      this.Documents.DocumentTypeId=this.Registration.DocumentTypeId;
      this.Registration.filedata=formData;
      this.Registration.filedata;
      //this.Documents.uniqueid=this.uniqueid;
      this.Registration.DocDetailsLists.push(this.Documents);
      //var selectedFile = this.file[i].filename;//event.target.files[i];
      this.fileList6.push(file);
      this.listOfFiles6.push(idanddocid+"_"+file.name)
      }
      this.RFQservice.uploadFile(formData).subscribe(data => { 
      })
    }
  }
  fileattached7(event: any, formName: string) {
    let fileList: FileList = event.target.files;
    this.Registration.DocumentTypeId=document.getElementById('drp_documenttype7')["value"];
    let idanddocid=this.Registration.DocumentTypeId+"_"+10;
    let formData: FormData = new FormData();
    if (fileList.length > 0) {
      
      for(let i=0;i<=fileList.length-1;i++)
      {
        this.Documents=new DocDetailsList();
        let file: File = fileList[i];
        formData.append(idanddocid, file,idanddocid+"_"+file.name);
        this.Documents.DocumentName=idanddocid+"_"+file.name;
      this.Documents.DocumentTypeId=this.Registration.DocumentTypeId;
      this.Registration.filedata=formData;
      this.Registration.filedata;
      //this.Documents.uniqueid=this.uniqueid;
      this.Registration.DocDetailsLists.push(this.Documents);
      //var selectedFile = this.file[i].filename;//event.target.files[i];
      this.fileList7.push(file);
      this.listOfFiles7.push(idanddocid+"_"+file.name)
      }
      this.RFQservice.uploadFile(formData).subscribe(data => { 
      })
    }
  }
  fileattached8(event: any, formName: string) {
    let fileList: FileList = event.target.files;
    this.Registration.DocumentTypeId=document.getElementById('drp_documenttype8')["value"];
    let idanddocid=this.Registration.DocumentTypeId+"_"+10;
    let formData: FormData = new FormData();
    if (fileList.length > 0) {
      
      for(let i=0;i<=fileList.length-1;i++)
      {
        this.Documents=new DocDetailsList();
        let file: File = fileList[i];
        formData.append(idanddocid, file,idanddocid+"_"+file.name);
        this.Documents.DocumentName=idanddocid+"_"+file.name;
      this.Documents.DocumentTypeId=this.Registration.DocumentTypeId;
      this.Registration.filedata=formData;
      this.Registration.filedata;
      //this.Documents.uniqueid=this.uniqueid;
      this.Registration.DocDetailsLists.push(this.Documents);
      //var selectedFile = this.file[i].filename;//event.target.files[i];
      this.fileList8.push(file);
      this.listOfFiles8.push(idanddocid+"_"+file.name)
      }
      this.RFQservice.uploadFile(formData).subscribe(data => { 
      })
    }
  }
  fileattached9(event: any, formName: string) {
    let fileList: FileList = event.target.files;
    this.Registration.DocumentTypeId=document.getElementById('drp_documenttype9')["value"];
    let idanddocid=this.Registration.DocumentTypeId+"_"+10;
    let formData: FormData = new FormData();
    if (fileList.length > 0) {
      
      for(let i=0;i<=fileList.length-1;i++)
      {
        this.Documents=new DocDetailsList();
        let file: File = fileList[i];
        formData.append(idanddocid, file,idanddocid+"_"+file.name);
        this.Documents.DocumentName=idanddocid+"_"+file.name;
      this.Documents.DocumentTypeId=this.Registration.DocumentTypeId;
      this.Registration.filedata=formData;
      this.Registration.filedata;
      //this.Documents.uniqueid=this.uniqueid;
      this.Registration.DocDetailsLists.push(this.Documents);
      //var selectedFile = this.file[i].filename;//event.target.files[i];
      this.fileList9.push(file);
      this.listOfFiles9.push(idanddocid+"_"+file.name)
      }
      this.RFQservice.uploadFile(formData).subscribe(data => { 
      })
    }
  }
  fileattached10(event: any, formName: string) {
    let fileList: FileList = event.target.files;
    this.Registration.DocumentTypeId=document.getElementById('drp_documenttype10')["value"];
    let idanddocid=this.Registration.DocumentTypeId+"_"+10;
    let formData: FormData = new FormData();
    if (fileList.length > 0) {
      
      for(let i=0;i<=fileList.length-1;i++)
      {
        this.Documents=new DocDetailsList();
        let file: File = fileList[i];
        formData.append(idanddocid, file,idanddocid+"_"+file.name);
        this.Documents.DocumentName=idanddocid+"_"+file.name;
      this.Documents.DocumentTypeId=this.Registration.DocumentTypeId;
      this.Registration.filedata=formData;
      this.Registration.filedata;
      //this.Documents.uniqueid=this.uniqueid;
      this.Registration.DocDetailsLists.push(this.Documents);
      //var selectedFile = this.file[i].filename;//event.target.files[i];
      this.fileList10.push(file);
      this.listOfFiles10.push(idanddocid+"_"+file.name)
      }
      this.RFQservice.uploadFile(formData).subscribe(data => { 
      })
    }
  }
}
