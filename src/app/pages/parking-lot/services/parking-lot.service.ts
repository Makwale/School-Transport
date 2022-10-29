import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { DELETE_PARKING_LOT, GET_PARKING_LOT, INSERT_PARKING_LOT, UPDATE_PARKING_LOT } from '../graphql/parking-log.gql';

@Injectable({
  providedIn: 'root'
})
export class ParkingLotService {
  parkingsQueryRef: QueryRef<any>;
  constructor(
    private apollo: Apollo
  ) { }

  getParkingLots(){
    this.parkingsQueryRef = this.apollo.watchQuery({
      query: GET_PARKING_LOT
    });
    return this.parkingsQueryRef.valueChanges;
  }

  createParkingLot(data: any){
    return this.apollo.mutate({
      mutation: INSERT_PARKING_LOT,
      variables: {
        data
      }
    });
  }

  deleteParkingLot(id: string){
    return this.apollo.mutate({
      mutation: DELETE_PARKING_LOT,
      variables: {
        id
      }
    });
  }


  updateParkingLot(id: string, data: any){
    return this.apollo.mutate({
      mutation: UPDATE_PARKING_LOT,
      variables: {
        id,
        data
      }
    })
  }

}
