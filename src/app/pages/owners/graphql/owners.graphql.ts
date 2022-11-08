import { gql } from "apollo-angular";

export const GET_OWNERS = gql`
query GetOwners{
    owners: vehicle_owner{
      id
      name
      surname
      phone
      email
    }  
}`;

export const ADD_DRIVER = gql`
mutation AddDriver($driver: driver_insert_input!){
  insert_driver_one(object: $driver){
    id 
  }
}
`;

export const GET_DRIVERS = gql`
query GetDrivers($id: uuid) {
  driver(where: {_and: {employer_id: {_eq: $id}, deleted_at: {_is_null: true}}}) {
    id
    name
    surname
    email
    phone
  }
}`;

export const DELETE_DRIVER = gql`
mutation DeleteDriver($id: uuid!){
  update_driver_by_pk(pk_columns: {id: $id}, _set: { deleted_at: now}){
    id
  }
}
`;

export const UPDATE_DRIVER = gql`
mutation updateDriver($id: uuid!, $driver: driver_set_input!){
  update_driver_by_pk(pk_columns: {id: $id}, _set: $driver){
    id
  }
}`;
