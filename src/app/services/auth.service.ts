import { Injectable } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';
import { User } from '../models/user.model';
import { INSERT_OWNER, INSERT_USER } from '../graphql/user.graphql';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  constructor(private apollo: Apollo) { }

  signup(signupForm: FormGroup){
    return Auth.signUp({
      username: signupForm.controls["username"].value,
      password: signupForm.controls["password"].value,
      attributes: {
        email: signupForm.controls["email"].value
      }
    })
  }

  updateUser(id: string, data: any){
    const user = data;
    const owner = data;
    return this.apollo.mutate({
      mutation: gql`
      mutation UpdateUser($id: uuid!, $user: user_set_input, $owner: vehicle_owner_set_input){
        update_user_by_pk(pk_columns: {id: $id}, _set: $user){
          id
        }
        update_vehicle_owner_by_pk(pk_columns: {id: $id}, _set: $owner){
          id
        }
      }`,
      variables: {
        id,
        user,
        owner
      }
    });
  }

  createUser(user: User){
    if(user.role === 'parent'){
      return this.apollo.mutate({
        mutation: INSERT_USER,
        variables: {
          user
        }
      })
    }
    return this.apollo.mutate({
      mutation: INSERT_OWNER,
      variables: {
        user
      }
    })
  }

  verify(signupForm: FormGroup, verificationForm: FormGroup){
  
    return Auth.confirmSignUp(signupForm.controls["username"].value, signupForm.controls["vcode"].value)
  }

  sigin(signinForm: FormGroup): Promise<CognitoUser>{
    return Auth.signIn(signinForm.controls["username"].value, signinForm.controls["password"].value)
  }
}
