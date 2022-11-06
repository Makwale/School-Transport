import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import swal from "sweetalert2";
import { CognitoUser } from '@aws-amplify/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;
  isCreated: boolean = false;

  constructor(private as: AuthService, private dbs: DatabaseService, private router: Router,
    private acs: AccountService) { }

  ngOnInit(): void {
    this.signinForm = new FormBuilder().group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      password: ['', [Validators.minLength(8), Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{7,}')]],
    })

  }



  signin() {
    this.isCreated = true;
    this.as.sigin(this.signinForm).then(results => {
      const user: CognitoUser = results;
      console.log(user);
      //Sub is used as user primary key in a database
      results.getUserAttributes((error, results) => {
        const sub = results.find(attr => attr.Name === 'sub').Value;
         this.dbs.getUser(sub).subscribe(response => {
          if(response.data.owner){
            this.acs.user = response.data.owner;
          }else{
            this.acs.user = response.data.user;
          }
          this.isCreated = false;
          this.acs.loginStatus = true;
          this.router.navigate(['admin'])

        }, error => {
          console.log(error);
        });
      })
     

    }).catch(error => {
      this.isCreated = false;
      swal.fire({
        title: "Login Failed",
        text: error.message,
        icon: "error",
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-danger"
        }
      });
    })
  }

}
