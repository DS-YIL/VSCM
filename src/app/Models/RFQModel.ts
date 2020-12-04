

export class DynamicSearchResult {
  connectionString: string;
  columnNames: string;
  columnValues: string;
  tableName: string;
  updateCondition: string;
  searchCondition: string;
  query: string;
  sortBy: string;
  grant_type: string;
  username: string;
  password: string;

}

export class searchParams {
  tableName: string;
  fieldName: string;
  fieldId: string;
  condition: string;
  fieldAliasName: string;
}
export class searchList {
  listName: string;
  code: number;
  name: string;
}
export class MPRDetail {
  RequisitionId: number;
  DocumentNo: string;
  DocumentDescription: string;
}
export class MPRItemInfoes {
  Itemdetailsid: number;
  Itemid: number;
  RevisionId: number;
  ItemDescription: string;
  Quantity: string;
  UnitId: string;
  SaleOrderNo: string;
  SOLineItemNo: string;
  ReferenceDocNo: string;
  TargetSpend: string;
  DeleteFlag: boolean
}



export class MPRDocumentations {
  DocumentationId: number;
  RevisionId: number;
  DocumentationDescriptionId: number;
  DocumentationDescription: string
  NoOfSetsApproval: number;
  NoOfSetsFinal: number;
  MPRDocumentationDescription: any;
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


export class MPRIncharge {
  InchargeId: number;
  RequisitionId: number;
  RevisionId: number;
  Incharge: string;
  CanClearTechnically: boolean = false;
  CanClearCommercially: boolean = false;
  CanReceiveMailNotification: boolean = false;
  UpdatedBy: string;
  UpdatedDate: Date;
  DeleteFlag: boolean

}
export class MPRCommunication {
  MPRCCId: number;
  RevisionId: number;
  Remarks: string = "";
  RemarksFrom: string;
  SendEmail: boolean = false;
  SetReminder: boolean = false;
  ReminderDate: Date;
  RemarksDate: Date;
  DeleteFlag: boolean;
  MPRReminderTrackings: Array<MPRReminderTracking> = [];
}

export class MPRReminderTracking {
  ReminderId: number;
  MPRCCId: number;
  MailTo: string;
  MailAddressType: string
  MailSentOn: Date;
  AcknowledgedOn: Date;
  AcknowledgementRemarks: string;
  DeleteFlag: string;
}

export class MPRItemDetail {

}
export class MPRStatusTrack {

}
export class MPRTargetedSpendSupportingDoc {

}
export class MPRVendorDetail {
  VendorDetailsId: number;
  RevisionId: number;
  Vendorid: number;
  VendorName: string;
  UpdatedBy: string;
  UpdatedDate: Date;
  RemovedBy: string;
  RemovedDate: Date;
  RemoveFlag: boolean
  VendorMaster: any;
}


export class mprRevision {

