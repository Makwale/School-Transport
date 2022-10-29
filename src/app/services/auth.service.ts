import { Injectable } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';
import { User } from '../models/user.model';

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
    return this.apollo.mutate({
      mutation: gql`mutation UpdateUser($id: uuid, $data: user_set_input){
        update_user(where: { id: { _eq: $id}}, _set: $data){
          returning{
            id
          }
        }
      }`,
      variables: {
        id,
        data
      }
    });
  }

  verify(signupForm: FormGroup, verificationForm: FormGroup){
  
    return Auth.confirmSignUp(signupForm.controls["username"].value, verificationForm.controls["vcode"].value)
  }

  sigin(signinForm: FormGroup): Promise<CognitoUser>{
    return Auth.signIn(signinForm.controls["username"].value, signinForm.controls["password"].value)
  }
}
