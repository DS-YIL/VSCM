import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RfqService } from '../../services/rfq.service ';
import { constants } from '../../models/RFQConstants'
import { ActivatedRoute } from '@angular/router';
import { Vendor,RFQMasters, RFQRevisionData, RFQfilter, rfqFilterParams } from '../../Models/RFQModel';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { DatePipe } from '@angular/common/'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-VendorQuotationList',
  templateUrl: './VendorQuotationList.component.html'
})
export class VendorQuotationListComponent implements OnInit {
  constructor(private datePipe: DatePipe, private router: Router, private spinner: NgxSpinnerService,private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private cdRef: ChangeDetectorRef, public RfqService: RfqService, public constants: constants, private route: ActivatedRoute) { }
  public rfqvendorobj: RFQfilter;
  public rfqFilterParams: rfqFilterParams;
  public VendorQuotationList: FormGroup;
  public rfqMastersModel: RFQMasters;
  public rfqRevisions: RFQRevisionData;
  public Vendor: Vendor;
  public showFilterBlock: boolean = true;

  public toDate: Date = new Date();
  public fromDate: Date = new Date(new Date().setDate(new Date().getDate() - 30));
  ngOnInit() {
    if (!localStorage.getItem("AccessToken")) {
      this.router.navigateByUrl("Login");
      return true;
    }

    //this.typeOfList = this.route.routeConfig.path;
    //this.rfqFilterParams = new rfqFilterParams();
    //  this.fromDate=new Date();
    // this.toDate=new Date(new Date().setDate(new Date().getDate() - 30));

    //this.rfqFilterParams.ToDate = new Date();
    // this.rfqFilterParams.ToDate = new Date();
    // this.rfqFilterParams.FromDate = new Date(new Date().setDate(new Date().getDate() - 30));
    // this.rfqFilterParams.ToDate=this.rfqFilterParams.ToDate;
    // this.rfqFilterParams.FromDate= this.rfqFilterParams.FromDate;
    this.Vendor = JSON.parse(localStorage.getItem("vendordetail"));
    this.rfqvendorobj = new RFQfilter();
    this.rfqFilterParams = new rfqFilterParams()
    this.rfqFilterParams.VendorId = this.Vendor.vendorId;
    this.rfqFilterParams.StatusId = 0;
    this.rfqvendorobj.RFQNo = "";
    this.rfqMastersModel = new RFQMasters();
    this.rfqRevisions = new RFQRevisionData();
    this.bindList();

  }

  
  showHideFilterBlock() {
    this.showFilterBlock = !this.showFilterBlock;
  }

  //redirect to vendorquotation page
  redirectToVendorQuotation(details: any) {
    this.router.navigate([]).then(result => {
      window.open('/VSCM/VendorQuotation/' + this.constants.encryptData(details.rfqRevisionId) + '', '_blank');
    });
  }

  //redirect to VendorQuoteView page
  redirectTovendorquoteview(details: any) {
    this.router.navigate([]).then(result => {
      window.open('/VSCM/VendorQuoteView/' + this.constants.encryptData(details.rfqRevisionId) + '', '_blank');
    });
  }
  // Submit(){
  // 	this.RfqService.GetRfqByVendorId(this.rfqFilterParams).subscribe(data => {
  // 		this.rfqMastersModel = data;
  // 		console.log("cve",data);
  // 	  });
  // }

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }
  bindList() {
    this.rfqFilterParams.FromDate = this.datePipe.transform(this.fromDate, "yyyy-MM-dd");
    this.rfqFilterParams.ToDate = this.datePipe.transform(this.toDate, "yyyy-MM-dd");
    this.spinner.show();
    this.RfqService.GetRfqByVendorId(this.rfqFilterParams).subscribe(data => {
      this.spinner.hide();
      this.rfqMastersModel = data;
      //this.loading = false;
    })
  }
  ngAfterContentChecked() {


    this.cdRef.detectChanges();

  }
}
