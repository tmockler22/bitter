import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { onError } from "apollo-link-error";
import { HashRouter} from "react-router-dom"; 
import { VERIFY_USER } from "./graphql/mutations";
import { createUploadLink } from 'apollo-upload-client';

const token = localStorage.getItem("auth-token");

const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
});

cache.writeData({
  data: {
    isLoggedIn: Boolean(localStorage.getItem("auth-token"))
  }
});


let uri = "http://localhost:5000/graphql"

if (process.env.NODE_ENV === 'production') {
  uri = `https://bitter-graphql.herokuapp.com/graphql`;
}


// make sure we log any additional errors we receive
onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const httpLink = createUploadLink({
  uri,
  headers: {
    authorization: localStorage.getItem("auth-token")
  }
});

const client = new ApolloClient({
  uri,
  link: httpLink,
  cache,
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  }
});

if (token) {
  client
    .mutate({ mutation: VERIFY_USER, variables: { token } })
    .then(({ data }) => {
      cache.writeData({
        data: {
          isLoggedIn: data.verifyUser.loggedIn
        }
      });
    });
}

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <App />
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


