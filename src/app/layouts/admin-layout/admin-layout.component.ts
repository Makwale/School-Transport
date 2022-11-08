import { Component, OnInit, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { AccountService } from "src/app/services/account.service";

@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"]
})
export class AdminLayoutComponent implements OnInit {
  isMobileResolution: boolean;

  constructor(
    private acs: AccountService,
    private router: Router
  ) {
    if (window.innerWidth < 1200) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }
  @HostListener("window:resize", ["$event"])
  isMobile(event) {
    if (window.innerWidth < 1200) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }
  ngOnInit() {
    if(this.acs.user?.role === 'vehicle_owner'){
      this.router.navigate(['admin/my-transports']);
    }
  }
}
