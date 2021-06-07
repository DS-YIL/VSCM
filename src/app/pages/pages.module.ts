import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';

import { ConfirmationDialogComponent } from '../common/confirmationdialog/confirmation-dialog.component';
import { VendorQuotationListComponent } from './RFQ/VendorQuotationList.component';
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
import { MultiSelectModule } from 'primeng/multiselect';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatDialogModule, MatButtonModule, MatExpansionModule } from '@angular/material';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectfilterPipe } from '../common/selectfilter.pipe';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { LoginComponent } from './Login/Login.component';
import { VendorRegisterComponent } from './VendorRegister/VendorRegister.component';
import { VendorQuotationAddComponent } from './RFQ/VendorQuotationAdd.component';
import { ChangepasswordComponent } from './ChangePassword/ChangePassword.component';
import { ForgetpasswordComponent } from './ForgetPassword/ForgetPassword.component';
import { ResetPasswordComponent } from './ResetPassword/ResetPassword.component';
import { CreateAsnComponent } from './ASN/CreateASN.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { AsnListComponent } from './ASN/ASNList.component';
//import { AsnViewComponent } from './ASN/ViewASN.component';
import { InvoiceComponent } from './Invoice/Invoice.component';
import { BGViewComponent } from './BG/BGView.component';
import { BGListComponent } from './BG/BGList.component';

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
    MultiSelectModule,
    NgxSpinnerModule,
    Ng2SearchPipeModule,
    MatDialogModule,
    MatButtonModule,
    ConfirmDialogModule,
    MatExpansionModule,
    NbMenuModule,
    TabMenuModule,
    TabViewModule,
    AutoCompleteModule

  ],
  declarations: [
    PagesComponent,
    LoginComponent,
    VendorQuotationListComponent,
    ConfirmationDialogComponent,
    SelectfilterPipe,
    VendorRegisterComponent,
    VendorQuotationAddComponent,
    ChangepasswordComponent,
    ForgetpasswordComponent,
    ResetPasswordComponent,
    CreateAsnComponent,
    AsnListComponent,
    //AsnViewComponent,
    InvoiceComponent,
    BGViewComponent,
    BGListComponent
  ],
  providers: [MessageService, ConfirmationService],
  entryComponents: [ConfirmationDialogComponent]
})
export class PagesModule {
}
