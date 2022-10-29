import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  pricingForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private ref: MatDialogRef<PricingComponent>
  ) { }

  ngOnInit(): void {
    this.pricingForm = this.fb.group({
      duration: [null, [Validators.required]],
      price: [null, [Validators.required]],
    })
  }

  add(){
    this.pricingForm.markAllAsTouched();
    this.pricingForm.markAsDirty();
    if(this.pricingForm.valid){
      this.ref.close(this.pricingForm.value);
    }
  }
}
