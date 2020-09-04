import { Component, Input, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { RfqService } from '../../services/rfq.service ';
import { constants } from '../../Models/MPRConstants'
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RFQMasters, RFQRevisionData, RFQfilter, rfqFilterParams } from '../../Models/rfq';
import { Vendor } from 'src/app/Models/mpr';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { DatePipe } from '@angular/common/'
@Component({
  selector: 'app-VendorQuotationList',
  templateUrl: './VendorQuotationList.component.html'
})
export class VendorQuotationListComponent implements OnInit {
  constructor(private datePipe: DatePipe, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private cdRef: ChangeDetectorRef, public RfqService: RfqService, public constants: constants, private route: ActivatedRoute) { }
  public rfqvendorobj: RFQfilter;
  public rfqFilterParams: rfqFilterParams;
  public VendorQuotationList: FormGroup;
  public rfqMastersModel: RFQMasters;
  public rfqRevisions: RFQRevisionData;
  public RFQfilterForm: FormGroup;
  public Vendor: Vendor;
  public showFilterBlock: boolean = false;

  public toDate: Date = new Date();
  public fromDate: Date = new Date(new Date().setDate(new Date().getDate() - 30));
  ngOnInit() {
    if (localStorage.getItem("AccessToken") == null) {
      this.router.navigateByUrl("Login");
    }

    //this.typeOfList = this.route.routeConfig.path;
    this.rfqFilterParams = new rfqFilterParams();
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
    this.rfqvendorobj.RFQNo = "";
    this.rfqMastersModel = new RFQMasters();
    this.rfqRevisions = new RFQRevisionData();
    this.RFQfilterForm = this.formBuilder.group({
      typeOfFilter: ['', [Validators.required]],
      FromDate: ['', [Validators.required]],
      ToDate: ['', [Validators.required]],
      RFQNo: ['', [Validators.required]],
      venderid: ['', [Validators.required]]
    });
    this.bindList();

    //this.RfqService.getallrfqlist().subscribe(data => {
    //	this.rfqMastersModel = data;
    //});

    //this.VendorQuotationList = this.formBuilder.group({

    //});
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

    this.RfqService.GetRfqByVendorId(this.rfqFilterParams).subscribe(data => {
      this.rfqMastersModel = data;
      //this.loading = false;
    })
  }
  ngAfterContentChecked() {


    this.cdRef.detectChanges();

  }
}
