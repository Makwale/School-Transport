import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { School } from 'src/app/pages/learners/models/learner.model';
import { AuthService } from 'src/app/services/auth.service';
import swal from "sweetalert2";

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss']
})
export class VerificationCodeComponent implements OnInit {
  isCreated = false;
  vcode: FormControl;
  username: string;
  email: string;
  vForm: FormGroup;
  constructor(
    private as: AuthService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<VerificationCodeComponent>) { }

  ngOnInit(): void {
    this.username = this.data.username;
    this.email = this.data.email;
    this.vForm = this.fb.group({
      username: [this.username, [Validators.required]],
      vcode: ['', [Validators.required]]
    })
  }

  continue(){
    this.isCreated = true;
    if(this.vForm.valid){
      this.as.verify(this.vForm, undefined).then(res => {
        this.dialogRef.close({results: true});
      }).catch(error => {
        this.isCreated = false;
          swal.fire({
            title: "Registration Failed",
            text: error.message,
            icon: "error",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-danger"
            }
          });
      })
    }
    
  }
}
