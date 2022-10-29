import { Injectable } from '@angular/core';
import swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  static showDeleteAlert() {
    return swal.fire({
      title: "Are you sure?",
      text: "You won\'t be able to revert this!",
      icon: "warning",
      buttonsStyling: false,
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonText: "Continue",
      customClass: {
        cancelButton: "btn btn-outline-dark",
        confirmButton: "btn btn-danger",
      },

    });
  }
}
