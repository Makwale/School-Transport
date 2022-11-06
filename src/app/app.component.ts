import { Component, OnInit } from "@angular/core";
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Address } from 'src/app/models/address.model';
import { Client } from 'src/app/models/client.model';
import { User } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Auth } from 'aws-amplify';
import swal from "sweetalert2";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  testStyles;
  testStyles2;
  constructor(private router: Router, private as: AuthService, private dbs: DatabaseService,
    private acs: AccountService) {

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
        window.scrollTo(0, 0);
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user

      }
    });
  }

  ngOnInit() {

    this.testStyles = {
      color: true ? 'yellow' : 'red',
      width: true ? '20px' : '0px',
      height: '20px',
      'background-color': 'pink',
      'border-radius': '50%',
      margin: 'auto',
      'margin-top': '5px'
    }
    this.testStyles2 = {
      color: true ? 'yellow' : 'red',
      width: true ? '5px' : '0px',
      height: true ? '5px' : '10px',
      'background-color': 'grey',
      'border-radius': '50%',
      margin: 'auto',
      'margin-top': '5px'
    }

    localStorage.setItem("token", "");
    Auth.currentAuthenticatedUser().then(results => {

      if (results) {
        console.log(results);
        this.dbs.getUser('').subscribe(response => {
          console.log(response.data);
          this.as.user = response.data.user[0];
          this.acs.loginStatus = true;
        })
      }
    }, reason => {

    })

  }
}
