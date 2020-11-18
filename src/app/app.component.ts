import { Component,OnInit } from '@angular/core';
import {AnalyticsService} from './@core/utils/analytics.service';
import {NbMenuService} from '@nebular/theme';
import { Router } from '@angular/router';
import { RfqService } from './services/rfq.service ';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'VSCMUI';

  constructor(private idle: Idle,private analytics:AnalyticsService,private menuService:NbMenuService,private router:Router,private _usermanage:RfqService){
    idle.setIdle(18000);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(18000);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    idle.onTimeoutWarning.subscribe((countdown: number) => {
      //alert('Timeout Warning - ' + countdown);
    });

    idle.onTimeout.subscribe(() => {
      localStorage.clear();
      this._usermanage.logout();
      this.router.navigate(['/VSCM/Login']);
    });
    idle.watch();
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
