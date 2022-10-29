import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParkingLotService } from '../../services/parking-lot.service';
import swal from "sweetalert2";
import { MatDialog } from '@angular/material/dialog';
import { PricingComponent } from '../pricing/pricing.component';
@Component({
  selector: 'app-create-parking-lot',
  templateUrl: './create-parking-lot.component.html',
  styleUrls: ['./create-parking-lot.component.scss']
})
export class CreateParkingLotComponent implements OnInit {
  isLoading: boolean;
  parkingForm: FormGroup;
  pricings: any[] = [];

  validationMessages = {
    required: [
      { type: 'required', message: 'This field is required.' }
    ],
  };
  constructor(
    private ps: ParkingLotService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.parkingForm = this.fb.group({
      name: [null, [Validators.required]],
      numberOfSpots: [null, [Validators.required]],
      lat: [null, [Validators.required]],
      lon: [null, [Validators.required]]
    })
  }

  createParkingLot(){
    this.parkingForm.markAllAsTouched();
    this.parkingForm.markAsDirty();
    const data = {
      name: this.parkingForm.value.name,
      number_parking_spot: this.parkingForm.value.numberOfSpots,
      number_available_spot: this.parkingForm.value.numberOfSpots,
      geo: {
        lat: this.parkingForm.value.lat,
        lon: this.parkingForm.value.lon
      },
      pricings: this.pricings
    }
    if(this.parkingForm.valid){
      this.isLoading = true;
      this.ps.createParkingLot(data).subscribe(response => {
        this.isLoading = false;
        this.parkingForm.reset();
        this.pricings = [];
        swal.fire({
          title: "Successfully created",
          icon: "success",
        });
        this.ps.parkingsQueryRef.refetch();
      })
    }
  }

  addPricings(){
    this.dialog.open(PricingComponent, {
      width: '300px'
    }).afterClosed().subscribe(results => {
      console.log(results);
      if(results){
        this.pricings.push(results);
      }
    })
  }

  deletePrice(index: number){
    this.pricings.splice(index, 1);
  }


  isInvalid(controlName: string) {
    return ((this.parkingForm.get(controlName).invalid) && (this.parkingForm.get(controlName).touched));
  }

  isValid(controlName: string) {
    return ((this.parkingForm.get(controlName).valid) && (this.parkingForm.get(controlName).touched));
  }

  hasError(controlName: string, validationType: string) {
    // tslint:disable-next-line:max-line-length
    return this.parkingForm.get(controlName).hasError(validationType) && (this.parkingForm.get(controlName).dirty || this.parkingForm.get(controlName).touched);
  }

}
