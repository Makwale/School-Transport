import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { AccountService } from 'src/app/services/account.service';
import { OwnersService } from '../../../services/owners.service';
import swal from "sweetalert2";
import { Driver, Vehicle } from '../../../models/owner.model';
import { School } from 'src/app/pages/schools/models/school.model';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.scss']
})
export class EditVehicleComponent implements OnInit {
  isLoading: boolean;
  vehicleForm: FormGroup;
  validationMessages = {
    required: [
      { type: 'required', message: 'This field is required.' }
    ],
  };
  levels = [];
  make = [];
  model = [];
  modelOfMake = [];
  types = [];
  schools: School[];
  drivers: Driver[];
  constructor(
    private ownerService: OwnersService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private acs: AccountService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogReg: MatDialogRef<EditVehicleComponent>
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.vehicleForm = this.fb.group({
      type: [this.data.vehicle.type, [Validators.required]],
      make: [this.data.vehicle.make, [Validators.required]],
      model: [this.data.vehicle.model, [Validators.required]],
      regno: [this.data.vehicle.regno, [Validators.required]],
      capacity: [this.data.vehicle.capacity, [Validators.required]],
      schools: [this.data.vehicle.schools.map(school => school.id)],
      driver: [this.data.vehicle.driverId],
      lon: [(this.data.vehicle as Vehicle).locations[0]?.longitude, [Validators.required]],
      lat: [(this.data.vehicle as Vehicle).locations[0]?.latitude, [Validators.required]],
    });


    this.types = [
      {
        name: 'Bus',
        value: 'bus'
      },
      {
        name: 'Mini Bus',
        value: 'mini_bus'
      },
      {
        name: 'Taxi',
        value: 'taxi'
      },
    ]
    this.make = [
      {
        name: 'Toyota',
        value: 'toyota',
        models: [
          {
            name: 'Quantum',
            value: 'qua',
          },
          {
            name: 'HiAce',
            value: 'hiace',
          }
        ]
      },
      {
        name: 'Mercedes Benz',
        value: 'merc',
        models: [
          {
            name: 'Sprinter',
            value: 'sprinter',
          }
        ]
      }
    ];
    this.modelOfMake = this.make.find(m => m.value === this.data.vehicle.make).models;
    this.schools = this.data.schools;
    this.drivers = this.data.drivers;
  }

  addSchool(){
    this.vehicleForm.markAllAsTouched();
    this.vehicleForm.markAsDirty();
    const data = {
      type: this.vehicleForm.value.type,
      make: this.vehicleForm.value.make,
      model: this.vehicleForm.value.model,
      regno: this.vehicleForm.value.regno,
      capacity: this.vehicleForm.value.capacity,
      driver_id: this.vehicleForm.value.driver
    }

    const schools = this.vehicleForm.value.schools.map(id => {
      return {
        school_id: id,
        vehicle_id: this.data.vehicle.id
      }
    });
    const location = {
      latitude: this.vehicleForm.value.lat,
      longitude: this.vehicleForm.value.lon,
      vehicle_id:this.data.vehicle.id
    }
    console.log(this.vehicleForm.value);
    if(this.vehicleForm.valid){
      this.isLoading = true;
      this.ownerService.updateVehicle(data, this.data.vehicle.id, schools, location).subscribe( response => {
        this.isLoading = false;
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

  isInvalid(controlName: string) {
    return ((this.vehicleForm.get(controlName).invalid) && (this.vehicleForm.get(controlName).touched));
  }

  isValid(controlName: string) {
    return ((this.vehicleForm.get(controlName).valid) && (this.vehicleForm.get(controlName).touched));
  }

  hasError(controlName: string, validationType: string) {
    // tslint:disable-next-line:max-line-length
    return this.vehicleForm.get(controlName).hasError(validationType) && (this.vehicleForm.get(controlName).dirty || this.vehicleForm.get(controlName).touched);
  }

}
