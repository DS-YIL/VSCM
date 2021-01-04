import { Injectable } from '@angular/core';
import { searchParams } from '../Models/RFQModel';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class constants {
  public DESkey: string;
  public AESkey: string;
  //local
 //public url = 'http://localhost:49658/Api/';
 //public tokenurl = 'http://localhost:49658/';

  //test server1
  //public url = "http://10.29.15.68:92/Api/";
  //public tokenurl = 'http://10.29.15.68:92/';
  //public Documnentpath = "http://10.29.15.68:92/VSCMDocs/";
  //public yscmurl = 'http://10.29.15.68:90/Api/mpr/'

    // NEW  test server
  public url = "http://vscm-1089815394.ap-south-1.elb.amazonaws.com:81/api/Api/";
  public tokenurl = 'http://vscm-1089815394.ap-south-1.elb.amazonaws.com:81/api/';
  public yscmurl = 'http://10.29.15.68:90/Api/mpr/'
  public Documnentpath = "http://vscm-1089815394.ap-south-1.elb.amazonaws.com:81/VSCMDocs/";

  //AWS live
  //public url = 'http://vscm-1089815394.ap-south-1.elb.amazonaws.com/api/Api/';
  //public tokenurl = 'http://vscm-1089815394.ap-south-1.elb.amazonaws.com/api/';
  //public yscmurl = 'http://10.29.15.183:90/Api/mpr/'    
  //public Documnentpath = "http://vscm-1089815394.ap-south-1.elb.amazonaws.com/VSCMDocs/";

  public dateFormat = "MM/dd/yyyy";
  public RequisitionId: string = "";

  public DepartmentId: searchParams = { tableName: 'MPRDepartments', fieldId: 'DepartmentId', fieldName: 'Department', condition: "", fieldAliasName: "DepartmentName" };
  public ProjectManager: searchParams = { tableName: 'Employee', fieldId: 'EmployeeNo', fieldName: 'Name', condition: "Grade='m2' and ", fieldAliasName: "ProjectManagerName" };
  public ClientName: searchParams = { tableName: 'CustomerMasterYGS', fieldId: 'CustomerId', fieldName: 'CustomerName1', condition: "CustomerMasterTypeId=1 and ", fieldAliasName: "ClientName" };
  public BuyerGroupId: searchParams = { tableName: 'MPRBuyerGroups', fieldId: 'BuyerGroupId', fieldName: 'BuyerGroup', condition: "", fieldAliasName: "BuyerGroupName" };
  public ItemId: searchParams = { tableName: 'MaterialMasterYGS', fieldId: 'Material', fieldName: 'Materialdescription', condition: "", fieldAliasName: "" };
  public UnitId: searchParams = { tableName: 'UnitMaster', fieldId: 'UnitId', fieldName: 'UnitName', condition: "", fieldAliasName: "" };
  public venderid: searchParams = { tableName: 'VendorMaster', fieldId: 'Vendorid', fieldName: 'VendorName', condition: "", fieldAliasName: "" };
  public PurchaseTypeId: searchParams = { tableName: 'MPRPurchaseTypes', fieldId: 'PurchaseTypeId', fieldName: 'PurchaseType', condition: "", fieldAliasName: "PurchaseType" };
  public PreferredVendorTypeId: searchParams = { tableName: 'MPRPreferredVendorTypes', fieldId: 'PreferredVendorTypeId', fieldName: 'PreferredVendorType', condition: "", fieldAliasName: "PreferredVendorType" };
  public DispatchLocation: searchParams = { tableName: 'MPRDispatchLocations', fieldId: 'DispatchLocationId', fieldName: 'DispatchLocation', condition: "", fieldAliasName: "DispatchLocation" };
  public ScopeId: searchParams = { tableName: 'MPRScopes', fieldId: 'ScopeId', fieldName: 'Scope', condition: "", fieldAliasName: "Scope" };

  public ProcurementSourceId: searchParams = { tableName: 'MPRProcurementSources', fieldId: 'ProcurementSourceId', fieldName: 'ProcurementSource', condition: "", fieldAliasName: "ProcurementSource" };
  public CustomsDutyId: searchParams = { tableName: 'MPRCustomsDuty', fieldId: 'CustomsDutyId', fieldName: 'CustomsDuty', condition: "", fieldAliasName: "CustomDuty" };
  public ProjectDutyApplicableId: searchParams = { tableName: 'MPRProjectDutyApplicable', fieldId: 'ProjectDutyApplicableId', fieldName: 'ProjectDutyApplicable', condition: "", fieldAliasName: "ProjectDutyApplicable" };
  public DocumentationDescriptionId: searchParams = { tableName: 'MPRDocumentationDescriptions', fieldId: 'DocumentationDescriptionId', fieldName: 'DocumentationDescription', condition: "", fieldAliasName: "" };
  public CheckedBy: searchParams = { tableName: 'Employee', fieldId: 'EmployeeNo', fieldName: 'Name', condition: "Grade<'m2' and ", fieldAliasName: "CheckedName" };
  public ApprovedBy: searchParams = { tableName: 'Employee', fieldId: 'EmployeeNo', fieldName: 'Name', condition: "Grade>'m2' and ", fieldAliasName: "ApproverName" };
  public Incharge: searchParams = { tableName: 'Employee', fieldId: 'EmployeeNo', fieldName: 'Name', condition: "Grade='m1' and ", fieldAliasName: "" }
  public toEmail: searchParams = { tableName: 'Employee', fieldId: 'EmployeeNo', fieldName: 'Name', condition: "Grade='m1' and ", fieldAliasName: "" }
  public ccEmail: searchParams = { tableName: 'Employee', fieldId: 'EmployeeNo', fieldName: 'Name', condition: "Grade='m1' and ", fieldAliasName: "" }

  encryptData(data) {
    this.AESkey = "123456789";
    var value = "";
    try {
      if (data) {
        if (CryptoJS.AES.encrypt(JSON.stringify(data), this.AESkey).toString()) {
          value = CryptoJS.AES.encrypt(JSON.stringify(data), this.AESkey).toString();
          value = value.toString().replace(/\+/g, 'xMl3Jk').replace(/\//g, 'Por21Ld').replace(/\=/g, 'Ml32');
          return value;
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
  decrypt(data) {
    this.DESkey = "123456789";
    data = data.toString().replace(/\xMl3Jk/g, '+').replace(/\Por21Ld/g, '/').replace(/\Ml32/g, '=');
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.DESkey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}

