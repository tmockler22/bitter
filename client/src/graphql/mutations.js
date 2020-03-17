import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      loggedIn
      _id
      email
      fullname
      username
      bio
      image
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!, $fullname: String!, $username: String!) {
    register(email: $email, password: $password, fullname: $fullname, username: $username) {
      token
      loggedIn
      _id
      email
      fullname
      username
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
  mutation CreatePost($body: String!, $user: ID!, $image: Upload, $tags: [String]) {
    newPost(body: $body, user: $user, image: $image, tags: $tags) {
      body
      _id
      tags
      timestamp
      image
      user {
        _id
        username 
        fullname
        image
      }
      favorites {
        _id
      }
      rebits {
        _id
      }
    }
  }
`;


export const FOLLOW_USER = gql`
  mutation FollowUser($id: ID!, $newFollow: ID!) {
    follow(id: $id, newFollow: $newFollow) {
      _id
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation UnfollowUser($id: ID!, $unfollowId: ID!) {
    unfollow(id: $id, unfollowId: $unfollowId) {
      _id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $username: String!, $fullname: String!, $email: String!, $bio: String!, $image: Upload, $cover_image: Upload){
    updateUser(id: $id, username: $username, fullname: $fullname, email: $email, bio: $bio, image: $image, cover_image: $cover_image){
      _id
      username
      fullname
      bio
      email
      image
      cover_image
    }
  }
`;


export const FAVORITE = gql`
  mutation Favorite($userId: ID!, $postId: ID!){
    favorite(userId: $userId, postId: $postId){
      _id
    }
  }
`;


export const UNFAVORITE = gql`
  mutation Unfavorite($userId: ID!, $postId: ID!){
    unfavorite(userId: $userId, postId: $postId){
      _id
    }
  }
`;


export const REBIT = gql`
  mutation Rebit($userId: ID!, $postId: ID!){
    rebit(userId: $userId, postId: $postId){
      _id
    }
  }
`;



export const UNREBIT = gql`
  mutation UnRebit($userId: ID!, $postId: ID!){
    unRebit(userId: $userId, postId: $postId){
      _id
    }
  }
`;
