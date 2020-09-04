export class AsnModels {
  PO_ReferenceNo: string
  InvoiceNo: string
  ASNNo: string
  InboundDeliveryNo: string
  ShippingDate: Date
  DeliveryDate: Date
  DocumentDate: Date
  Qty: number
  FreightInvNo: number
  GroupingId: number
  CarrierParty: string
  Carrier_SCAC_Id: number
  IncotermLoc: string
  Incoterm: number
  MeansOfTransport: string
  TotalGrossWeight_Kgs: number
  TotalNetWeight_Kgs: number
  TotalVolume: number
  ShipmentAssignment: string
  CreatedDate: Date
  SupplierCumulativeQuantity: number; //Item Details Model
  CustomerCumulativeQuantity: number;
  PurchasingDocumentNo: string;
  OriginalPONumber: string;
  OriginalPOItem: string;
  TotalGrossWt: number;
  TotalNetWt: number;
  CustomerBatchNo: string;
  SupplierBatchNo: string;
  ASNStatus: number; //Status Models
  ValidationStatus: string;
  AcceptanceStatus: string;
  TPOPIndicator: string;
  InboundDeliveryStatus: string;
  OriginalSystem: string;
  Split: string;
  ASNShipmentLine: number;  //Shipment Lines
  ShipFrom: string;
  ShipTo: string;
  CustomerLocation: string;
  ContainerNumber: number;
  CountryOfOrigin: string;
  TruckNo: string;
  Comment: string;
  PackingShip: string;
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
