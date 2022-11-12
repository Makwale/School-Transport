import { Injectable } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { subscribe } from 'graphql';
import { AccountService } from './account.service';
import { Storage } from 'aws-amplify';
import { Property } from '../models/property.model';
import { Address } from '../models/address.model';
import swal from "sweetalert2";

const ADD_USER = gql`mutation AddUser($id: String, $firstname: String, $lastname: String, $email: String) {
  user: insert_USER(objects: {id: $id, firstname: $firstname, lastname: $lastname, email: $email}) {
    returning {
      id
      firstname
      lastname
      email
    }
  }
}
`

const GET_USER = gql`
query GetUser($id: uuid!) {
  user: user_by_pk(id: $id) {
    id
    name
    surname
    email
    phone
    role
  }
  owner: vehicle_owner_by_pk(id: $id) {
    id
    name
    surname
    email
    role
    phone
    vehicles {
      capacity
      availableSeats: available_seats
      id
      make
      model
      regno
      type
    }
    drivers {
      id
      name
      surname
      email
      phone
    }
  }
}
`;



const ADD_CLIENT = gql`mutation AddClient($userid: String) {
  client: insert_CLIENT(objects: {userid: $userid}) {
    returning {
      id
      userid
    }
  }
}
`

const ADD_ADDRESS = gql`mutation AddAddress($homeAddress: String, $city: String, $postalCode: Int, $userid: String) {
  address: insert_ADDRESS(objects: {homeAddress: $homeAddress, city: $city, postalCode: $postalCode, userid: $userid}) {
    returning {
      id
      homeAddress
      postalCode
      city
    }
  }
}
`

const ADD_PROPERTY_ADDRESS = gql`mutation AddAddress($homeAddress: String, $city: String, $postalCode: Int) {
  address: insert_PROPERTYADDRESS(objects: {homeAddress: $homeAddress, city: $city, postalCode: $postalCode}) {
    returning {
      id
      homeAddress
      postalCode
      city
    }
  }
}
`

const ADD_PROPERTY = gql`mutation AddProperty($type: String, $price: Int, $desc: String, $clientid: Int, $propertyaddressid: Int) {
  property: insert_PROPERTY(objects: {type: $type, price: $price, desc: $desc, clientid: $clientid, propertyaddressid: $propertyaddressid}) {
    returning {
      id
      type
      price
      desc
      clientid
    }
  }
}
`

const ADD_IMAGE = gql`mutation AddImage($propertyid: Int, $key: String) {
  insert_IMAGE(objects: {key: $key, propertyid: $propertyid}) {
    returning {
      id
      propertyid
      key
    }
  }
}
`

const GET_PROPERTIES_CUSTOMERS = gql`query GetProperties {
  properties: PROPERTY {
    id
    type
    price
    desc
    address: PROPERTYADDRESS {
      homeAddress
      city
      postalCode
    }
    images: IMAGEs {
      key
    }
  }
}
`



const UPDATE_PROPERTY = gql`mutation UpdateProperty($id: Int, $type: String, $price: Int, $desc: String) {
  property: update_PROPERTY(where: {id: {_eq: $id}}, _set: {type: $type, price: $price, desc: $desc}) {
    returning {
      id
      type
      price
      desc
    }
  }
}

`

const UPDATE_ADDRESS = gql`mutation UpadteAddress($id: Int, $homeAddress: String, $city: String, $postalCode: Int) {
  update_PROPERTYADDRESS(where: {id: {_eq: $id}}, _set: {homeAddress: $homeAddress, city: $city, postalCode: $postalCode}) {
    returning {
      homeAddress
      city
      postalCode
    }
  }
}
`

const DELETE_IMAGE = gql`mutation DeleteImage($propertyid: Int) {
  delete_IMAGE(where: {propertyid: {_eq: $propertyid}}) {
    returning {
      key
      id
    }
  }
}
`
const UPDATE_USER = gql`mutation UpdateProfile($id: String, $firstname: String, $lastname: String, $phone: Int) {
  update_USER(where: {id: {_eq: $id}}, _set: {firstname: $firstname, lastname: $lastname, phone: $phone}) {
    returning {
      id
      firstname
      lastname
      phone
    }
  }
}
`

