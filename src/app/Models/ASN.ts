export class AsnModels {
  PONo: string = "";
  PONos: string = "";
  PODate: Date;
  InvoiceNo: string;
  InvoiceDate: Date;
  InvoiceAmntByVendor: string;
  DefaultInvoiceAmnt: string;
  ProjectName: string;
  ProjectCode: string;
  ASNNo: string;
  ShipFrom: string;
  ShipTo: string;
  ShippingDate: Date;
  DeliveryDate: Date;
  FreightInvNo: number;
  TransporterName: string;
  BillofLodingNumber: string;
  IncotermLoc: string;
  IncoTerm: string = "";
  IncotermDescription: string;
  ModeOfTransport: string = "";
  DeliveryNote: string;
  TotalGrossWeight_Kgs: number;
  TotalNetWeight_Kgs: number;
  TotalVolume: string;
  Insurance: string="";
  RemoteASNItemDetails: Array<any> = [];
  RemoteASNCommunications: Array<any> = [];
  VendorId: string;
  CreatedBy: string;
  VendorName: string;
  Incoterm: string;
  HSNCode: string;
  InboundDeliveryNo: string;
  DocumentDate: string;
  InvoiceType: string="";
  Crcy: string;
  ExchangeRate: string;
  AckStatus: string;
}

export class PONumbers {
  stageid: number;
  purchdoc: string;
  VendorId: string;
  VuniqueId: string;
  invoiceNo: number;
  DocumentName: string;
  DocumentTypeId: number;
  filedata: FormData;
  Remarks: string;
  PONumber: any;
  VendorAdress: string;
  PONo: string;
  ShipTo: string;
  PODate: Date;
  Crcy: string;
  ExchangeRate: string;
}


export class stagPoNumbers {
  stageid: number;
  purchdoc: string;
  InvoiceDetails: RemoteInvoiceDetails;

}

export class RemoteASNCommunication {
  ASNCCId: number;
  ASNId: number;
  PONo: string;
  RemarksFrom: string;
  RemarksDate: Date;
  Remarks: string;
  DeleteFlag: boolean;
}

export class RemoteInvoiceDetails {
  InvoiceId: number;
  ASNId: number;
  InvoiceNo: string;
  PONo: string;
  VendorId: string;
  CreatedDate: Date;
  CreatedBy: string;
  ModifiedDate: Date;
  ModifiedBy
  Remarks: string;
  LRRemarks: string;
  RemoteInvoiceDocuments: Array<RemoteInvoiceDocuments> = [];
}


export class RemoteInvoiceDocuments {
  DocumentId: string;
  InvoiceId: number;
  DocumentName: string;
  Path: string;
  DocumentTypeId: number;
  UploadedBy: string;
  UploadedDate: Date;
  IsDeleted: boolean
}
