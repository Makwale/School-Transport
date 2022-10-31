import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { LoginComponent } from "./layouts/auth-layout/login/login.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { UsersComponent } from "./pages/users/users.component";
import { ParkingLotComponent } from "./pages/parking-lot/parking-lot.component";
import { BookingsComponent } from "./pages/bookings/bookings.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { LearnersComponent } from "./pages/learners/learners.component";
import { SchoolsComponent } from "./pages/schools/schools.component";
import { TransportComponent } from "./pages/transport/transport.component";
import { DriversComponent } from "./pages/drivers/drivers.component";
import { OwnersComponent } from "./pages/owners/owners.component";
const routes: Routes = [

  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full"
  },
  {
    path: "admin",
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'learners',
        pathMatch: 'full',
      },
      {
        path: 'learners',
        component: LearnersComponent
      },
      {
        path: 'schools',
        component: SchoolsComponent
      },
      {
        path: 'transports',
        component: TransportComponent
      },
      {
        path: 'drivers',
        component: DriversComponent
      },
      {
        path: 'owners',
        component: OwnersComponent
      },
      {
        path: 'parking-lot',
        component: ParkingLotComponent
      },
      {
        path: 'bookings',
        component: BookingsComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
    ]
  },

  {
    path: "auth",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          () => import('./layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  },

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
