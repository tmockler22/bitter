import React, { Component } from "react";
import { Query } from "react-apollo";
import { FETCH_USER } from "../../graphql/queries";
import { currentUser } from "../../util/util";
import PostIndexItem from './PostIndexItem';

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
          <div>
            {posts.map(post => <PostIndexItem key={post._id} post={post} />  )}
          </div>
          );
        }}
      </Query>
    );
  };

export default PostIndex; 

