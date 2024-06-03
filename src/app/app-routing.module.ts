import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {AdherentComponent} from './adherent/adherent.component'
import {AdherentFormComponent } from './adhernt-form/adherent-form.component';
import { BicycleTypeComponent } from './bicycle-type/bicycle-type.component';
import { BicycleTypeFormComponent } from './bicycle-type-form/bicycle-type-form.component';
import { BicyclesComponent } from './bicycles/bicycles.component';
import { BicycleFormComponent } from './bicycle-form/bicycle-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RentalComponent } from './rental/rental.component';
import { RentalFormComponent } from './rental-form/rental-form.component';

const routes: Routes = [

  {
    path:'',
    pathMatch:'full',
    redirectTo:'login'
  },

  {
    path:'dashboard',
    pathMatch:'full',
    component:DashboardComponent
  },
  {
    path:'login',
    pathMatch:'full',
    component:LoginComponent
  },
  {
    path:'adherents',
    pathMatch:'full',
    component:AdherentComponent
  },
  {
    path:':id/edit',
    pathMatch:'full',
    component:AdherentFormComponent
  },
  {
    path:'types',
    pathMatch:'full',
    component:BicycleTypeComponent
  },
  {
    path:':id/edit',
    pathMatch:'full',
    component:BicycleTypeFormComponent
  },
  {
    path:'bicycles',
    pathMatch:'full',
    component:BicyclesComponent
  },
  {
    path:':id/edit',
    pathMatch:'full',
    component:BicycleFormComponent
  },
  {
    path:':rentals',
    pathMatch:'full',
    component:RentalComponent
  },
  {
    path:':id/edit',
    pathMatch:'full',
    component:RentalFormComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
