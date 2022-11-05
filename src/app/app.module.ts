import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ToastrModule } from "ngx-toastr";
import { TagInputModule } from "ngx-chips";
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AppComponent } from "./app.component";
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

import { GraphQLModule } from "./graphql.module";
import { Apollo } from "apollo-angular";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { ComponentsModule } from "./components/components.module";
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { UsersComponent } from "./pages/users/users.component";
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ParkingLotComponent } from "./pages/parking-lot/parking-lot.component";
import {MatDialogModule} from '@angular/material/dialog';
import { CreateParkingLotComponent } from "./pages/parking-lot/modals/create-parking-lot/create-parking-lot.component";
import { PricingComponent } from "./pages/parking-lot/modals/pricing/pricing.component";
import { EditParkingLotComponent } from "./pages/parking-lot/modals/edit-parking-lot/edit-parking-lot.component";
import { BookingsComponent } from "./pages/bookings/bookings.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { LearnersComponent } from "./pages/learners/learners.component";
import { SchoolsComponent } from "./pages/schools/schools.component";
import { TransportComponent } from "./pages/transport/transport.component";
import { DriversComponent } from "./pages/drivers/drivers.component";
import { AddSchoolComponent } from "./pages/schools/modals/add-school/add-school.component";
import { EditSchoolComponent } from "./pages/schools/modals/edit-school/edit-school.component";
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { OwnersComponent } from "./pages/owners/owners.component";

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    AdminLayoutComponent,
    UsersComponent,
    ParkingLotComponent,
    CreateParkingLotComponent,
    PricingComponent,
    EditParkingLotComponent,
    BookingsComponent,
    ProfileComponent,
    LearnersComponent,
    SchoolsComponent,
    TransportComponent,
    DriversComponent,
    AddSchoolComponent,
    EditSchoolComponent,
    OwnersComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ComponentsModule,
    BsDropdownModule.forRoot(),
    AppRoutingModule,
    ToastrModule.forRoot(),
    CollapseModule.forRoot(),
    TagInputModule,
    BrowserModule,
    AppRoutingModule,
    AmplifyAngularModule,
    GraphQLModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AmplifyService, Apollo],
  bootstrap: [AppComponent]
})
export class AppModule { }
