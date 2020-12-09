import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';

import { LoginComponent } from './Login/Login.component';
import { VendorQuotationListComponent } from './RFQ/VendorQuotationList.component';
import { VendorRegisterComponent } from './VendorRegister/VendorRegister.component';
import { VendorQuotationAddComponent } from './RFQ/VendorQuotationAdd.component';
import { ChangepasswordComponent } from './ChangePassword/ChangePassword.component';
import { ForgetpasswordComponent } from './ForgetPassword/ForgetPassword.component';
import { ResetPasswordComponent } from './ResetPassword/ResetPassword.component';
import { CreateAsnComponent } from './ASN/CreateASN.component';
import { AsnListComponent } from './ASN/ASNList.component';
//import { AsnViewComponent } from './ASN/ViewASN.component';
import { InvoiceListComponent } from './Invoice/InvoiceList.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'Login',
      component: LoginComponent,
    },
    {
      path: '',
      redirectTo: 'Login',
      pathMatch: 'full',
    },
    { path: "VendorQuotationList/:VendorId", component: VendorQuotationListComponent },
    { path: 'Vendorregister', component: VendorRegisterComponent },
    { path: 'vendorquotationlist', component: VendorQuotationListComponent },
    { path: 'VendorQuotation/:RFQRevisionId', component: VendorQuotationAddComponent },
    { path: 'changepassword', component: ChangepasswordComponent },
    { path: 'forgetpassword', component: ForgetpasswordComponent },
    { path: 'resetpassword/:EmailId/:Token', component: ResetPasswordComponent },
    { path: 'CreateASN', component: CreateAsnComponent },
    { path: 'ASNList', component: AsnListComponent },
    //{ path: 'ASNDetails/:ASNId', component: AsnViewComponent },
    { path: 'ASNEdit/:ASNId', component: CreateAsnComponent },
    { path: 'Invoice', component: InvoiceListComponent }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
