import { Component, OnInit } from '@angular/core';
import { RfqService } from 'src/app/services/rfq.service ';
import { NgxSpinnerService } from 'ngx-spinner'
import { Vendor } from '../../Models/RFQModel';

@Component({
  selector: 'app-asn-list',
  templateUrl: './ASNList.component.html'
})
export class AsnListComponent implements OnInit {

  constructor(public RfqService: RfqService, private spinner: NgxSpinnerService,) { }

  public AsnList: Array<any> = [];
  public Vendor: Vendor;

  ngOnInit() {
     this.Vendor = JSON.parse(localStorage.getItem("vendordetail"));
    this.asnList();
  }

  asnList() {
    this.spinner.show();
    this.RfqService.getasnlist(this.Vendor.vendorId).subscribe(data => {
      this.spinner.hide();
      this.AsnList = data;
    })

  }

}
