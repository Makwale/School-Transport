import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { GET_CHILDREN, INSERT_CHILD } from '../graphql/parent.graphql';

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
    })
  }
}
