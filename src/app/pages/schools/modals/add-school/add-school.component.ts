import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import swal from "sweetalert2";
import { SchoolsService } from '../../services/schools.service';

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.scss']
})
export class AddSchoolComponent implements OnInit {
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
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.schoolForm = this.fb.group({
      name: [null, [Validators.required]],
      level: [null, [Validators.required]],
      streetName: [null, [Validators.required]],
      suburb: [null, [Validators.required]],
      city: [null, [Validators.required]],
      postalCode: [null, [Validators.required]]
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
    ]
  }

  addSchool(){
    this.schoolForm.markAllAsTouched();
    this.schoolForm.markAsDirty();
    const data = {
      name: this.schoolForm.value.name,
      school_level: this.schoolForm.value.level.value,
      school_address: {
        data: {
          street_name: this.schoolForm.value.streetName,
          suburb: this.schoolForm.value.suburb,
          city: this.schoolForm.value.city,
          postal_code: this.schoolForm.value.postalCode,
        }
      }
    }
    if(this.schoolForm.valid){
      this.isLoading = true;
      this.schoolService.addSchool(data).subscribe(response => {
        this.isLoading = false;
        this.schoolForm.reset();
        swal.fire({
          title: "Successfully created",
          icon: "success",
        });
        this.schoolService.schoolsQueryRef.refetch();
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
