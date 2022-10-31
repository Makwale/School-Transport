import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { GET_TRANSPORTS } from '../graphql/transport.graphql';

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  transportsQueryRef: QueryRef<any>;
  constructor(private apollo: Apollo) { }
  getTransports(){
    this.transportsQueryRef = this.apollo.watchQuery({
      query: GET_TRANSPORTS
    });
    return this.transportsQueryRef.valueChanges;
  }
}
