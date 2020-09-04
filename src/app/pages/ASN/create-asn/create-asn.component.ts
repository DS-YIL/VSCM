import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AsnModels, PONumbers } from './asn';
import { RfqService } from 'src/app/services/rfq.service ';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { Reference } from '@angular/compiler/src/render3/r3_ast';
import { Vendor } from '../../../Models/mpr';

@Component({
  selector: 'app-create-asn',
  templateUrl: './create-asn.component.html',
  styleUrls: ['./create-asn.component.scss']
})
export class CreateAsnComponent implements OnInit {
  items: MenuItem[];
  public asnItem = new AsnModels();
  public AsnfilterForm: FormGroup;
  public lstPONumbers: Array<PONumbers>;
  public ponumber: string;
  public Vendor: Vendor;

  constructor(private router: Router, public RfqService: RfqService, private messageService: MessageService, private formBuilder: FormBuilder) { }
 

  ngOnInit() {
    this.Vendor = JSON.parse(localStorage.getItem("vendordetail"));
   // alert(this.Vendor.vendorId);
   // alert(this.Vendor.VUniqueId);

    debugger;
    this.checkPOExist();

   // alert("PO list: " + this.lstPONumbers);

   

      //this.items = [
      //  { label: 'ShipmentHeader', url: 'http://localhost:4200/VSCM/shipmentHeader' },
      //  { label: 'ShipmentLines', url: 'http://localhost:4200/VSCM/shipmentLines' },
      //  { label: 'Status', url: 'http://localhost:4200/VSCM/status' },
      //  { label: 'Item Details', url: 'http://localhost:4200/VSCM/itemDetails' }
      //];

      ////this.AsnfilterForm = this.formBuilder.group({
      ////  ASNNo: ['', [Validators.required]]

      ////});


    }
  


  submitAsn() {
    //debugger;
  
   // alert("insude submit" + this.lstPONumbers);
    
    if (this.asnItem.PO_ReferenceNo == null || this.asnItem.PO_ReferenceNo == "") {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter PO Reference No.' });
      //alert("Please enter  PO Reference No. ");
      return;
    }
    else if (this.asnItem.PO_ReferenceNo != null && this.asnItem.PO_ReferenceNo != "") {
      this.ponumber = "";
    //  alert(this.ponumber);
      for (var i = 0; i < this.lstPONumbers.length; i++) {
        //  alert("for loop of i: "+ i);
        if (this.lstPONumbers[i].purchdoc == this.asnItem.PO_ReferenceNo) {
        //  alert("this i" + i)
        //  alert(this.lstPONumbers[i].purchdoc);
          this.ponumber = this.lstPONumbers[i].purchdoc;
        }
      }
      if (this.ponumber == null || this.ponumber == undefined || this.ponumber == "") {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Invalid PO/Reference Number' });
        //alert("Invalid PO/Reference Number");
        return;
      }
      else if (this.asnItem.ASNNo == null || this.asnItem.ASNNo == "") {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter  ASN No.' });
        //alert("Please enter  ASN No. ");
        return;
      }
      else if (this.asnItem.DeliveryDate == null) {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter Delivery Date.' });
        //alert("Please enter  Delivery Date. ");
        return;
      }
      else if (this.asnItem.Qty == null || this.asnItem.Qty == 0) {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter Quantity' });
        //alert("Please enter  Qty. ");
        return;
      }
      else if (this.asnItem.MeansOfTransport == null || this.asnItem.MeansOfTransport == "") {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter Means of Transport. ' });
        //alert("Please enter  Means of Transport. ");
        return;
      }
      else if (this.asnItem.ShipFrom == null || this.asnItem.ShipFrom == "") {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter Ship From in Shipment Lines.' });
        //alert("Please enter  Ship From in Shipment Lines. ");
        return;
      }
      else if (this.asnItem.ShipTo == null || this.asnItem.ShipTo == "") {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter Ship To in Shipment Lines.' });
       // alert("Please enter  Ship To in Shipment Lines. ");
        return;
      }
      else if (this.asnItem.CustomerLocation == null || this.asnItem.CustomerLocation == "") {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Customer Location in Shipment Lines' });
       // alert("Please enter  Customer Location in Shipment Lines ");
        return;
      }
      else if (this.asnItem.CountryOfOrigin == null || this.asnItem.CountryOfOrigin == "") {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Country Of Origin in Shipment Lines.' });
        //alert("Please enter Country Of Origin in Shipment Lines. ");
        return;
      }
      else if (this.asnItem.OriginalPOItem == null || this.asnItem.OriginalPOItem == "") {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter Original PO Item in Item Details.' });
        //alert("Please enter Original PO Item in Item Details. ");
        return;
      }
      else if (this.asnItem.CustomerBatchNo == null || this.asnItem.CustomerBatchNo == "") {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter Customer Batch No in Item Details.' });
        //alert("Please enter Customer Batch No in Item Details. ");
        return;
      }
      else {
        this.RfqService.InsertAsn(this.asnItem).subscribe(data => {
          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Asn Generated Sucessfully' });
          this.router.navigate(['VSCM/ASN']);
        })
      }
    }
  }


  checkPOExist() {
    if (this.asnItem.PO_ReferenceNo != null || this.asnItem.PO_ReferenceNo != "") {
      this.RfqService.getPONumbersbyVendor(this.Vendor.vendorId).subscribe(data => {
        this.lstPONumbers = data;
    //    alert(this.lstPONumbers);
        return this.lstPONumbers;
               //for (var i = 0; i < this.lstPONumbers.length; i++) {
        //  //  alert("for loop of i: "+ i);
        //  if (this.lstPONumbers[i].purchdoc == this.asnItem.PO_ReferenceNo) {
        //    alert("this i" + i)
        //    alert(this.lstPONumbers[i].purchdoc);
        //    this.ponumber = this.lstPONumbers[i].purchdoc;

        //  }

        //  //if (!this.lstPONumbers[i].purchdoc.includes(this.asnItem.PO_ReferenceNo)) {
        //  //  alert("Invalid PO/Reference");
        //  //  return;
        //  //}
        //}
       
      })
    }
  }
}
