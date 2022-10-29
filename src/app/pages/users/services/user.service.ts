import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { DELETE_USER, GET_USERS } from '../user.gql.ts/user.gql';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersQueryRef: QueryRef<any>;
  constructor(
    private apollo: Apollo
  ) { }

  getUsers(){
    this.usersQueryRef = this.apollo.watchQuery({
      query: GET_USERS
    });
    return this.usersQueryRef.valueChanges;
  }

  deleteUser(id: string){
    return this.apollo.mutate({
      mutation: DELETE_USER,
      variables: {
        id
      }
    });
  }
}
