import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Auth } from "aws-amplify";
import { AccountService } from "src/app/services/account.service";

@Component({
  selector: "app-auth-layout",
  templateUrl: "./auth-layout.component.html",
  styleUrls: ["./auth-layout.component.scss"]
})
export class AuthLayoutComponent implements OnInit, OnDestroy {
  test: Date = new Date();
  public isCollapsed = true;

  constructor(private router: Router, public acs: AccountService) { }

  ngOnInit() {
    var html = document.getElementsByTagName("html")[0];
    // html.classList.add("auth-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-default");
    var navbar = document.getElementsByClassName("navbar-horizontal")[0];
    navbar?.classList.add("navbar-light");
    navbar?.classList.add("navbar-transparent");
  }
  ngOnDestroy() {
    // var html = document.getElementsByTagName("html")[0];
    // html.classList.remove("auth-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("bg-default");
    var navbar = document.getElementsByClassName("navbar-horizontal")[0];
    navbar?.classList.remove("navbar-light");
    navbar?.classList.remove("navbar-transparent");
  }

  logout() {
    Auth.signOut().then(() => {
      this.acs.loginStatus = false;
      this.acs.user = null;
      this.acs.clientid = undefined;
    })
  }
}
