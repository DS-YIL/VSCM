import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RfqService } from 'src/app/services/rfq.service ';
import { Router } from '@angular/router';
import { Employee, DynamicSearchResult, Vendor } from '../../Models/RFQModel';
import { constants } from '../../Models/RFQConstants';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from "ngx-spinner";
import { MENU_ITEMS } from '../pages-menu';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private cdRef: ChangeDetectorRef, public rfqService: RfqService, private router: Router, public constants: constants, private messageService: MessageService, private spinner: NgxSpinnerService) { }

  public LoginForm: FormGroup;
  public employee: Employee;
  public vendor: Vendor;
  public LoginSubmitted: boolean = false;
  public dynamicData = new DynamicSearchResult();
  public dataSaved: boolean = false;

  ngOnInit() {

    //this.employee = new Employees();
    localStorage.removeItem('Employee');
    this.LoginForm = this.formBuilder.group({
      DomainId: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });
  }

  Login() {

    this.LoginSubmitted = true;
    if (this.LoginForm.invalid) {
      return;
    }
    else {
      this.spinner.show();
      const loginDetails = this.LoginForm.value;
      this.dynamicData.grant_type = "password";
      this.dynamicData.username = loginDetails.DomainId
      this.dynamicData.password = loginDetails.Password;
      this.rfqService.gettoken(this.dynamicData)
        .subscribe(data => {
          console.log("token", data);
          this.spinner.hide();
          if (data != "" || data != null) {
            this.vendor = data;
            if (localStorage.getItem("AccessToken")) {
              // this.vendor=(JSON.stringify(localStorage.getItem("AccessToken")));
              this.vendor = (JSON.parse(localStorage.getItem('AccessToken')));
              this.vendor.access_token = this.vendor.access_token
              this.getvendordetails(this.vendor.access_token);

            }
            //localStorage.setItem("Employee", JSON.stringify(this.employee));
            //this.LoginForm.reset();



          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Invalid email Id & Password' });
            return;
          }

        },
          (error: any) => {
            this.spinner.hide();
            this.LoginForm.reset();
            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error["error_description"] });
            return;
          }
        )

      //   this.MprService.ValidateLoginCredentials1(this.dynamicData)
      //     .pipe(first())
      //     .subscribe(data1 => {
      //       this.spinner.hide();
      //       if (data1.vendorId == 0 || data1.vendorId == null) {

      //         this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Invalid email Id & Password' });
      //         return;
      //       }
      //       else {
      //         this.vendor = data1;
      //         //localStorage.setItem("Employee", JSON.stringify(this.employee));
      //         this.LoginForm.reset();
      //         this.router.navigateByUrl('/VSCM/Dashboard');
      //       }
      //     });
    }

  }
  getvendordetails(accesstoken: any) {
    this.rfqService.getVendordetail(accesstoken)
      .subscribe(data => {
        if (data)
          this.router.navigateByUrl('/VSCM/vendorquotationlist');
        if (data.isRegister)
          MENU_ITEMS[0].hidden = false;//registration
        else
          MENU_ITEMS[0].hidden = true;
        //console.log("vdetails",data);
        //localStorage.setItem("vendordetail",JSON.stringify(data));
      },
        (error: any) => {
          console.log("err", error);
          return;
        }
      )
  }
  //enable  registration when intiate from buyer
  //CheckReg(vendorid) {
  //  this.rfqService.getvendordetails(vendorid).subscribe(data => {
  //    if (data.VendorId)
  //      MENU_ITEMS[0].hidden = false;//registration
  //    else
  //      MENU_ITEMS[0].hidden = true;
  //  });
  //}
}
