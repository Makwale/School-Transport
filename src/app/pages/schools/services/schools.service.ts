import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { DELETE_SCHOOL, GET_SCHOOLS, INSERT_SCHOOL, UPDATE_SCHOOL } from '../graphql/schools.qraphql';

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

  addSchool(school: any){
    return this.apollo.mutate({
      mutation: INSERT_SCHOOL,
      variables: {
        school
      }
    });
  }

  deleteSchool(id: string){
    return this.apollo.mutate({
      mutation: DELETE_SCHOOL,
      variables: {
        id
      }
    });
  }

  updateSchool(id: string, school: any, address){
    return this.apollo.mutate({
      mutation: UPDATE_SCHOOL,
      variables: {
        id,
        school,
        address
      }
    });
  }
}
