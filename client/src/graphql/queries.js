import gql from "graphql-tag";

export const FETCH_POSTS = gql`
  {
    posts {
      _id
      body
      image
      tags
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

export const FETCH_HASHTAG = gql`
  query FetchHashtag($tag: String!) {
    tag(tag: $tag) {
      _id
      posts {
      _id 
      body
      image
      favorites {
        _id
      }
      rebits{
        _id
      }
    }
    }
  }
`;

export const SEARCH_USERS = gql`
  query SearchUsers($search: String!) {
    searchUsers(searchTerm: $search) {
      _id
      fullname
      username
    }
  }
`;

export const SEARCH_HASHTAGS = gql`
  query SearchTags($search: String!) {
    searchHashtags(searchTerm: $search) {
      _id
      tag
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
      rebited_posts{
        _id
        body
        tags
      }
      posts {
          _id 
          body
          image
          tags
          favorites {
            _id
          }
          rebits{
            _id
          }
        }
        follows {
          _id
          posts {
            _id
            body
            tags
            favorites {
              _id
            }
            rebits{
            _id
          }
          }
        }
    }
  }
`;