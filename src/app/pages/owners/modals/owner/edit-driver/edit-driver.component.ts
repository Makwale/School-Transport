import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'src/app/services/account.service';
import { OwnersService } from '../../../services/owners.service';
import swal from "sweetalert2";
import { School } from 'src/app/pages/learners/models/learner.model';
import { Driver } from '../../../models/owner.model';
@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrls: ['./edit-driver.component.scss']
})
export class EditDriverComponent implements OnInit {
  isLoading: boolean;
  driverForm: FormGroup;
  validationMessages = {
    required: [
      { type: 'required', message: 'This field is required.' }
    ],
  };
  levels = [];
  constructor(
    private ownerService: OwnersService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private acs: AccountService,
    @Inject(MAT_DIALOG_DATA) public data: Driver
  ) { }

  ngOnInit(): void {

    this.driverForm = this.fb.group({
      name: [this.data.name, [Validators.required]],
      surname: [this.data.surname, [Validators.required]],
      email: [this.data.email, [Validators.required]],
      phone: [this.data.phone, [Validators.required]],
    });
  }

  addDriver(){
    this.driverForm.markAllAsTouched();
    this.driverForm.markAsDirty();
    const data = {
      name: this.driverForm.value.name,
      surname: this.driverForm.value.surname,
      email: this.driverForm.value.email,
      phone: this.driverForm.value.phone,
      employer_id: this.acs.user.id
    }
    if(this.driverForm.valid){
      this.isLoading = true;
      this.ownerService.updateDriver(this.data.id, data).subscribe(response => {
        this.isLoading = false;
        swal.fire({
          title: "Successfully updated",
          icon: "success",
        });
        this.ownerService.driversQueryRef.refetch();
      }, error => {
        swal.fire({
          title: error.message,
          icon: "error",
        });
      });
    }
  }

  isInvalid(controlName: string) {
    return ((this.driverForm.get(controlName).invalid) && (this.driverForm.get(controlName).touched));
  }

  isValid(controlName: string) {
    return ((this.driverForm.get(controlName).valid) && (this.driverForm.get(controlName).touched));
  }

  hasError(controlName: string, validationType: string) {
    // tslint:disable-next-line:max-line-length
    return this.driverForm.get(controlName).hasError(validationType) && (this.driverForm.get(controlName).dirty || this.driverForm.get(controlName).touched);
  }
}
