import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Driver } from 'src/app/pages/drivers/models/driver.model';
import { AccountService } from 'src/app/services/account.service';
import { Child, School, Vehicle } from '../../models/parent.model';
import { ParentService } from '../../services/parent.service';
import swal from "sweetalert2";

declare var mapboxgl: any;
declare var MapboxDirections; 

@Component({
  selector: 'app-edit-child',
  templateUrl: './edit-child.component.html',
  styleUrls: ['./edit-child.component.scss']
})
export class EditChildComponent implements OnInit {
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
  isSearchingTransport: boolean;
  hasTransport: boolean;
  transports: any[];
  closerTransports: any[];
  isRequesting: boolean;
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
  	mapboxgl.accessToken = 'pk.eyJ1IjoibWFudWVsbWFrd2FsZSIsImEiOiJja2hsc3lmYWUyZzRnMnRsNnY2NWIyeGR6In0.1MGnfpXj_dV2QBO3SchfqA';
    this.childForm = this.fb.group({
      name: [this.data.child.name, [Validators.required]],
      surname: [this.data.child.surname, [Validators.required]],
      levels: [this.data.child.learnerSchool[0].level, [Validators.required]],
      grade: [Number(this.data.child.learnerSchool[0].grade), [Validators.required]],
      schools: [this.data.child.learnerSchool[0].school.id],
      streetName: [(this.data.child as Child).location.streetName, [Validators.required]],
      suburb: [(this.data.child as Child).location.suburb, [Validators.required]],
      city: [(this.data.child as Child).location.city, [Validators.required]],
      postalCode: [(this.data.child as Child).location?.postalCode, [Validators.required]],
      lat: [(this.data.child as Child).location.latitude, [Validators.required]],
      lon: [(this.data.child as Child).location?.longitude, [Validators.required]]
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
    if(this.data.child.learnerSchool[0].level === 'primary'){
      this.grades = this.allGrades.filter(grade => grade < 8);
    }else{
      this.grades = this.allGrades.filter(grade => grade > 7);
    }

    if((this.data.child as Child).learnerSchool[0].school.schoolTransports.length > 0){
      this.transports = (this.data.child as Child).learnerSchool[0].school.schoolTransports;
      console.log(this.transports);
    }

    if((this.data.child as Child).learnerTransports.length){
      const transport = (this.data.child as Child).learnerSchool[0].
      school.schoolTransports.find( 
        t => t.vehicle.id === (this.data.child as Child).learnerTransports[0]?.vehicle.id);
      console.log(transport);
      this.hasTransport = transport ? true : false;
    }
    
  }

  updateChild(){
    this.childForm.markAllAsTouched();
    this.childForm.markAsDirty();
    const data = {
      name: this.childForm.value.name,
      surname: this.childForm.value.surname,
      user_id: this.acs.user.id,
    };
    const location = {
        street_name: this.childForm.value.streetName,
        suburb: this.childForm.value.suburb,
        city: this.childForm.value.city,
        postal_code: String(this.childForm.value.postalCode),
        latitude: this.childForm.value.lat,
        longitude: this.childForm.value.lon
    };

    const learner_schools = {
          school_id: this.childForm.value.schools.id,
          level: this.childForm.value.levels.value,
          status: 'current_study',
          grade: String(this.childForm.value.grade)
    }

    if(this.childForm.valid){
      this.isLoading = true;
      this.parentService.updateChild(this.data.child.id, data,null, location ).subscribe( response => {
        this.isLoading = false;
        this.parentService.childrenQueryRef.refetch();
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
  
  searchTransport(){
    this.isSearchingTransport = true;
    if(this.isSearchingTransport){
      const learnerLocation = new mapboxgl.LngLat(-29.847932233104505, 30.99541354170813);
      // const learnerLocation = new mapboxgl.LngLat(
      // (this.data.child as Child).location.longitude, (this.data.child as Child).location.longitude);
      this.closerTransports = this.transports.filter(tr => {
        console.log(tr.vehicle.locations[0])
        const vehicleLocation = new mapboxgl.LngLat(tr.vehicle.locations[0].longitude, tr.vehicle.locations[0].latitude);
        const distance = learnerLocation.distanceTo(vehicleLocation);
        console.log(distance);
        if(distance <= 10000){
          return tr;
        }
      });
      console.log(this.closerTransports);
    }
  }
  back(){
    this.isSearchingTransport = false;
  }

  requestTransport(vehicle: any){
    this.isRequesting = true;
    const lt = {
      learner_id: this.data.child.id,
      vehicle_id: vehicle.id,
      school_id: this.data.child.learnerSchool[0].school.id,
      status: 'pending'
    }
    this.parentService.requestTransport(lt).subscribe( response => {
      this.isRequesting = false;
      this.parentService.childrenQueryRef.refetch();
      swal.fire({
        title: "Successfully requested",
        icon: "success",
      });
    }, error => {
      this.isRequesting = false;
      swal.fire({
        title: error.message,
        icon: "error",
      });
    });
  }
}

// -29.847932233104505, 30.99541354170813