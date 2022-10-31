import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { GET_LEARNERS } from '../graphql/learners.gql';

@Injectable({
  providedIn: 'root'
})
export class LearnersService {
  learnersQueryRef: QueryRef<any>;
  constructor(private apollo: Apollo) { }

  getLearners(){
    this.learnersQueryRef = this.apollo.watchQuery({
      query: GET_LEARNERS,
    });
    return this.learnersQueryRef.valueChanges;
  }
}
