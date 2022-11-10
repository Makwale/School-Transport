import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from 'src/app/services/account.service';
import { OwnersService } from '../../services/owners.service';
import swal from "sweetalert2";
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {
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
    private acs: AccountService
  ) { }

  ngOnInit(): void {
    this.vehicleForm = this.fb.group({
      type: [null, [Validators.required]],
      make: [null, [Validators.required]],
      model: [null, [Validators.required]],
      regno: [null, [Validators.required]],
      capacity: [null, [Validators.required]],
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
  }

  addSchool(){
    this.vehicleForm.markAllAsTouched();
    this.vehicleForm.markAsDirty();
    const data = {
      type: this.vehicleForm.value.type.value,
      make: this.vehicleForm.value.make.value,
      model: this.vehicleForm.value.model.value,
      regno: this.vehicleForm.value.regno,
      capacity: this.vehicleForm.value.capacity,
      owner_id: this.acs.user.id,
    }
    if(this.vehicleForm.valid){
      this.isLoading = true;
      this.ownerService.addVehicle(data).subscribe(response => {
        this.isLoading = false;
        this.vehicleForm.reset();
        swal.fire({
          title: "Successfully created",
          icon: "success",
        });
        this.ownerService.vehiclesQueryRef.refetch();
      }, error => {
        swal.fire({
          title: error.message,
          icon: "error",
        });
      });
    }
  }

  selectMake(event: MatSelectChange){
    this.modelOfMake = event.value.models
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
