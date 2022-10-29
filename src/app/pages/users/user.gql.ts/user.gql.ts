import { gql } from "apollo-angular";

export const GET_USERS = gql`
query GetUsers {
    users: user(where: {role: {_neq: "admin"}}) {
      id
      name
      surname
      email
    }
  }
`;

export const DELETE_USER = gql`
mutation DeleteUser($id: uuid!) {
  delete_user_by_pk(id: $id){
    id
  }
}`;

