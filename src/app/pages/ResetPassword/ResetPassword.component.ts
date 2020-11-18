import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Changepassword } from '../../Models/RFQModel';
import { MessageService } from 'primeng/api';
import { RfqService } from 'src/app/services/rfq.service ';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './ResetPassword.component.html'
})
export class ResetPasswordComponent implements OnInit {

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private messageService: MessageService, public rfqService: RfqService) { }
  public resetpwdForm: FormGroup;
  public pwdSubmitted: boolean = false;
  public dynamicData = new Changepassword();
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["EmailId"]) {
        this.dynamicData.emailId = params["EmailId"];
        this.dynamicData.Token = params["Token"];
      }
    });
    this.resetpwdForm = this.formBuilder.group({
      NewPassword: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]],
    });
    this.checklink();
  }
  checklink() {
    this.rfqService.checklinkexpired(this.dynamicData).subscribe(data => {

      if (data == true) {
        document.getElementById('linkexpired').style.display = "block";
        document.getElementById('resetpwd').style.display = "none";
      }
      else {
        document.getElementById('resetpwd').style.display = "block";
        document.getElementById('linkexpired').style.display = "none";
      }
    })
  }
  Submit() {
    this.pwdSubmitted = true;
    if (this.resetpwdForm.invalid) {
      return;
    }
    else {
      const passwordDetails = this.resetpwdForm.value;
      this.dynamicData.ConfirmPassword = passwordDetails.ConfirmPassword;
      this.dynamicData.NewPassword = passwordDetails.NewPassword;

      if (this.dynamicData.NewPassword != this.dynamicData.ConfirmPassword) {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'New password and confirm password should be same' });
      }
      else {
        this.rfqService.Resetpassword(this.dynamicData).subscribe(data => {
          if (data == 'Updated Successfully') {
            this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Reset the password successfully' });
          }

        })
      }
    }

  }
}

