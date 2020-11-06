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
    this.checkPOExist();
    }
  

  submitAsn() {
    if (this.asnItem.PO_ReferenceNo == null || this.asnItem.PO_ReferenceNo == "") {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter PO Reference No.' });
      return;
    }
    else if (this.asnItem.PO_ReferenceNo != null && this.asnItem.PO_ReferenceNo != "") {
      this.ponumber = "";
      for (var i = 0; i < this.lstPONumbers.length; i++) {
        if (this.lstPONumbers[i].purchdoc == this.asnItem.PO_ReferenceNo) {
          this.ponumber = this.lstPONumbers[i].purchdoc;
        }
      }
    }
      else if (this.asnItem.ASNNo == null || this.asnItem.ASNNo == "") {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter  ASN No.' });
        return;
      }
      else if (this.asnItem.DeliveryDate == null) {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter Delivery Date.' });
        return;
      }
      else if (this.asnItem.Qty == null || this.asnItem.Qty == 0) {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter Quantity' });
        return;
      }
      else if (this.asnItem.MeansOfTransport == null || this.asnItem.MeansOfTransport == "") {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter Means of Transport. ' });
        return;
      }
      else if (this.asnItem.ShipFrom == null || this.asnItem.ShipFrom == "") {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter Ship From in Shipment Lines.' });
        return;
      }
      else if (this.asnItem.ShipTo == null || this.asnItem.ShipTo == "") {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter Ship To in Shipment Lines.' });
        return;
      }
      else if (this.asnItem.CustomerLocation == null || this.asnItem.CustomerLocation == "") {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Customer Location in Shipment Lines' });
        return;
      }
      else if (this.asnItem.CountryOfOrigin == null || this.asnItem.CountryOfOrigin == "") {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Country Of Origin in Shipment Lines.' });
        return;
      }
      else if (this.asnItem.OriginalPOItem == null || this.asnItem.OriginalPOItem == "") {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter Original PO Item in Item Details.' });
        return;
      }
      else if (this.asnItem.CustomerBatchNo == null || this.asnItem.CustomerBatchNo == "") {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Enter Customer Batch No in Item Details.' });
        return;
      }
      else {
        this.RfqService.InsertAsn(this.asnItem).subscribe(data => {
          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Asn Generated Sucessfully' });
          this.router.navigate(['VSCM/ASN']);
        })
      }
  }


  checkPOExist() {
    if (this.asnItem.PO_ReferenceNo != null || this.asnItem.PO_ReferenceNo != "") {
      this.RfqService.getPONumbersbyVendor(this.Vendor.vendorId).subscribe(data => {
        this.lstPONumbers = data;
        return this.lstPONumbers;
       
      })
    }
  }
}
