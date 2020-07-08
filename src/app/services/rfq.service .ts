import { Injectable } from '@angular/core';
import { HttpClient, JsonpInterceptor } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { DynamicSearchResult, mprRevision, MPRItemInfoes, MPRDocument, MPRVendorDetail, MPRDocumentations, MPRStatusUpdate, mprFilterParams, MPRBuyerGroup, MPRApprovers, Vendor, Employee } from '../Models/mpr';
import { constants } from '../Models/MPRConstants'
import { RfqItemModel, rfqFilterParams } from '../Models/rfq';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
@Injectable({
	providedIn: 'root'
})


export class RfqService {
	public tokenurl=this.constants.tokenurl;
	public yscmurl=this.constants.yscmurl;
	public AESkey:string;
	
	//private currentUserSubject: BehaviorSubject<Vendor>;
	public accessToken:string;
	public vendor:Vendor;
	public tokenvalue:string;
	//public currentUser:Observable<Vendor>
	private currentUserSubject: BehaviorSubject<Employee>;
	public currentUser: Observable<Employee>;
	constructor(private http: HttpClient, private constants: constants) { 
		if(localStorage.getItem('AccessToken'))
		{
		this.vendor=(JSON.parse(localStorage.getItem('AccessToken')));
		this.accessToken=this.vendor.access_token;
		}
		//if(this.vendor)
	
		this.currentUserSubject=new BehaviorSubject<Employee>(JSON.parse(localStorage.getItem("vendordetail")));
		this.currentUser=this.currentUserSubject.asObservable();
	//}
		
	
		
	}
	public get currentuservalue():Employee{
		return this.currentUserSubject.value;
	}
	
	
	public url = this.constants.url;

