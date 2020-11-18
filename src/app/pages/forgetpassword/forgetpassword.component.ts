import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forgetpassword } from '../../Models/RFQModel';
import { RfqService } from 'src/app/services/rfq.service ';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from "ngx-spinner"

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './ForgetPassword.component.html'
})
export class ForgetpasswordComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, public rfqService: RfqService, private messageService: MessageService, private spinner: NgxSpinnerService) {

  }
  public forgetpwdForm: FormGroup;
  public forgetpwdSubmitted: boolean = false;
  public dynamicData = new forgetpassword();
  public errormsg: boolean = false;
  ngOnInit() {
    this.forgetpwdForm = this.formBuilder.group({
      EmailId: ['', [Validators.required]]

    });

  }
  Submit() {
    this.forgetpwdSubmitted = true;
    if (this.forgetpwdForm.invalid) {
      return;
    }
    else {
      const email = this.forgetpwdForm.value;
      this.dynamicData.EmailId = email.EmailId;
      this.spinner.show();
      this.rfqService.checkemail(this.dynamicData).subscribe(data => {
        this.spinner.hide();
        if (data == false) {
          this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Email Id is not correct,please enter valid email Id' });
        }
        else {
          this.rfqService.sendEmailLink(this.dynamicData).subscribe(data => {
            if (data == true) {
              this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Mail sent successfully,please check your email to reset the password' });
            }
          })
        }
      })
    }

  }


}