const ADD_USER_ADDRESS = gql`mutation AddUserAddress($userid: String) {
  insert_ADDRESS(objects: {userid: $userid}) {
    returning {
      userid
    }
  }
}
`

const UPDATE_USER_ADDRESS = gql`mutation UpdateAddress($userid: String, $homeAddress: String, $city: String, $postalCode: Int) {
  update_ADDRESS(where: {userid: {_eq: $userid}}, _set: {homeAddress: $homeAddress, city: $city, postalCode: $postalCode}) {
    returning {
      homeAddress
      postalCode
      city
    }
  }
}
`

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  clproperties: Property[] = [];

  clpropertiesQuery: QueryRef<any>;
  userQueryRef: QueryRef<any>;

  constructor(private apollo: Apollo, private acs: AccountService) { }

  addUser(signupForm: FormGroup, id: string) {

    return this.apollo.mutate({
      mutation: ADD_USER,
      variables: {
        id,
        firstname: signupForm.controls["firstname"].value,
        lastname: signupForm.controls["lastname"].value,
        email: signupForm.controls["email"].value
      }
    })


  }

  getUser(id?: string) {
    this.clpropertiesQuery = this.apollo.watchQuery({
      query: GET_USER,
      variables: {
        id
      }
    })

    return this.clpropertiesQuery.valueChanges;
  }


  addClient(id: string) {

    return this.apollo.mutate({
      mutation: ADD_CLIENT,
      variables: {
        userid: id
      }
    })
  }

  addAddress(homeAddress: string, city: string, postalCode: number) {
    return this.apollo.mutate({
      mutation: ADD_PROPERTY_ADDRESS,
      variables: {
        homeAddress,
        city,
        postalCode,
      }
    })
  }

  addProperty(type: string, price: number, desc: string, propertyaddressid: number) {

    return this.apollo.mutate({
      mutation: ADD_PROPERTY,
      variables: {
        type,
        price,
        desc,
        propertyaddressid,
      }
    })
  }

  getPropertiesCustomers() {
    return this.apollo.watchQuery({
      query: GET_PROPERTIES_CUSTOMERS,
    }).valueChanges;
  }


  updateProperty(property: Property, propertFrom: FormGroup) {
    this.updateAddress(property.address, propertFrom).subscribe(res => {

    })
    return this.apollo.mutate({
      mutation: UPDATE_PROPERTY,
      variables: {
        id: property.id,
        type: propertFrom.controls["propertyType"].value,
        price: propertFrom.controls["price"].value,
        desc: propertFrom.controls["desc"].value,

      }
    })
  }

  updateAddress(address: Address, propertFrom: FormGroup) {


    return this.apollo.mutate({
      mutation: UPDATE_ADDRESS,
      variables: {
        id: address.id,
        homeAddress: propertFrom.controls["propertyAddress"].value,
        city: propertFrom.controls["city"].value,
        postalCode: propertFrom.controls["postalCode"].value,

      }
    })
  }

  deleteImage(propertyid: number) {
    return this.apollo.mutate({
      mutation: DELETE_IMAGE,
      variables: {
        propertyid
      }
    })
  }

  setProperty(index: number, property: Property) {
    this.clproperties[index] = property
  }

  updateUser(userForm: FormGroup) {

    this.updateUserAddress(userForm).subscribe(res => {

    })
    return this.apollo.mutate({
      mutation: UPDATE_USER,
      variables: {
        id: this.acs.user.id,
        firstname: userForm.controls["firstname"].value,
        lastname: userForm.controls["lastname"].value,
        phone: Number(userForm.controls["phone"].value)

      }
    })
  }

  addUserAddress(userid: string) {
    return this.apollo.mutate({
      mutation: ADD_USER_ADDRESS,
      variables: {
        userid
      }
    })
  }

  updateUserAddress(userForm: FormGroup) {

    return this.apollo.mutate({
      mutation: UPDATE_USER_ADDRESS,
      variables: {
        userid: this.acs.user.id,
        homeAddress: userForm.controls["homeAddress"].value,
        city: userForm.controls["city"].value,
        postalCode: Number(userForm.controls["postalCode"].value)
      }
    });
  }

}
