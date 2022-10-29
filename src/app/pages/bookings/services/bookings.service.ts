import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_BOOKINGS } from '../graphql/booking.gql';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  
  constructor(
    private apollo: Apollo
  ) { }

  getBookings(){
    return this.apollo.query({
      query: GET_BOOKINGS
    });
  }
}
