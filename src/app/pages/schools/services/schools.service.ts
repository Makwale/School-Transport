import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { GET_SCHOOLS } from '../graphql/schools.qraphql';

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {
  schoolsQueryRef: QueryRef<any>;
  constructor(private apollo: Apollo) { }
  getSchools(){
    this.schoolsQueryRef = this.apollo.watchQuery({
      query: GET_SCHOOLS
    });
    return this.schoolsQueryRef.valueChanges;
  }
}
