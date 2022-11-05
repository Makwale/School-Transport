import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { GET_OWNERS } from '../graphql/owners.graphql';

@Injectable({
  providedIn: 'root'
})
export class OwnersService {
  ownersQueryRef: QueryRef<any>;
  constructor(
    private apollo: Apollo
  ) { }

  getOwners(){
    this.ownersQueryRef = this.apollo.watchQuery({
      query: GET_OWNERS
    });
    return this.ownersQueryRef.valueChanges;
  }
}
