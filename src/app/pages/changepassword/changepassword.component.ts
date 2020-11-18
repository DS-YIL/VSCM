import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Changepassword } from '../../Models/RFQModel';
import { MessageService } from 'primeng/api';
import { RfqService } from '../../services/rfq.service ';

@Component({
  selector: 'app-changepassword',
  templateUrl: './ChangePassword.component.html'
})
export class ChangepasswordComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private messageService: MessageService,public RfqService: RfqService) { }
  public changepwdForm: FormGroup;
  public pwdSubmitted: boolean = false;
  public dynamicData = new Changepassword();
  public vendor:Changepassword;
  ngOnInit() {
    this.changepwdForm = this.formBuilder.group({
      CurrentPassword: ['', [Validators.required]],
      NewPassword: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]],
    });
  }
  Submit(){
    this.vendor=(JSON.parse(localStorage.getItem('vendordetail')));
    const passwordDetails = this.changepwdForm.value;
this.dynamicData.NewPassword=passwordDetails.NewPassword;
this.dynamicData.ConfirmPassword=passwordDetails.ConfirmPassword;
this.dynamicData.CurrentPassword=passwordDetails.CurrentPassword;
this.dynamicData.vendorId=this.vendor.vendorId;
if(this.dynamicData.NewPassword!=this.dynamicData.ConfirmPassword)
{
  this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'New password and confirm password should be same' });
}
else{
  this.RfqService.changepassword(this.dynamicData).subscribe(data=>{
if(data=="OK"){
  this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Password changed successfully' });
}
else if(data=="error"){
  this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Current passwors is not correct' });
}
  })
}
  }
}
