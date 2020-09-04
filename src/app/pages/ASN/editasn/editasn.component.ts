import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RfqService } from 'src/app/services/rfq.service ';
import { AsnModels, PONumbers } from '../create-asn/asn';
import { MessageService } from 'primeng/api';
import { Vendor } from '../../../Models/mpr';

@Component({
  selector: 'app-editasn',
  templateUrl: './editasn.component.html',
  styleUrls: ['./editasn.component.scss']
})
export class EditasnComponent implements OnInit {
  public asnItem = new AsnModels();
  public asnid: number = 0;
  public Vendor: Vendor;
  public lstPONumbers: Array<PONumbers>;
  public ponumber: string;

  constructor(public RfqService: RfqService, private route: ActivatedRoute, private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.asnid = params["ASNNo"];
      this.asnDetails();
    });

    this.Vendor = JSON.parse(localStorage.getItem("vendordetail"));
    
    this.checkPOExist();
  }
  asnDetails() {
    // alert(this.asnid);
    this.RfqService.getAsnByAsnno(this.asnid).subscribe(data => {
      // alert("asn details");
      this.asnItem = data;
      return this.asnItem;
    })
  }

  EditAsn() {
    if (this.asnItem.PO_ReferenceNo == null || this.asnItem.PO_ReferenceNo == "") {
      alert("Please enter  PO Reference No. ");
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
        alert("Invalid PO/Reference Number");
        return;
      }


      else if (this.asnItem.ASNNo == null || this.asnItem.ASNNo == "") {
        alert("Please enter  ASN No. ");
        return;
      }
      else if (this.asnItem.DeliveryDate == null) {
        alert("Please enter  Delivery Date. ");
        return;
      }
      else if (this.asnItem.Qty == null || this.asnItem.Qty == 0) {
        alert("Please enter  Qty. ");
        return;
      }
      else if (this.asnItem.MeansOfTransport == null || this.asnItem.MeansOfTransport == "") {
        alert("Please enter  Means of Transport. ");
        return;
      }
      else if (this.asnItem.ShipFrom == null || this.asnItem.ShipFrom == "") {
        alert("Please enter  Ship From in Shipment Lines. ");
        return;
      }
      else if (this.asnItem.ShipTo == null || this.asnItem.ShipTo == "") {
        alert("Please enter  Ship To in Shipment Lines. ");
        return;
      }
      else if (this.asnItem.CustomerLocation == null || this.asnItem.CustomerLocation == "") {
        alert("Please enter  Customer Location in Shipment Lines ");
        return;
      }
      else if (this.asnItem.CountryOfOrigin == null || this.asnItem.CountryOfOrigin == "") {
        alert("Please enter Country Of Origin in Shipment Lines. ");
        return;
      }
      else if (this.asnItem.OriginalPOItem == null || this.asnItem.OriginalPOItem == "") {
        alert("Please enter Original PO Item in Item Details. ");
        return;
      }
      else if (this.asnItem.CustomerBatchNo == null || this.asnItem.CustomerBatchNo == "") {
        alert("Please enter Customer Batch No in Item Details. ");
        return;
      }
      else {
        // alert("entered")
        console.log(this.asnItem);

        this.RfqService.editAsn(this.asnItem).subscribe(data => {
          //alert(data);
          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Asn Updated Sucessfully' });
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
      })
    }
  }
}
