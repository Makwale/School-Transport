import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { SpinnerComponent } from "./spinner.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule, 
    TooltipModule.forRoot(), 
    BsDropdownModule.forRoot(), 
    CollapseModule.forRoot()
  ],
  })
export class SpinnerModule{}