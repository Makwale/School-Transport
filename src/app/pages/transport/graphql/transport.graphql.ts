import { gql } from "apollo-angular";

export const GET_TRANSPORTS = gql`
query GetTransport {
    vehicle {
      id
      make
      model
      type
      regno
      capacity
    }
  }
`;