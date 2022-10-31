import { gql } from "apollo-angular";

export const GET_SCHOOLS = gql`
query GetSchools{
    school{
      id
      name
      location
      address: school_address{
        streetName: street_name
        suburb
        city
        postalCode: postal_code
      }
    }
}`