import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { CognitoUser } from '@aws-amplify/auth';
import swal from "sweetalert2";
import { MatDialog } from '@angular/material/dialog';
import { VerificationCodeComponent } from './modals/verification-code/verification-code.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  regForm: FormGroup;
  isCreated: boolean = false;
  userTypes = [];
  constructor(
    private as: AuthService,
    private acs: AccountService,
    private dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.userTypes = [
      {
        type: 'parent',
        displayedValue: 'Parent'
      },
      {
        type: 'vehicle_owner',
        displayedValue: 'Transport Owner'
      }
    ]
    this.regForm = new FormBuilder().group({
      user: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      surname: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.minLength(8), Validators.required]],
    })

  }

  register() {
    this.isCreated = true;
    if(this.regForm.valid){
      this.as.signup(this.regForm).then(results => {
        console.log(results);
        this.isCreated = false;
        swal.fire({
          title: "Verification code",
          text: "Verificaation code sent",
          icon: "success",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-primary"
          }
        });
        const ref = this.dialog.open(VerificationCodeComponent,
        {
          width: '400px',
          data: {
            username: this.regForm.value.username,
            email: this.regForm.value.email
          }
        });

        ref.afterClosed().subscribe(res => {
          console.log(res);
          if(res.results){
              const user = {
                id: results.userSub,
                name: this.regForm.value.name,
                surname: this.regForm.value.surname,
                email: this.regForm.value.email,
                phone: this.regForm.value.email,
                role: this.regForm.value.user.type
              }
            
            this.as.createUser(user).subscribe(res => {
              swal.fire({
                title: "Success",
                text: "Account seccessfully created",
                icon: "success",
                buttonsStyling: false,
                customClass: {
                  confirmButton: "btn btn-primary"
                }
              });
              this.regForm.reset();
              this.router.navigate(['auth/login']);
            }, error => {
              swal.fire({
                title: "Registration Failed",
                text: error.message,
                icon: "error",
                buttonsStyling: false,
                customClass: {
                  confirmButton: "btn btn-danger"
                }
              });
            });
          }
        });

      }).catch(error => {
        this.isCreated = false;
        swal.fire({
          title: "Registration Failed",
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
}