  MPRCommunications: Array<MPRCommunication> = [];
  MPRDocumentations: Array<MPRDocumentations> = [];
  MPRDocuments: Array<MPRDocument> = [];
  MPRIncharges: Array<MPRIncharge> = [];
  MPRItemInfoes: Array<MPRItemInfoes> = [];
  MPRStatusTracks: MPRStatusTrack;
  MPRTargetedSpendSupportingDocs: MPRTargetedSpendSupportingDoc;
  MPRVendorDetails: Array<MPRVendorDetail> = [];
  MPRStatusTrackDetails: Array<any> = []
  MPRDetail: MPRDetail;
  RequisitionId: number;
  DepartmentId: number;
  ProjectManager: string;
  JobCode: string;
  JobName: string;
  GEPSApprovalId: string;
  SaleOrderNo: string;
  LineItemNo: string;
  ClientName: string;
  PlantLocation: string;
  BuyerGroupId: number
  TargetedSpendAmount: string;
  TargetedSpendRemarks: string;
  BoolPreferredVendor: boolean
  JustificationForSinglePreferredVendor: string;
  DeliveryRequiredBy: Date;
  IssuePurposeId: number;
  DispatchLocation: string;
  ScopeId: number;
  TrainingRequired: boolean = false;
  TrainingManWeeks: number;
  TrainingRemarks: string;
  BoolDocumentationApplicable: boolean = false;
  GuaranteePeriod: string;
  NoOfSetsOfQAP: number;
  InspectionRequired: boolean = false;
  InspectionRequiredNew: number;
  InspectionComments: string;
  NoOfSetsOfTestCertificates: number;
  ProcurementSourceId: number;
  CustomsDutyId: number;
  ProjectDutyApplicableId: number;
  ExciseDutyReimbursableForBOs: boolean;
  SalesTaxReimbursableForBOs: boolean;
  VATReimbursableForBOs: boolean;
  ServiceTaxReimbursableForBOs: boolean;
  ExciseDutyReimbursableForBOsNew: number;
  SalesTaxReimbursableForBOsNew: number;
  VATReimbursableForBOsNew: number;
  ServiceTaxReimbursableForBOsNew: number;
  Remarks: string;
  PreparedBy: string;
  PreparedOn: Date;
  CheckedBy: string;
  CheckedName: string;
  CheckedOn: Date;
  CheckStatus: string;
  CheckerRemarks: string;
  ApprovedBy: string;
  ApproverName: string;
  ApprovedOn: Date;
  ApprovalStatus: string;
  ApproverRemarks: string;
  SecondApprover: string;
  SecondApprovedOn: Date;
  SecondApproversStatus: string;
  SecondApproverRemarks: string;
  ThirdApprover: string;
  ThirdApproverStatus: string;
  ThirdApproverStatusChangedOn: Date;
  ThirdApproverRemarks: string;
  PurchaseDetailsReadBy: string;
  PurchaseDetailsReadOn: Date;
  PurchasePersonnel: string;
  PODate: Date;
  ExpectedDespatchDate: Date
  PurchasePersonnelsComments: string;
  TechDocsReceivedDate: Date;
  CommercialOfferReceivedDate: Date;
  OfferDetailsMailedBy: string;
  OfferDetailsMailedOn: Date;
  OfferDetailsViewedByCheckerOn: Date;
  OfferDetailsViewedByApproverOn: Date;
  MaterialReceiptDate: Date;
  Remarks1: string;
  EstimatedCost: string;
  PreviousPOPrice: string
  PurchaseTypeId: number;
  PreferredVendorTypeId: number;
  StatusId: number;
  PurchaseCost: string;
  RevisionNo: number;
  RevisionId: number;
  BoolValidRevision: boolean;
}



export class MPRStatusUpdate {
  RevisionId: number;
  RequisitionId: number;
  PreparedBy: string;
  status: string = "Select";
  Remarks: string;
  typeOfuser: string;
}

export class mprFilterParams {
  ListType: string;
  DocumentNo: string;
  DocumentDescription: string;
  FromDate: Date;
  ToDate: Date;
  Status: string;
  PreparedBy: string = "";
  CheckedBy: string = "";
  ApprovedBy: string = "";
}
export class MPRScope {
  ScopeId: number;
  Scope: string;
  BoolInUse: string;
}
export class MPRApprovers {
  EmployeeNo: string;
}

export class Employee {
  EmployeeNo: string;
  Name: string;
  UserName: string;
}
export class Vendor {
  vendorId: string;
  VUniqueId: string;
  access_token: string;
  UserName: string;
  isRegister: boolean;
  Street: string;
}
export class MPRBuyerGroup {
  BuyerGroupId: number;
  BuyerGroup: string;
  BoolInUse: boolean;
}
export class MPRProcurementSources {
  ProcurementSourceId: number;
  ProcurementSource: string;
  BoolInUse: boolean;
}
export class Department {
  DepartmentId: number;
  Department: string;
  SecondApproverEmpNo: string;
  SecondApproverName: string;
  ThirdApproverEmpNo: string;
  ThirdApproverName: string;
  BoolInUse: boolean;
}


export class ProjectManager {
  EmployeeNo: string;
  Name: string;
}







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
  RFQStatusTrackDetails: Array<any>;
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

export class RFQStatus {
  RfqStatusId: number;
  RfqRevisionId: number;
  RfqMasterId: number;
  StatusId: number;
  Remarks: string;
  updatedby: string;
  updatedDate: Date;
}
