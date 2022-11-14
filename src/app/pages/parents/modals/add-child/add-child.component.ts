import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Driver } from 'src/app/pages/drivers/models/driver.model';
import { EditVehicleComponent } from 'src/app/pages/owners/modals/owner/edit-vehicle/edit-vehicle.component';
import { OwnersService } from 'src/app/pages/owners/services/owners.service';
import { AccountService } from 'src/app/services/account.service';
import swal from "sweetalert2";
import { School } from '../../models/parent.model';
import { ParentService } from '../../services/parent.service';
import { EditChildComponent } from '../edit-child/edit-child.component';

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.scss']
})
export class AddChildComponent implements OnInit {
  isLoading: boolean;
  childForm: FormGroup;
  validationMessages = {
    required: [
      { type: 'required', message: 'This field is required.' }
    ],
  };
  make = [];
  grades = [];
  allGrades = [];
  modelOfMake = []
  levels = [];
  schools: School[];
  drivers: Driver[];
  constructor(
    private parentService: ParentService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private acs: AccountService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditChildComponent>
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.childForm = this.fb.group({
      name: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      levels: [null, [Validators.required]],
      grade: [null, [Validators.required]],
      schools: [this.data.schools.map(school => school.id)],
      streetName: [null, [Validators.required]],
      suburb: [null, [Validators.required]],
      city: [null, [Validators.required]],
      postalCode: [null, [Validators.required]]
    });


    this.levels = [
      {
        name: 'Primary',
        value: 'primary'
      },
      {
        name: 'Secondary',
        value: 'secondary'
      },
      
    ]
    this.allGrades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    this.schools = this.data.schools;
  }

  addSchool(){
    this.childForm.markAllAsTouched();
    this.childForm.markAsDirty();
    const data = {
      name: this.childForm.value.name,
      surname: this.childForm.value.surname,
      user_id: this.acs.user.id,
      location:  {
        data: {
          street_name: this.childForm.value.streetName,
          suburb: this.childForm.value.suburb,
          city: this.childForm.value.city,
          postal_code: String(this.childForm.value.postalCode),
        }
      },
      learner_schools: {
        data: [
          {
            school_id: this.childForm.value.schools.id,
            level: this.childForm.value.levels.value,
            status: 'current_study',
            grade: String(this.childForm.value.grade)
          }
        ]
      }
      
    }
    console.log(data);
    if(this.childForm.valid){
      this.isLoading = true;
      this.parentService.insertChild(data).subscribe( response => {
        this.isLoading = false;
        this.parentService.childrenQueryRef.refetch();
        this.childForm.reset();
        swal.fire({
          title: "Successfully updated",
          icon: "success",
        });
      }, error => {
        swal.fire({
          title: error.message,
          icon: "error",
        });
      });
    }
  }

  selectMake(event: MatSelectChange){
    this.modelOfMake = this.make.find(m => m.value === event.value).models
  }

  selectLevel(event: MatSelectChange){
    if(event.value.value === 'primary'){
      this.grades = this.allGrades.filter(grade => grade < 8);
    }else{
      this.grades = this.allGrades.filter(grade => grade > 7);
    }
  }

  isInvalid(controlName: string) {
    return ((this.childForm.get(controlName).invalid) && (this.childForm.get(controlName).touched));
  }

  isValid(controlName: string) {
    return ((this.childForm.get(controlName).valid) && (this.childForm.get(controlName).touched));
  }

  hasError(controlName: string, validationType: string) {
    // tslint:disable-next-line:max-line-length
    return this.childForm.get(controlName).hasError(validationType) && (this.childForm.get(controlName).dirty || this.childForm.get(controlName).touched);
  }
}
