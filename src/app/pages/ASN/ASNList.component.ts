import { Component, OnInit } from '@angular/core';
import { RfqService } from 'src/app/services/rfq.service ';
import { NgxSpinnerService } from 'ngx-spinner'


@Component({
  selector: 'app-asn-list',
  templateUrl: './ASNList.component.html'
})
export class AsnListComponent implements OnInit {

  constructor(public RfqService: RfqService, private spinner: NgxSpinnerService,) { }

  public AsnList: Array<any> = [];

  ngOnInit() {
    this.asnList();
  }

  asnList() {
    this.spinner.show();
    this.RfqService.getasnlist().subscribe(data => {
      this.spinner.hide();
      this.AsnList = data;
    })

  }

}
