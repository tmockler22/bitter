import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      loggedIn
    }
  }
`;
<<<<<<< Updated upstream

export const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!, $fullname: String!, $username: String!) {
    register(email: $email, password: $password, fullname: $fullname, username: $username) {
      token
      loggedIn
    }
  }
`;

=======
>>>>>>> Stashed changes
export const VERIFY_USER = gql`
  mutation VerifyUser($token: String!) {
    verifyUser(token: $token) {
      loggedIn
    }
  }
`;

<<<<<<< Updated upstream
export const CREATE_POST = gql`
  mutation CreatePost($body: String!, $user: ID!) {
    newPost(body: $body, user: $user) {
      body
      _id
    }
  }
`;
=======
export const UPDATE_USER = gql`
  mutation UpdateUser($username: String!, $fullname: String!, $email: String!, $bio: String!, image: Upload!){
    updateUser(username: $username, fullname: $fullname, email: $email, bio: $bio, image: $image){
      id
      username
      fullname
      bio
      email
      image
    }
  }
`
>>>>>>> Stashed changes
