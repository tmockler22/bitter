import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      loggedIn
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!, $fullname: String!, $username: String!) {
    register(email: $email, password: $password, fullname: $fullname, username: $username) {
      token
      loggedIn
    }
  }
`;

export const VERIFY_USER = gql`
  mutation VerifyUser($token: String!) {
    verifyUser(token: $token) {
      loggedIn
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($body: String!, $user: ID!) {
    newPost(body: $body, user: $user) {
      body
      _id
    }
  }
`;
