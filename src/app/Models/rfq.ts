export class rfqQuoteModel {
  MPRItemDetailsid: number;
  ItemId: number;
  ItemName: string;
  ItemDescription: string;
  TargetSpend: string;
  QuotationQty: string;
  vendorQuoteQty: string;
  UnitPrice: string;
  leastPrice: string;
  suggestedVendorDetails: Array<any> = [];
  manualvendorDetails: Array<any> = [];

}
export class RFQRevisionData {
  CreatedBy: number;
  CreatedDate: Date;
  RfqValidDate: Date;
  PackingForwading: string;
  ExciseDuty: string;
  salesTax: string;
  freight: string;
  Insurance: string;
  CustomsDuty: string;
  ShipmentModeId: number;
  PaymentTermDays: number;
  PaymentTermRemarks: string;
  BankGuarantee: string;
  DeliveryMinWeeks: number;
  DeliveryMaxWeeks: number;
}
export class VendorDetails {
  VendorCode: string;
  VendorName: string;
  OldvendorCode: string;
  RFQNo: string;
  MPRRevisionId: string;
  RfqMasterId: string;
  VendorId: number;
  rfqRevisionId: number;
  RFQValidDate: Date;
  DeliveryMinWeeks: number;
  DeliveryMaxWeeks: number;
  RFQItemsId: number;
  MPRItemsDetailsId: number;
  VendorQuoteQty: string;
  UnitPrice: string;
  DiscountPercentage: string;
  Discount: string;
  PaymentTermDays: number;
  PaymentTermRemarks: string;
  BankGuarantee: string;
  Freight: string;
  Insurance: string;
}
export class RfqItemInfoModel {
  street: string;
  State: number;
  NaturOfBusiness: number;
  FreightPercentage: string;
  FreightAmount: string;
  RFQSplitItemId: number;
  RFQItemsId: number;
  RFQItemsId1: number;
  Quantity: number;
  UOM: number;
  UnitPrice: string;
  DiscountPercentage: string;
  Discount: string;
  CurrencyId: number;
  CurrencyValue: string;
  Remarks: string;
  DeliveryDate: Date;
  DeleteFlag: boolean;
  SyncDate: Date;
  SyncStatus: boolean;
  ItemName: string;
  ItemDescription: string;
  DiscountOption: boolean;
  MultipleItems: boolean;
  ItemNameForMultiple: string;
  ItemDescriptionForMultiple: string;
  RFQVendorbomItemId: number;
}
export class forgetpassword {
  EmailId: string;
  errormsg: string;
}
//export class VendorRegistration {
//  NaturOfBusiness: number;
//  Email: string;
//  AltEmail: string;
//  PhoneExn: string;
//  vendorId: number;
//  VendorId: number;
//  VendorCode: string;
//  UniqueId: number;
//  Onetimevendor: boolean;
//  EvaluationRequired: boolean;
//  PerformanceVerificationRequired: boolean;
//  MSMERequired: boolean;
//  BusinessArea: string;
//  VendorNoInSAP: string;
//  RequestedOn: Date;
//  VendorName: string = "";
//  VendorAddress: string;
//  PostalCode: string;
//  City: string;
//  LocalBranchOffice: string;
//  PhoneAndExtn: string;
//  Fax: string;
//  ContactPerson: string;
//  Phone: string;
//  ContactPersonForSales: string;
//  PhoneNumberForSales: string;
//  EmailIdForSales: string;
//  AltEmailidForSales: string;
//  ContactPersonForOperations: string;
//  PhoneNumberForOperations: string;
//  EmailIdForOperations: string;
//  AltEmailidForOperations: string;
//  ContactPersonForLogistics: string;
//  PhoneNumberForLogistics: string;
//  EmailIdForLogistics: string;
//  AltEmailidForLogistics: string;
//  ContactPersonForAccounts: string;
//  PhoneNumberForAccounts: string;
//  EmailIdForAccounts: string;
//  AltEmailidForAccounts: string;
//  GSTNo: string;
//  NatureofBusiness: number;
//  SpecifyNatureOfBusiness: string;
//  PANNo: string;
//  CINNo: string;
//  TanNo: string;
//  PaymentTerms: string;
//  Street: string;
//  Mobile: string;
//  contPhone: string;
//  BankDetails: string;
//  BankerName: string;
//  LocationOrBranch: string;
//  AccNo: string;
//  IFSCCode: string;
//  PhysicalPath: string;
//  DocumentationTypeId: number;
//  fileattach1: string;
//  stateid: string;
//  isDisabled: false;
//  filedata: FormData;
//  DocDetailsLists: Array<DocDetailsList> = [];
//  ppath: File;
//  deleteId: string;
//  AccountHolderName: string;
//  StateId: number;
//  State: string;
//  LocalBranch: string;
//}
export class DocDetailsList {
  Id: number;
  ItemDetailsId: number;
  DocumentName: string;
  UploadedBy: string;
  UplaodedDate: Date
  DocumentationTypeId: number;
  Deleteflag: boolean
  PhysicalPath: string;
  uniqueid: number;
}
export class StateList {
  StateName: string;
  StateId: number;
}
export class NaturOfBusiness {
  NatureofbusinessName: string;
  NaturofBusinessId: number;
}
export class DocumentList {
  DocumentName: string;
  DocId: number;
}
export class RFQMasters {
  rfqMastersModel: Array<any>;
  Result: Array<any> = [];
  RfqMasterId: number;
  MPRRevisionId: number;
  RFQNo: string;
  RFQUniqueNo: number;
  VendorId: number;
  CreatedBy: string;
  CreatedDate: Date;
  DeleteFlag: boolean;
  SyncDate: Date;
  SyncStatus: string;
  RFQRevisions: Array<RFQRevisionData> = [];
  rfqRevisionId: number;
}
export class RFQfilter {
  RFQNo: string;
  CreatedDate: Date;
  VendorId: string;
  RfqValidDate: Date;
}
export class RFQCurrencyMaster {
  CurrencyId: number;
  CurrencyName: string;
  CurrencyCode: string;
  UpdatedBy: string;
  UpdatedDate: Date;
  DeletedBy: string;
  DeletedDate: Date;
  DeleteFlag: boolean
  Isdeleted: boolean;
}
export class RFQUnitMasters {
  UnitID: number;
  UnitName: string;
  Isdeleted: boolean;
}
export class RfqItemModel {
  RFQVendorbomItemId: number;
  RFQSplitItemId: number;
  PhysicalPath: string;
  MfgModelNo: string;
  MfgPartNo: string;
  ManufacturerName: string;
  RFQItemId: number;
  RFQRevisionId: number;
  MPRItemDetailsId: number;
  ItemName: string;
  multipleitem: string = "no";
  ItemDescription: string;
  QuotationQty: string;
  VendorModelNo: string;
  HSNCode: string;
  CustomDuty: string;
  FreightPercentage: string;
  FreightAmount: string;
  PFPercentage: string;
  PFAmount: string;
  IGSTPercentage: string;
  CGSTPercentage: string;
  SGSTPercentage: string;
  taxInclusiveOfDiscount: string;
  RequestRemarks: string;
  DeleteFlag: boolean;
  SyncDate: Date;
  SyncStatus: boolean;
  iteminfo: Array<RfqItemInfoModel> = [];
  filedata: FormData;
  DocDetailsLists: Array<RFQDocuments> = [];
  Id: number;
  UpdatedBy: string;
}
export class MPRDocument {
  MprDocId: number;
  RevisionId: number;
  ItemDetailsId: number;
  DocumentName: string;
  UploadedBy: string;
  UplaodedDate: Date
  Path: string;
  DocumentTypeid: number;
  Deleteflag: boolean

}


