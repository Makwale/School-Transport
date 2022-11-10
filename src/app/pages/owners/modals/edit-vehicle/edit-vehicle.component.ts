import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { AccountService } from 'src/app/services/account.service';
import { OwnersService } from '../../services/owners.service';
import swal from "sweetalert2";
import { Vehicle } from '../../models/owner.model';

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
  modelOfMake = []
  types = [];
  constructor(
    private ownerService: OwnersService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private acs: AccountService,
    @Inject(MAT_DIALOG_DATA) public data: Vehicle,
    private dialogReg: MatDialogRef<EditVehicleComponent>
  ) { }

  ngOnInit(): void {
    this.vehicleForm = this.fb.group({
      type: [this.data.type, [Validators.required]],
      make: [this.data.make, [Validators.required]],
      model: [this.data.model, [Validators.required]],
      regno: [this.data.regno, [Validators.required]],
      capacity: [this.data.capacity, [Validators.required]],
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
    this.modelOfMake = this.make.find(m => m.value === this.data.make).models
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
    }
    if(this.vehicleForm.valid){
      this.isLoading = true;
      this.ownerService.updateVehicle(data, this.data.id).subscribe(response => {
        this.isLoading = false;
        swal.fire({
          title: "Successfully updated",
          icon: "success",
        });
        this.dialogReg.close({res: true});
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
