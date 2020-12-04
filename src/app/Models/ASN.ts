export class AsnModels {
  PONo: string="";
  InvoiceNo: string;
  InvoiceDate: Date;
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
  Insurance: string;
  RemoteASNItemDetails: Array<any> = [];
  VendorId: string;
  CreatedBy: string;
  Incoterm: string;
  HSNCode: string;
  InboundDeliveryNo: string;
  DocumentDate: string
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
}


export class stagPoNumbers {
  stageid: number;
  purchdoc: string;
  InvoiceDetails: InvoiceDetails;

}

export class InvoiceDetails {
  InvoiceId: number;
  InvoiceNo: string;
  PONO: string;
  VendorId: string;
  CreatedDate: Date;
  CreatedBy: string;
  ModifiedDate: Date;
  ModifiedBy
  Remarks: string;
  InvoiceDocuments: Array<InvoiceDocuments> = [];
}


export class InvoiceDocuments {
  DocumentId: string;
  InvoiceId: number;
  DocumentName: string;
  Path: string;
  DocumentTypeId: number;
  UploadedBy: string;
  UploadedDate: Date;
  IsDeleted: boolean
}
