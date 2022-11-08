import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { ADD_DRIVER, DELETE_DRIVER, GET_DRIVERS, GET_OWNERS, UPDATE_DRIVER } from '../graphql/owners.graphql';

@Injectable({
  providedIn: 'root'
})
export class OwnersService {
  ownersQueryRef: QueryRef<any>;
  driversQueryRef: QueryRef<any>;
  constructor(
    private apollo: Apollo
  ) { }

  getOwners(){
    this.ownersQueryRef = this.apollo.watchQuery({
      query: GET_OWNERS
    });
    return this.ownersQueryRef.valueChanges;
  }

  addDriver(driver: any){
    return this.apollo.mutate({
      mutation: ADD_DRIVER,
      variables: {
        driver
      }
    });
  }

  getDrivers(id: string){
    this.driversQueryRef = this.apollo.watchQuery({
      query: GET_DRIVERS,
      variables: {
        id
      }
    });
    return this.driversQueryRef.valueChanges;
  }

  deleteDriver(id: string){
    return this.apollo.mutate({
      mutation: DELETE_DRIVER,
      variables: {
        id
      }
    });
  }

  updateDriver(id: string, driver: any){
    return this.apollo.mutate({
      mutation: UPDATE_DRIVER,
      variables: {
        id,
        driver
      }
    })
  }
}