export class rfqFilterParams {
  typeOfFilter: string = "other";
  FromDate: string;
  ToDate: string;
  RFQNo: string;
  VendorId: string;
  DocumentNo: string;
  StatusId: number=0;
}
export class QuoteDetails {
  RfqNo: string;
  rfqMasterId: number;
  ActiveRevision: boolean;
  StatusId: number;
  RFQValidDate: Date;
  RemoteRFQItems_N: Array<any>;
  RemoteRFQDocuments: Array<any>;
  RemoteRFQItemsInfo_N: any[];
  RemoteRFQMaster: RFQMaster;
  CreatedDate: Date;
  RfqValidDate: Date;
  rfqmaster: RFQMaster[];
  rfqitem: Array<any>;
  RFQTerms: Array<RFQTerms>;
  itemDetails: Array<RfqItemModel>
  documents: Array<RFQDocuments>;
  Rfqiteminfo: Array<any>;
  RemoteRFQCommunications: Array<any>;
}
export class RFQMaster {
  RfqNo: string;
  Vendor: VendorDetails;
  RemoteRFQCommunications: Array<any>;
}

export class RFQDocuments {
  RfqDocId: number;
  rfqRevisionId: number;
  rfqItemsId: number;
  DocumentName: string;
  DocumentType: number;
  Path: string;
  UploadedBy: string;
  UploadedDate: Date;
  Status: string;
  StatusDate: Date;
  StatusBy: string;
  filedata: FormData;
}
export class RFQTerms {
  VRfqTermsid: string;
  VendorResponse: number;
  Remarks: string;
}
export class VendorCommunication {
  RFQCCId: number;
  RFQRevisionId: number;
  RfqMasterId: number;
  RFQItemsId: number;
  Remarks: string = "";
  RemarksFrom: string;
  SendEmail: boolean = false;
  SetReminder: boolean = false;
  ReminderDate: Date;
  RemarksDate: Date;
  DeleteFlag: boolean;

  // MPRReminderTrackings: Array<MPRReminderTracking> = [];
}
export class Changepassword {
  CurrentPassword: String;
  NewPassword: string;
  ConfirmPassword: string;
  vendorId: number;
  emailId: string;
  Token: string;
}
