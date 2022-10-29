import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ParkingLotService } from '../../services/parking-lot.service';
import { PricingComponent } from '../pricing/pricing.component';
import swal from "sweetalert2";
import { Parking } from '../../models/parking.model';

@Component({
  selector: 'app-edit-parking-lot',
  templateUrl: './edit-parking-lot.component.html',
  styleUrls: ['./edit-parking-lot.component.scss']
})
export class EditParkingLotComponent implements OnInit {
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
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Parking
  ) { }

  ngOnInit(): void {
    this.parkingForm = this.fb.group({
      name: [this.data.name, [Validators.required]],
      numberOfSpots: [this.data.numberOfSpots, [Validators.required]],
      lat: [this.data.geo.lat, [Validators.required]],
      lon: [this.data.geo.lon, [Validators.required]]
    });
    this.pricings = [...this.data.pricings];
  }

  updateParkingLot(){
    this.parkingForm.markAllAsTouched();
    this.parkingForm.markAsDirty();
    const data = {
      name: this.parkingForm.value.name,
      number_parking_spot: this.parkingForm.value.numberOfSpots,
      number_available_spot: this.data.spotsAvailable,
      geo: {
        lat: this.parkingForm.value.lat,
        lon: this.parkingForm.value.lon
      },
      pricings: this.pricings
    }
    if(this.parkingForm.valid){
      this.isLoading = true;
      this.ps.updateParkingLot(this.data.id ,data).subscribe(response => {
        this.isLoading = false;
        swal.fire({
          title: "Successfully updated",
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
