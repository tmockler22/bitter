import React, { Component } from "react";
import { Query } from "react-apollo";
import { FETCH_USER } from "../../graphql/queries";
import { currentUser } from "../../util/util";


const PostIndex = (props) => {
  let userId; 
  let homeFeed = false; 
  props = (props.params) ? props.params : props;
  if (props.match.path === "/user/:id") {
    userId = props.match.params.id
  }
  else {
    userId = currentUser() ? currentUser().id : null; 
    homeFeed = true; 
  }
  return !userId ? <div></div> : (
    <Query query={FETCH_USER} variables={{ id: userId }}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        let userPosts; 
        let posts; 
        let follows; 
        let homeFeedContent; 
        if (homeFeed) {
          userPosts = data.user.posts; 
          follows = Object.values(data.user.follows);
          for (let index = 0; index < follows.length; index++) {
            const el = follows[index];
            userPosts = userPosts.concat(el.posts);
          } 
          posts = userPosts; 
        } else {
          posts = data.user.posts; 
        }
        return (
          <ul>
            {posts.map(post => (
              <div>
              <li key={post._id}>{post.body}</li>
              <img src={post.image} />
              </div>
            ))}
          </ul>  
          );
        }}
      </Query>
    );
  };

export default PostIndex; 