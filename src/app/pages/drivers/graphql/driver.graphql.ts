import { gql } from "apollo-angular";

export const GET_DRIVERS = gql`
query GetDrivers {
    driver {
      id
      name
      surname
      email
      phone
    }
}`;