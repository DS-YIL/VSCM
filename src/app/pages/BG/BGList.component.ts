import { Component, OnInit } from '@angular/core';
import { RfqService } from 'src/app/services/rfq.service '; 
import { NgxSpinnerService } from 'ngx-spinner'
import { constants } from 'src/app/Models/RFQConstants';
import { BGfilters, Vendor } from 'src/app/Models/RFQModel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bg-list',
  templateUrl: './BGList.component.html'
})
export class BGListComponent implements OnInit {

  constructor(public RfqService: RfqService, private router: Router, private route: ActivatedRoute,  private spinner: NgxSpinnerService, public constants: constants) { }

  public BGList: Array<any> = [];
  public BGfilters: BGfilters;
  public VendorDetails: Vendor;

  ngOnInit() {
    this.BGfilters = new BGfilters();
    if (localStorage.getItem("vendordetail"))
      this.VendorDetails = JSON.parse(localStorage.getItem("vendordetail"));
    else {
      this.router.navigateByUrl("Login");
      return true;
    }
    this.bgList();
  }

  bgList() {
    this.BGfilters.Vendorid = this.VendorDetails.vendorId
    this.spinner.show();
    this.RfqService.getBGList(this.BGfilters).subscribe(data => {
      this.spinner.hide();
      this.BGList = data;
    })
  }


  //redirect to BG view page
  redirectToBGView(details: any) {
    this.router.navigate([]).then(result => {
      window.open('/VSCM/BGView/' + this.constants.encryptData(details.BGId) + '', '_blank');
    });
  }

}
