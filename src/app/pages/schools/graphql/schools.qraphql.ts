import { gql } from "apollo-angular";

export const GET_SCHOOLS = gql`
query GetSchools {
  school(where: {deleted_at: {_is_null: true}}) {
    id
    name
    level: school_level
    location
    address: school_address {
      streetName: street_name
      suburb
      city
      postalCode: postal_code
    }
  }
}`;

export const INSERT_SCHOOL = gql`
mutation InsertSchool($school: school_insert_input!){
  insert_school_one(object: $school){
    id
  }
}`;

export const DELETE_SCHOOL = gql`
mutation DeleteSchool($id: uuid!){
  update_school_by_pk(pk_columns: {id: $id}, _set: {deleted_at: now}) {
    id
  }
}
`;

export const UPDATE_SCHOOL = gql`
mutation updateSchool($id: uuid!, $school: school_set_input!, $address: school_address_set_input) {
  update_school_by_pk(pk_columns: {id: $id}, _set: $school) {
    id
  }
  update_school_address(where: {school_id: {_eq: $id}}, _set: $address) {
    returning {
      id
    }
  }
}
`;

