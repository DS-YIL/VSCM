import { Component } from '@angular/core';
import { Employee, Vendor } from 'src/app/Models/mpr';
import { RfqService } from 'src/app/services/rfq.service ';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive start *ngIf="currentUser">
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent {

  currentUser:Employee;
  constructor(private _usermanage:RfqService){
   
    this._usermanage.currentUser.subscribe(x=> this.currentUser =x);
    console.log(this.currentUser,"checkuser");
  }
  
}
