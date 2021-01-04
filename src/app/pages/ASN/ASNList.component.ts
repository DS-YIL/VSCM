import { Component, OnInit } from '@angular/core';
import { RfqService } from 'src/app/services/rfq.service ';
import { NgxSpinnerService } from 'ngx-spinner'
import { Vendor, ASNfilters } from '../../Models/RFQModel';

@Component({
  selector: 'app-asn-list',
  templateUrl: './ASNList.component.html'
})
export class AsnListComponent implements OnInit {

  constructor(public RfqService: RfqService, private spinner: NgxSpinnerService, ) { }

  public AsnList: Array<any> = [];
  public Vendor: Vendor;
  public ASNfilters: ASNfilters;

  ngOnInit() {
    this.Vendor = JSON.parse(localStorage.getItem("vendordetail"));
    this.ASNfilters = new ASNfilters();
    this.asnList();
  }

  asnList() {
    this.ASNfilters.Vendorid = this.Vendor.vendorId;
    this.spinner.show();
    this.RfqService.getasnlist(this.ASNfilters).subscribe(data => {
      this.spinner.hide();
      this.AsnList = data;
    })

  }

}
