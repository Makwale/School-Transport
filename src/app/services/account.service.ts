import { Injectable } from '@angular/core';
import { makeUniqueId } from '@apollo/client/utilities';
import { mainModule } from 'process';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  user: User;
  clientid: number;
  loginStatus = false;
  constructor() { 
    // this.user = {
    //   id: "1",
    //   firstname: "Emmanuel",
    //   lastname: "Mametja",
    //   email: "makwale.em@gmail.com",
    //   phone: 3343433,
    //   username: "manuel",
    //   address: undefined,
    //   client: {
    //     id : 2,
    //     userid : "1",
    //     properties: [
    //       {
    //         id: 1,
    //         type: "Test house",
    //         desc: "Test beautiful",
    //         price: 3430034,
    //         images: [{
    //           key: "sfd",
    //           url: " ",
    //         }],
    //         address : {
    //           id: 3,
    //           homeAddress: "3223 Test Address",
    //           city: "Burgersfort",
    //           postalCode: 4232
    //         } 
    //       },
    //       {
    //         id: 2,
    //         type: "Test house 2",
    //         desc: "Test beautiful",
    //         price: 3430034,
    //         images: [{
    //           key: "sfd",
    //           url: " ",
    //         }],
    //         address : {
    //           id: 3,
    //           homeAddress: "3223 Test Address",
    //           city: "Burgersfort",
    //           postalCode: 4232
    //         } 
    //       }
    //     ]
    //   }
    // }
  }
}
