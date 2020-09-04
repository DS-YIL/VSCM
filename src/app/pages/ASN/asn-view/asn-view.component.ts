import { Component, OnInit } from '@angular/core';
import { RfqService } from 'src/app/services/rfq.service ';
import { AsnModels } from '../create-asn/asn';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asn-view',
  templateUrl: './asn-view.component.html',
  styleUrls: ['./asn-view.component.scss']
})
export class AsnViewComponent implements OnInit {

 // public asnItem: any;
  public asnItem = new AsnModels();
  public asnid: number = 0;

  constructor(public RfqService: RfqService, private route: ActivatedRoute) { }

  ngOnInit() {
   // alert("entered asn-View");
    this.route.params.subscribe(params => {
      this.asnid = params["ASNNo"];
      this.asnDetails();
    });
   
  }

  asnDetails() {
   // alert(this.asnid);
    this.RfqService.getAsnByAsnno(this.asnid).subscribe(data => {
    // alert("asn details");
      this.asnItem = data;
      return this.asnItem;
    })
  }

}
