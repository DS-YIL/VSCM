import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';

import { ConfirmationDialogComponent } from '../common/confirmationdialog/confirmation-dialog.component';
import { VendorQuotationListComponent } from './RFQ/VendorQuotationList.component';
import { VendorQuotationViewComponent } from './RFQ/VendorQuotationView.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { DataViewModule } from 'primeng/dataview';
import { ToastModule } from 'primeng/toast';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatDialogModule, MatButtonModule, MatExpansionModule } from '@angular/material';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectfilterPipe } from '../common/selectfilter.pipe';
import { LoginComponent } from './Login/Login.component';
import { VendorRegisterComponent } from './RFQ/vendor-register/vendor-register.component';
import { VendorQuotationAddComponent } from './RFQ/VendorQuotationAdd.component';
import { RFQEditComponent } from './rfqedit/rfqedit.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CreateAsnComponent } from './ASN/create-asn/create-asn.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { AsnListComponent } from './ASN/asn-list/asn-list.component';
import { AsnViewComponent } from './ASN/asn-view/asn-view.component';
import { EditasnComponent } from './ASN/editasn/editasn.component';
import { POListComponent } from './PO/polist/polist.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    ListboxModule,
    DialogModule,
    FileUploadModule,
    TooltipModule,
    RadioButtonModule,
    InputSwitchModule,
    CheckboxModule,
    CalendarModule,
    DataViewModule,
    ToastModule,
    NgxSpinnerModule,
    Ng2SearchPipeModule,
    MatDialogModule,
    MatButtonModule,
    ConfirmDialogModule,
    MatExpansionModule,
    NbMenuModule,
    TabMenuModule,
    TabViewModule

  ],
  declarations: [
    PagesComponent,
    LoginComponent,
    VendorQuotationListComponent,
    VendorQuotationViewComponent,
    ConfirmationDialogComponent,
    SelectfilterPipe,
    VendorRegisterComponent,
    VendorQuotationAddComponent,
    RFQEditComponent,
    ChangepasswordComponent,
    ForgetpasswordComponent,
    ResetPasswordComponent,
    CreateAsnComponent,
    AsnListComponent,
    AsnViewComponent,
    EditasnComponent,
    POListComponent
  ],
  providers: [MessageService, ConfirmationService],
  entryComponents: [ConfirmationDialogComponent]
})
export class PagesModule {
}
