

export class VendorRegistration{
  email:string;
  PhoneExn:string;
    UniqueId:number;
    Onetimevendor:boolean;
    EvaluationRequired:boolean;
    VendorNoInSAP:string;
    RequestedOn:Date;
    VendorName:string;
    VendorAddress:string;
    PostalCode:string;
    City:string;
    LocalBranchOffice:string;
    PhoneAndExtn:string;
    Fax:string;
    ContactPerson:string;
    Phone:string;
    GSTNo:string;
    NatureofBusiness:number;
    PANNo:string;
    CINNo:string;
    TanNo:string;
    PaymentTerms:string;
    street:string;
    BusinessArea:string;
    Mobile:string;
    EmailId:string;
    contPhone:string;
    BankDetails:string;
    BankerName:string;
    LocationOrBranch:string;
    AccNo:string;
    IFSCCode:string;
    PhysicalPath:string;
    DocumentTypeId:number;
    fileattach1:string;
    stateid:string;
    isDisabled:false;
    filedata:FormData;
    DocDetailsLists: Array<DocDetailsList> = [];
    ppath:File;
    deleteId:string;
    AccountHolderName:string;
  }
 
  export class DocDetailsList {
   
    ItemDetailsId: number;
    DocumentName: string;
    UploadedBy: string;
    UplaodedDate: Date
    DocumentTypeId: number;
    Deleteflag: boolean
    PhysicalPath:string;
    uniqueid:number;
  }
  export class StateList
  {
    StateName:string;
    StateId:number;
  }
  export class NaturOfBusiness
  {
    NatureofbusinessName:string;
    NaturofBusinessId:number;
  }
  export class DocumentList
  {
    DocumentName:string;
    DocId:number;
  }
