import gql from "graphql-tag";

export const FETCH_POSTS = gql`
  {
    posts {
      _id
      body
    }
  }
`;

export const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `;

export const FETCH_USER = gql`
  query FetchUser($id: ID!) {
    user(_id: $id) {
      _id
      username
      fullname
      email
      bio
      image
      posts {
          _id 
          body
        }
    }
  }
`;