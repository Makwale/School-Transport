import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { GET_DRIVERS } from '../graphql/driver.graphql';

@Injectable({
  providedIn: 'root'
})
export class DriversService {
  driversQueryRef: QueryRef<any>;
  constructor(private apollo: Apollo) { }
  
  getDrivers(){

    this.driversQueryRef = this.apollo.watchQuery({
      query: GET_DRIVERS
    });

    return this.driversQueryRef.valueChanges;
  }
}
