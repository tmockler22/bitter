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
    user(id: $id) {
      id
      username
      fullname
      email
      bio
      image
    }
  }
`;