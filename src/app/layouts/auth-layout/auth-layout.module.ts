import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthLayoutRoutes } from "./auth-layout.routing";

import { LoginComponent } from "./login/login.component";
import { SpinnerComponent } from "src/app/components/spinner/spinner.component";
import { RegistrationComponent } from './registration/registration.component';
import {MatSelectModule} from '@angular/material/select';
import { VerificationCodeComponent } from './registration/modals/verification-code/verification-code.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  declarations: [
    LoginComponent,
    SpinnerComponent,
    RegistrationComponent,
    VerificationCodeComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthLayoutModule { }
