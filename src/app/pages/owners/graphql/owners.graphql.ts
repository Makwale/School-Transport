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