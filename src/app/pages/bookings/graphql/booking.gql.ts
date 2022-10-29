import { gql } from "apollo-angular";

export const GET_BOOKINGS = gql`
query GetBookings {
    bookings: booking {
      id
      creationDate: created_at
      user {
        name
        surname
      }
      amount
      duration
      parkingLot: parking_lot {
        name
    }
    }
  }
`;