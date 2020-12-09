import { Component, OnInit } from '@angular/core';
import { RfqService } from 'src/app/services/rfq.service ';
import { AsnModels } from '../../Models/ASN';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner'


@Component({
  selector: 'app-asn-view',
  templateUrl: './ViewASN.component.html'
})
export class AsnViewComponent implements OnInit {

 // public asnItem: any;
  public asnItem = new AsnModels();
  public asnid: number = 0;

  constructor(public RfqService: RfqService, private route: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.asnid = params["ASNId"];
      this.getASNDetails();
    });
   
  }

  //get ASN Details
  getASNDetails() {
    this.spinner.show();
    this.RfqService.getAsnByAsnno(this.asnid).subscribe(data => {
      this.spinner.hide();
      this.asnItem = data;
    })
  }

}
