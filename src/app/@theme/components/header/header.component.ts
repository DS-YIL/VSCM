import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import{Subscription} from 'rxjs-compat';
import { UserData } from '../../../@core/data/users';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Employee } from 'src/app/Models/mpr';
import { MprService } from 'src/app/services/mpr.service';
import { RfqService } from 'src/app/services/rfq.service ';
import { NgStyle } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit ,OnDestroy{
private subscription:Subscription;
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  currentUser:Employee;
  name:any;
 public picture1:string;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Logout' },{ title: 'Change Password' }  ];//{ title: 'Profile' }

public employee:Employee;
  constructor(private sidebarService: NbSidebarService, private router: Router,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private breakpointService: NbMediaBreakpointsService,
              private _usermanage:RfqService) {
                 //this.currentUser = this._usermanage.currentUserValue;
                // this.currentUser = JSON.parse(localStorage.getItem('Employee'));
                if(this._usermanage.currentUser){
                this._usermanage.currentUser.subscribe(x=>this.currentUser=x);
                if(this.currentUser){
                  this.currentUser.Name=this.currentUser.UserName;
                }
              }
                 //this.name = this.currentUser[0].Name 
  }

  ngOnInit() {
// console.log(name);
// console.log(this.currentUser);
    // this.employee=(JSON.parse(localStorage.getItem("vendordetail")));
    // this.employee.UserName=this.employee.UserName;
    this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);
      console.log(this.user);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }
    Login(){
      this.router.navigateByUrl('/VSCM/login');
    }

  
  // navigateHome() {
  //   this.menuService.navigateHome();
  //   return false;
  // }


}
