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

export const GET_VEHICLES = gql`
query GetVehicles($id: uuid) {
  vehicle(where: {_and: {owner_id: {_eq: $id}, deleted_at: {_is_null: true}}}) {
    id
    make
    model
    regno
    type
    capacity
    locations{
      id
      latitude
      longitude
    }
    schools: school_transports {
      id: school_id
    }
    driverId: driver_id
  }
  driver(where: {_and: {deleted_at: {_is_null: true}, employer_id: {_eq: $id}}}) {
    id
    name
    surname
  }
  school {
    id
    name
  }
}
`;

export const ADD_VEHICLE = gql`
mutation AddVehicle($vehicle: vehicle_insert_input!){
  insert_vehicle_one(object: $vehicle){
    id
  }
}`;

export const UPDATE_VEHICLE = gql`
mutation UpdateVehicle($id: uuid!, $vehicle: vehicle_set_input!, $schools: [school_transport_insert_input!]!, $location: location_insert_input!) {
  
  delete_school_transport(where: {vehicle_id: {_eq: $id}}) {
    returning {
      id
    }
  }

  delete_location(where: {vehicle_id: {_eq: $id}}) {
    returning {
      id
    }
  }
  
  insert_location_one(object: $location){
    id
  }
  
  update_vehicle_by_pk(pk_columns: {id: $id}, _set: $vehicle) {
    id
  }
  
  insert_school_transport(objects: $schools) {
    returning {
      id
    }
  }
}`;

export const DELETE_VEHICLE = gql`
mutation DeleteVehicle($id: uuid!) {
  update_vehicle_by_pk(pk_columns: {id: $id}, _set: {deleted_at: now}){
		id
  }
}`;
