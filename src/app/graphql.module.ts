import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { HttpHeaders } from '@angular/common/http';

const uri = 'https://parkspot.hasura.app/v1/graphql'; // <-- add the URL of the GraphQL server here

const headers = new HttpHeaders().set('x-hasura-admin-secret', '1bk36uR1bp53Bcl1Ez0E5d7zXvYzmJV7dN1w6sSOONF5KMYMFyRdUBqRBAibxDx8')
// const headers = new HttpHeaders().set('Authorization',
// `Bearer ${localStorage.getItem('token')}`) 


export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {


  const http = httpLink.create({
    uri,
    headers,
  });

  const httpGuest = httpLink.create({
    uri,
    headers
  });


  return {
    link: localStorage.getItem('token') ? http : httpGuest,
    cache: new InMemoryCache(),

  };
}


@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {

}
