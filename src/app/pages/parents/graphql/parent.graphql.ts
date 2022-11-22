import { gql } from "apollo-angular";

export const GET_CHILDREN = gql`
query GetChildren($id: uuid) {
  learner(where: {user_id: {_eq: $id}}) {
    id
    name
    surname
    learnerSchool: learner_schools(where: {status: {_eq: "current_study"}}) {
      grade
      level
      school {
        id
        name
      }
    }
    location {
      streetName: street_name
      suburb
      city
      latitude
      longitude
      postalCode: postal_code
    }
  }
  school(where: {deleted_at: {_is_null: true}}) {
    id
    name
    level: school_level
  }
}`;

  export const INSERT_CHILD = gql`
  mutation InsertChild($child: learner_insert_input!) {
    insert_learner_one(object: $child) {
      id
    }
  }`;

  export const UPDATE_CHILD = gql`
  mutation UpdateChild($id: uuid!, $child: learner_set_input!, $location: location_set_input){
    update_location(where: {learner_id: {_eq: $id}}, _set: $location){
      returning{
        id
      }
    }
    update_learner_by_pk(pk_columns: {id: $id}, _set: $child){
      id
    }
  }
  `;
  