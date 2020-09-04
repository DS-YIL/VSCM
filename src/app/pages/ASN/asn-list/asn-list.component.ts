import { Component, OnInit } from '@angular/core';
import { RfqService } from 'src/app/services/rfq.service ';

@Component({
  selector: 'app-asn-list',
  templateUrl: './asn-list.component.html',
  styleUrls: ['./asn-list.component.scss']
})
export class AsnListComponent implements OnInit {

  constructor(public RfqService: RfqService) { }


  public AsnList: Array<any> = [];

  ngOnInit() {
    this.asnList();
  }

  asnList() {
    this.RfqService.getasnlist().subscribe(data => {
     // alert(data);
      this.AsnList = data;
    })

  }

}
