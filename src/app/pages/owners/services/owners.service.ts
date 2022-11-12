import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { ADD_DRIVER, ADD_VEHICLE, DELETE_DRIVER, DELETE_VEHICLE, GET_DRIVERS, GET_OWNERS, GET_VEHICLES, UPDATE_DRIVER, UPDATE_VEHICLE } from '../graphql/owners.graphql';

@Injectable({
  providedIn: 'root'
})
export class OwnersService {
  ownersQueryRef: QueryRef<any>;
  driversQueryRef: QueryRef<any>;
  vehiclesQueryRef: QueryRef<any>;
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
    });
  }

  getVehicles(id: string){
    this.vehiclesQueryRef = this.apollo.watchQuery({
      query: GET_VEHICLES,
      variables: {
        id
      },
      fetchPolicy: 'network-only'
    });

    return this.vehiclesQueryRef.valueChanges;
  }

  addVehicle(vehicle: any){
    return this.apollo.mutate({
      mutation: ADD_VEHICLE,
      variables: {
        vehicle
      }
    });
  }

  updateVehicle(vehicle: any, id: string, schools: any[]){
    return this.apollo.mutate({
      mutation: UPDATE_VEHICLE,
      variables: {
        id,
        vehicle,
        schools
      }
    });
  }

  deleteVehicle(id: string){
    return this.apollo.mutate({
      mutation: DELETE_VEHICLE,
      variables: {
        id
      }
    })
  }
}
