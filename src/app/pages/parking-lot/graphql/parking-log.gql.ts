import { gql } from "apollo-angular";

export const GET_PARKING_LOT = gql`
query GetParkingLots {
    parkings: parking_lot {
      id
      name
      numberOfSpots: number_parking_spot
      spotsAvailable: number_available_spot
      geo
      pricings
    }
  }
  `;

export const INSERT_PARKING_LOT = gql`
mutation InsertParkingLot($data: parking_lot_insert_input!){
    insert_parking_lot_one(object: $data){
      id
    }
  }`;

export const DELETE_PARKING_LOT = gql`
mutation DeleteParking($id: uuid!) {
    delete_parking_lot_by_pk(id: $id) {
      id
    }
  }
`;

export const UPDATE_PARKING_LOT = gql`
mutation UpdateParkingLot($id: uuid!, $data: parking_lot_set_input) {
  update_parking_lot(where: {id: {_eq: $id}}, _set: $data){
    returning{
      id
    }
  }
}`;
