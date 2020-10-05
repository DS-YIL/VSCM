

export class VendorRegistration {
  NaturOfBusiness: number;
  Email: string;
  AltEmail: string;
  PhoneExn: string;
  vendorId: number;
  VendorId: number;
  VendorCode: string;
  UniqueId: number;
  Onetimevendor: boolean;
  EvaluationRequired: boolean;
  PerformanceVerificationRequired: boolean;
  MSMERequired: boolean;
  BusinessArea: string;
  VendorNoInSAP: string;
  RequestedOn: Date;
  VendorName: string = "";
  VendorAddress: string;
  PostalCode: string;
  City: string;
  LocalBranchOffice: string;
  PhoneAndExtn: string;
  Fax: string;
  ContactPerson: string;
  Phone: string;
  ContactPersonForSales: string;
  PhoneNumberForSales: string;
  EmailIdForSales: string;
  AltEmailidForSales: string;
  ContactPersonForOperations: string;
  PhoneNumberForOperations: string;
  EmailIdForOperations: string;
  AltEmailidForOperations: string;
  ContactPersonForLogistics: string;
  PhoneNumberForLogistics: string;
  EmailIdForLogistics: string;
  AltEmailidForLogistics: string;
  ContactPersonForAccounts: string;
  PhoneNumberForAccounts: string;
  EmailIdForAccounts: string;
  AltEmailidForAccounts: string;
  GSTNo: string;
  NatureofBusiness: number;
  SpecifyNatureOfBusiness: string;
  PANNo: string;
  CINNo: string;
  TanNo: string;
  PaymentTerms: string;
  Street: string;
  Mobile: string;
  contPhone: string;
  BankDetails: string;
  BankerName: string;
  LocationOrBranch: string;
  AccNo: string;
  IFSCCode: string;
  PhysicalPath: string;
  DocumentationTypeId: number;
  fileattach1: string;
  stateid: string;
  isDisabled: false;
  filedata: FormData;
  DocDetailsLists: Array<VendorDocDetailsList> = [];
  ppath: File;
  deleteId: string;
  AccountHolderName: string;
  StateId: number;
  State: string;
  LocalBranch: string;
  CurrencyId: number;
  Currency: string;
}

export class VendorDocDetailsList {
  VendorId: number;
  DocumentName: string;
  UploadedBy: string;
  UploadedOn: Date
  DocumentationTypeId: number;
  Deleteflag: boolean
  PhysicalPath: string;
  Id: number;
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
