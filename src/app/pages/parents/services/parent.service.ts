import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { GET_OWNERS } from '../../owners/graphql/owners.graphql';
import { GET_CHILDREN, INSERT_CHILD, UPDATE_CHILD } from '../graphql/parent.graphql';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  childrenQueryRef: QueryRef<any>;
  constructor(private apollo: Apollo) { }

  getChildren(id: string){
    this.childrenQueryRef = this.apollo.watchQuery({
      query: GET_CHILDREN,
      variables: {
        id
      }
    });
    return this.childrenQueryRef.valueChanges;
  }

  insertChild(child: any){
    return this.apollo.mutate({
      mutation: INSERT_CHILD,
      variables: {
        child
      }
    });
  }
  updateChild(id: string, child: any, school?: any, address?: any){
    return this.apollo.mutate({
      mutation: UPDATE_CHILD,
      variables: {
        id,
        child,
        location: address
      }
    });
  }

  getTransport(){
   
  }
}
