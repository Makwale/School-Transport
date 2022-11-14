import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SchoolsService } from 'src/app/pages/schools/services/schools.service';
import { AccountService } from 'src/app/services/account.service';
import swal from "sweetalert2";
import { OwnersService } from '../../../services/owners.service';

@Component({
  selector: 'app-add-drivers',
  templateUrl: './add-drivers.component.html',
  styleUrls: ['./add-drivers.component.scss']
})
export class AddDriversComponent implements OnInit {

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
    private acs: AccountService
  ) { }

  ngOnInit(): void {
    this.driverForm = this.fb.group({
      name: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phone: [null, [Validators.required]],
    });
  }

  addSchool(){
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
      this.ownerService.addDriver(data).subscribe(response => {
        this.isLoading = false;
        this.driverForm.reset();
        swal.fire({
          title: "Successfully created",
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
