import { Component, DoCheck, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import swal from "sweetalert2";
import { Auth } from 'aws-amplify';
import { DatabaseService } from 'src/app/services/database.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, DoCheck {
  isLoading: boolean;
  userForm: FormGroup;
  pricings: any[] = [];
  validationMessages = {
    required: [
      { type: 'required', message: 'This field is required.' }
    ],
  };
  isUpdating: boolean;
  isLoadingData: boolean;
  constructor(
    private fb: FormBuilder,
    private as: AuthService,
    private dbs: DatabaseService,
    private acs: AccountService
  ) { }

  ngOnInit(): void {
    this.isLoadingData = true;
    this.userForm = this.fb.group({
      name: [this.acs.user?.name, [Validators.required]],
      surname: [this.acs.user?.surname, [Validators.required]],
      email: [this.acs.user?.email, [Validators.required]],
      phone: [this.acs.user?.phone, [Validators.required]],
      role: [this.acs.user?.role, [Validators.required]],
    });
      this.isLoadingData = false;
  }

  isInvalid(controlName: string) {
    return ((this.userForm.get(controlName).invalid) && (this.userForm.get(controlName).touched));
  }

  isValid(controlName: string) {
    return ((this.userForm.get(controlName).valid) && (this.userForm.get(controlName).touched));
  }

  hasError(controlName: string, validationType: string) {
    // tslint:disable-next-line:max-line-length
    return this.userForm.get(controlName).hasError(validationType) && (this.userForm.get(controlName).dirty || this.userForm.get(controlName).touched);
  }

  ngDoCheck(): void {
    // this.userForm = this.fb.group({
    //   name: [this.as.user?.name, [Validators.required]],
    //   surname: [this.as.user?.surname, [Validators.required]],
    //   email: [this.as.user?.email, [Validators.required]],
    //   role: [this.as.user?.role, [Validators.required]],
    // });
  }

  updateProfile(){
    this.userForm.markAllAsTouched();
    this.userForm.markAsDirty();
    if(this.userForm.valid){
      this.isUpdating = true;
      const data = {
        name: this.userForm.value.name,
        surname: this.userForm.value.surname,
        phone: this.userForm.value.phone
      }
      this.as.updateUser(this.acs.user.id, data).subscribe(response => {
        this.isUpdating = false;
        swal.fire({
          title: "Successfully updated",
          icon: "success",
        });
      });
    }
  }

}
