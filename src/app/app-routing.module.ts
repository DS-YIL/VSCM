import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
//import { DashboardComponent } from './Dashboard/Dashboard.component';
//import { LoginComponent } from './Login/Login.component';

//import { LoginComponent } from './pages/Login/Login.component';

//import { config } from 'rxjs';

const routes: Routes = [
  {
    path: 'VSCM',
    loadChildren: ()=>import('./pages/pages.module')
    .then(m=>m.PagesModule),
  },
  
  {
    path:'',redirectTo:'VSCM',pathMatch:'full'},
    {path:'**',redirectTo:'VSCM'},
   
  
];
const config: ExtraOptions={
  useHash:false,
  onSameUrlNavigation:'reload'
};





@NgModule({
  imports: [RouterModule.forRoot(routes,config)],
  exports: [RouterModule]
})
export class AppRoutingModule { } //export const
 // RoutingComponent = [];
