import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
//import { LoginComponent } from './Login/Login.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './Dashboard/Dashboard.component';

import { GenerateRFQComponent } from './RFQ/GenerateRFQ.component';
import { RFQComparisionComponent } from './RFQ/RFQComparision.component'

import { AccessGroupComponent } from './Authorization/AccessGroup.component';
import { RoleAccessComponent } from './Authorization/RoleAccess.component';
import { AuthorizationItemComponent } from './Authorization/AuthorizationItem.component';
import { ViewAccessComponent } from './Authorization/ViewAccess.component';
import { ConfigComponent } from './Authorization/Config.component';
import { LoginComponent } from './Login/Login.component';
import { AuthGuard } from '../common/auth.guard';
import { VendorQuotationViewComponent } from './RFQ/VendorQuotationView.component';
import { RFQListComponent } from './RFQ/RFQList.component';
import { VendorQuotationListComponent } from './RFQ/VendorQuotationList.component';
import{VendorRegisterComponent} from './RFQ/vendor-register/vendor-register.component';
import { VendorQuotationAddComponent } from './RFQ/VendorQuotationAdd.component';
import { auth2StrategyOptions } from '@nebular/auth';
import { RFQEditComponent } from './rfqedit/rfqedit.component';
import {ChangepasswordComponent} from './changepassword/changepassword.component';
import {ForgetpasswordComponent} from './forgetpassword/forgetpassword.component';
import { ResetPasswordComponent } from '../../reset-password/reset-password.component';
import { CreateAsnComponent } from './ASN/create-asn/create-asn.component';
import { AsnListComponent } from './ASN/asn-list/asn-list.component';
import { AsnViewComponent } from './ASN/asn-view/asn-view.component';
import { EditasnComponent } from './ASN/editasn/editasn.component';
import { POListComponent } from './PO/polist/polist.component';

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
    { path: "Dashboard", component: DashboardComponent },
    { path: "RFQList", component: RFQListComponent },
    { path: "VendorQuotationList/:VendorId", component: VendorQuotationListComponent },
    //{ path: 'GenerateRFQ/:MPRRevisionId', component: GenerateRFQComponent, canActivate: [AuthGuard] },
    { path: 'RFQComparision/:MPRRevisionId', component: RFQComparisionComponent, canActivate: [AuthGuard] },
    { path: 'VendorQuoteView/:RFQRevisionId', component: VendorQuotationViewComponent },
    { path: 'Groupaccessibility', component: AccessGroupComponent, canActivate: [AuthGuard] },
    { path: 'Roleaccessibility', component: RoleAccessComponent, canActivate: [AuthGuard] },
    { path: 'Authorizationitem', component: AuthorizationItemComponent, canActivate: [AuthGuard] },
    { path: 'Viewaccess', component: ViewAccessComponent, canActivate: [AuthGuard] },
    { path: 'Configuration', component: ConfigComponent, canActivate: [AuthGuard] },
    { path:'Vendorregister',component:VendorRegisterComponent },
    { path:'vendorquotationlist',component:VendorQuotationListComponent},
    {path:'VendorQuotation/:RFQRevisionId',component: VendorQuotationAddComponent},
    {path:'RFQEdit/:RFQRevisionId',component:RFQEditComponent},
    {path:'changepassword',component:ChangepasswordComponent},
    {path:'forgetpassword',component:ForgetpasswordComponent},
    { path: 'resetpassword/:EmailId/:Token', component: ResetPasswordComponent },
    { path: 'CreateASN', component: CreateAsnComponent },
    { path: 'ASN', component: AsnListComponent },
    { path: 'AsnDetails/:ASNNo', component: AsnViewComponent },
    { path: 'AsnEdit/:ASNNo', component: EditasnComponent },
    { path:  'Invoice', component: POListComponent }
    // {
    //      path: '',
    //      redirectTo: 'Login',
    //      pathMatch: 'full',
    // },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
