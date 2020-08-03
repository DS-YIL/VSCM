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
  DocDetailsLists: Array<DocDetailsList> = [];
  particularInvoice: Array<ParticularInvoice> = [];
  DocumentName: string;
  DocumentTypeId: number;
  filedata: FormData;
  Remarks: string;
  PONumber: any;
}

export class ParticularInvoice {
  POMasterTableId: any;
  InvoiceNo: string;
}

export class DocDetailsList {
  DocumentId: string;
  ItemDetailsId: number;
  DocumentName: string;
  UploadedBy: string;
  UplaodedDate: Date
  DocumentTypeId: number;
  Deleteflag: boolean
  PhysicalPath: string;
  uniqueid: number;
}
