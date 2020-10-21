import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { Vendor } from 'src/app/Models/mpr';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
    <p-toast [style]="{marginTop: '60px'}"  [showTransitionOptions]="'1000ms'" [hideTransitionOptions]="'1000ms'"></p-toast>
  `,
})
export class PagesComponent {
  public VendorDetails: Vendor;
  menu = MENU_ITEMS;
  ngOnInit() {
    if (localStorage.getItem("vendordetail")) {
      this.VendorDetails = JSON.parse(localStorage.getItem("vendordetail"));
      if (this.VendorDetails.isRegister)
        MENU_ITEMS[0].hidden = false;//registration
      else
        MENU_ITEMS[0].hidden = true;
    }
  }
}
