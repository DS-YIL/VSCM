import { Component,OnInit } from '@angular/core';
import {AnalyticsService} from './@core/utils/analytics.service';
import {NbMenuService} from '@nebular/theme';
import { Router } from '@angular/router';
import { RfqService } from './services/rfq.service ';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'VSCMUI';

  constructor(private analytics:AnalyticsService,private menuService:NbMenuService,private router:Router,private _usermanage:RfqService){

  }
  ngOnInit() {
  this.analytics.trackPageViews();
  this.menuService.onItemClick()
  .subscribe((event)=>{
    this.onContecxtItemSelection(event.item.title)
  });
  }

  onContecxtItemSelection(title){
if(title =="Logout"){

  this._usermanage.logout();
   this.router.navigate(['/VSCM/Login']);
}
else if(title=="Profile"){
  this.router.navigate(['/VSCM/Vendorregister']);
}
else if(title=="Change Password"){
  this.router.navigate(['/VSCM/changepassword']);
}

  }
}