	gettoken(search: DynamicSearchResult) {
		var data = "grant_type=password&username=" + search.username + "&password=" + search.password;
		 const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) };
		return this.http.post<any>(this.tokenurl + 'token',data,httpOptions)
		  .pipe(map(data => {
			if (data != null ||data!="") {
			
			  localStorage.setItem('AccessToken', JSON.stringify(data));
			  this.currentUserSubject.next(data);
			  this.vendor=(JSON.parse(localStorage.getItem('AccessToken')));
			  if(this.vendor)
			  this.accessToken=this.vendor.access_token;
			}
			return data;
		  }
		  )
		  )
		  
		 
	  }
	  
	  public httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': "bearer " + this.accessToken}) };
	getRFQItems(MPRRevisionId: number): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		return this.http.get<any>(this.url + 'RFQ/getRFQItems/' + MPRRevisionId,httpOptions);
	}
	logout() {
		localStorage.clear();
		this.currentUserSubject.next(null);
		
	  }
	
	updateVendorQuotes(vendorQuoteList: any, termsList: any): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		var Data = {
			RFQQuoteViewList: vendorQuoteList,
			TermsList: termsList
		}
		return this.http.post<any>(this.url + 'RFQ/updateVendorQuotes', JSON.stringify(Data), httpOptions);
	}
	getRFQCompareItems(MPRRevisionId: number): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		return this.http.get<any>(this.url + 'RFQ/getRFQCompareItems/' + MPRRevisionId,httpOptions);
	}
	
	statusUpdate(vendorList: any): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		var Data = {
			RFQQuoteViewList: vendorList
		}
		return this.http.post<any>(this.url + 'RFQ/rfqStatusUpdate/', JSON.stringify(Data), httpOptions);
	}
	GetItemsByRevisionId(RevisionId: number): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		return this.http.get<any>(this.url + 'RFQ/GetItemsByRevisionId/' + RevisionId,httpOptions);
	}
	GetRfqDetailsById(RevisionId: number): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		return this.http.get<any>(this.url + 'RFQ/GetRfqDetailsById/' + RevisionId,httpOptions);
	}
	GetdocDetailsById(RevisionId: number): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		return this.http.get<any>(this.url + 'RFQ/getdocumentbyrevid/' + RevisionId,httpOptions);
	}
	GetdocDetailsByIdanditemsid(RevisionId: number,rfqitemsid:number): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		return this.http.get<any>(this.url + 'RFQ/getdocumentbyrevid/' + RevisionId+"/"+rfqitemsid,httpOptions);
	}
	//this
	GetUnitMasterList(): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		return this.http.get<any>(this.url + 'RFQ/GetUnitMasterList', httpOptions);
	}
	GetAllMasterCurrency(): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		return this.http.get<any>(this.url + 'RFQ/GetAllMasterCurrency', httpOptions);
	}
	InsertRfqItemInfo(rfqItem: RfqItemModel): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':"bearer "+this.accessToken}) };
		return this.http.post<any>(this.url + 'RFQ/InsertRfqItemInfo/', rfqItem, httpOptions);
	}
	editRfqItemInfo(rfqItem: RfqItemModel): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		return this.http.post<any>(this.url + 'RFQ/editRfqItemInfo/', rfqItem, httpOptions);
	}
	
	getRFQList(rfqFilterParams: rfqFilterParams): Observable<any[]> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		return this.http.post<any[]>(this.url + 'RFQ/getRFQList/', rfqFilterParams, httpOptions);
	}
	GetRfqByVendorId(VendorId: any): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		return this.http.post<any>(this.url + 'RFQ/GetRfqByVendorId/', JSON.stringify(VendorId),httpOptions);
	}
	//getallrfqlist(): Observable<any> {
	//	return this.http.get<any>(this.url + 'RFQ/getallrfqlist', this.httpOptions);
	//}
	VendorregisterSubmit(vendorList: any): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		return this.http.post<any>(this.url + 'RFQ/VendorRegister/', JSON.stringify(vendorList), httpOptions);
	}
	VendorTermsUpdate(vendorTermsList: any): Observable<any[]> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		return this.http.post<any[]>(this.url + 'RFQ/RFQTermUpdate/', JSON.stringify(vendorTermsList), httpOptions);
	}
	FinalSumit(RFQRevisionId: number): Observable<any[]> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		return this.http.get<any>(this.url + 'RFQ/finalsubmitfromVendor/'+RFQRevisionId, httpOptions);
	}
	VendorregisterSave(vendorList: any): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		return this.http.post<any>(this.url + 'RFQ/SaveVendorDetails/', JSON.stringify(vendorList), httpOptions);
	}
	getvendordetails(vendorid: number): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		return this.http.get<any>(this.url + 'RFQ/Getvendordetails/' +vendorid, httpOptions);
	}
	uploadFile(formdata: FormData): Observable<any> {
		const customHeaders = new HttpHeaders({
			'Authorization': 'Bearer ' + this.accessToken,
			'Accepted-Encoding': 'application/json'
		  });
		  const customOptions = {
			headers: customHeaders,
			reportProgress: true,
		  };
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		return this.http.post<any>(this.url + 'RFQ/UploadFile/', formdata,customOptions)
		  .pipe(map(data => {
			return data;
		  }))
	  }
	  GetStateNames(): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		return this.http.get<any>(this.url + 'RFQ/GetStateList', httpOptions);
	}
	GetTermsListForRFQ(RFQRevisionId:number): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		return this.http.get<any>(this.url + 'RFQ/GetAllRFQTerms/'+RFQRevisionId, httpOptions);
	}
	GetNatureofBusinessList(): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		return this.http.get<any>(this.url + 'RFQ/GetNaturOfBusiness', httpOptions);
	}
	GetDocumentNames(): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		return this.http.get<any>(this.url + 'RFQ/GetDocumentTypeList', httpOptions);
	}
	GetDocumentMasterList(): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		return this.http.get<any>(this.url + 'RFQ/GetDocumentMasterList', httpOptions);
	}
	DeleteFile(vendorList: any): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		return this.http.post<any>(this.url + 'RFQ/deleteAttachedDocuments/', JSON.stringify(vendorList), httpOptions);
	}
	changepassword(vendorList: any): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		return this.http.post<any>(this.url + 'RFQ/changepassword/', JSON.stringify(vendorList), httpOptions);
	}
	DeleteFileFrmYSCM(mprdocument: any): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		return this.http.post<any>(this.yscmurl + 'deleteMPRDocument/', JSON.stringify(mprdocument));
	}
	DeleteDocuments(vendorList: any): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		
		return this.http.post<any>(this.url + 'RFQ/deleteAttachedfile/', JSON.stringify(vendorList), httpOptions);
	}
	InsertDocument(formData: FormData): Observable<any> {
		const customHeaders = new HttpHeaders({
			'Authorization': 'Bearer ' + this.accessToken,
			'Accepted-Encoding': 'application/json'
		  });
		  const customOptions = {
			headers: customHeaders,
			reportProgress: true,
		  };
		const httpOptions = { headers: new HttpHeaders({'Accept':'application/json', 'Content-Type': 'multipart/form-data','Authorization':"bearer "+this.accessToken }) };
		return this.http.post<any>(this.url + 'RFQ/InsertDocument/', formData,customOptions)
		
		  .pipe(map(data => { return data }));
	  }
	  InsertDocumentToYSCM(formData: FormData): Observable<any> {
		return this.http.post<any>(this.yscmurl +'uploadfile/', formData)
		
		  .pipe(map(data => { return data }));
	  }
	 
	  InsertVendorCommunication(vendorlist: any): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		return this.http.post<any>(this.url + 'RFQ/InsertVendorCommunication/', JSON.stringify(vendorlist), httpOptions)
		  .pipe(map(data => { return data }));
	  }
	  RfqIteminfoDeleteByid(id: number,RFQItemsId:number): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		return this.http.get<any>(this.url + 'RFQ/RfqIteminfoDeleteByid/'+id +'/'+RFQItemsId, httpOptions)
		.pipe(map(data => { return data }));
	  }
	  RfqIteminfoDeleteByidformultiple(rfqitemid: number,bomid:number): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		return this.http.get<any>(this.url + 'RFQ/RfqIteminfoDeleteByidformultiple/'+rfqitemid +'/' +bomid, httpOptions)
		.pipe(map(data => { return data }));
	  }
	  GetVendorCommunicationForRFQRevId(RFQRevisionId: number): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		return this.http.get<any>(this.url + 'RFQ/GetCommunicationListForRFQRevisionId/'+RFQRevisionId, httpOptions)
		  .pipe(map(data => { return data }));
	  }
	
	  gettermsandconditionsByid(RFQRevisionId: number): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken }) };
		return this.http.get<any>(this.url + 'RFQ/GetTermsByRFQrevisionId/'+RFQRevisionId, httpOptions);
	  }
	  
	 getVendordetail(accesstoken:any): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+accesstoken }) };

		return this.http.get<any>(this.url + 'RFQ/Vendordetails',httpOptions)
		.pipe(map(data=>{
			if(data!=null){
				localStorage.setItem('vendordetail', JSON.stringify(data));
				this.currentUserSubject.next(data);
				
				return data;
			}
		}));

	  }
	  checkemail(emailid:any): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.post<any>(this.url + 'Forgetpassword/checkemail/',emailid,httpOptions);
	}
	sendEmailLink(emailid:any): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
		return this.http.post<any>(this.url + 'Forgetpassword/sendLinkforForgetpassword/',emailid,httpOptions);
	}
	Resetpassword(vendorList: any): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
		return this.http.post<any>(this.url + 'Forgetpassword/Resetpassword/', JSON.stringify(vendorList), httpOptions);
	}
	checklinkexpired(vendorList: any): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
		return this.http.post<any>(this.url + 'Forgetpassword/checkforgetpasswordlink/', JSON.stringify(vendorList), httpOptions);
	}
		
	checkrfqitemsid(rfqitemsid:any): Observable<any> {
		const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':"bearer "+this.accessToken}) };
		return this.http.get<any>(this.url + 'RFQ/checkrfqitemsid?rfqitemsid='+rfqitemsid,httpOptions);
	}
}
