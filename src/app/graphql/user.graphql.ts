import { gql } from "apollo-angular";

export const INSERT_USER = gql`
mutation InsertUser($user: user_insert_input!){
    insert_user_one(object: $user){
      id
    }
}`;

export const INSERT_OWNER = gql`
mutation InsertUser($user: vehicle_owner_insert_input!){
    insert_vehicle_owner_one(object: $user){
      id
    }
}`;