import gql from "graphql-tag";

export const FETCH_POSTS = gql`
  {
    posts {
      _id
      body
      image
      favorites {
        _id
      }
    }
  }
`;

export const FETCH_POST = gql`
  query FetchPost($id: ID!) {
    post(_id: $id) {
      _id
      body
      favorites {
        _id
      }
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
      favorited_posts {
        _id
      }
      posts {
          _id 
          body
          image
          favorites {
            _id
          }
        }
        follows {
          _id
          posts {
            _id
            body
            favorites {
              _id
            }
          }
        }
    }
  }
`;