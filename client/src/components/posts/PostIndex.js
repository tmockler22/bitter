import React, { Component } from "react";
import { Query } from "react-apollo";
import { FETCH_USER } from "../../graphql/queries";
import { currentUser } from "../../util/util";

const PostIndex = (props) => {
  let userId; 

  props = (props.params) ? props.params : props;
  if (props.match.path === "/user/:id") {
    userId = props.match.params.id
  }
  else {
    userId = currentUser() ? currentUser().id : null; 
  }
  return !userId ? <div></div> : (
    <Query query={FETCH_USER} variables={{ id: userId }}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        return (
          <ul>
            {data.user.posts.map(post => (
              <li key={post._id}>{post.body}</li>
            ))}
          </ul>
        );
      }}
    </Query>
  );
};

export default PostIndex; 