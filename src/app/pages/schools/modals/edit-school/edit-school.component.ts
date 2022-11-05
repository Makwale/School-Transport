import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import swal from "sweetalert2";
import { School } from '../../models/school.model';
import { SchoolsService } from '../../services/schools.service';

@Component({
  selector: 'app-edit-school',
  templateUrl: './edit-school.component.html',
  styleUrls: ['./edit-school.component.scss']
})
export class EditSchoolComponent implements OnInit {
  isLoading: boolean;
  schoolForm: FormGroup;
  validationMessages = {
    required: [
      { type: 'required', message: 'This field is required.' }
    ],
  };
  levels = [];
  constructor(
    private schoolService: SchoolsService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: School
  ) { }

  ngOnInit(): void {
    this.schoolForm = this.fb.group({
      name: [this.data.name, [Validators.required]],
      level: [this.data.level, [Validators.required]],
      streetName: [this.data.address.streetName, [Validators.required]],
      suburb: [this.data.address.suburb, [Validators.required]],
      city: [this.data.address.city, [Validators.required]],
      postalCode: [this.data.address.postalCode, [Validators.required]]
    });
    
    this.levels = [
      {
        displayedValue: "Primary",
        value: "primary"
      },
      {
        displayedValue: "Secondary",
        value: "secondary"
      }
    ];

    console.log(this.data);
  }

  addSchool(){
    this.schoolForm.markAllAsTouched();
    this.schoolForm.markAsDirty();
    const data = {
      name: this.schoolForm.value.name,
      school_level: this.schoolForm.value.level,
    }
    const location = {
        street_name: this.schoolForm.value.streetName,
        suburb: this.schoolForm.value.suburb,
        city: this.schoolForm.value.city,
        postal_code: String(this.schoolForm.value.postalCode),
    }

    if(this.schoolForm.valid){
      this.isLoading = true;
      this.schoolService.updateSchool(this.data.id, data, location).subscribe( response => {
        this.isLoading = false;
        swal.fire({
          title: "Successfully created",
          icon: "success",
        });
        this.schoolService.schoolsQueryRef.refetch();
      }, error => {
        swal.fire({
          title: error,
          icon: "error",
        });
      });
    }
  }

  isInvalid(controlName: string) {
    return ((this.schoolForm.get(controlName).invalid) && (this.schoolForm.get(controlName).touched));
  }

  isValid(controlName: string) {
    return ((this.schoolForm.get(controlName).valid) && (this.schoolForm.get(controlName).touched));
  }

  hasError(controlName: string, validationType: string) {
    // tslint:disable-next-line:max-line-length
    return this.schoolForm.get(controlName).hasError(validationType) && (this.schoolForm.get(controlName).dirty || this.schoolForm.get(controlName).touched);
  }
}
