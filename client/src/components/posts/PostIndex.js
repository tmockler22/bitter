import React, { Component } from "react";
import { Query } from "react-apollo";
import { FETCH_USER } from "../../graphql/queries";
import { currentUser } from "../../util/util";



const PostIndex = () => {
  const currentUserId = currentUser() ? currentUser().id : null; 
  return !currentUserId ? <div></div> : (
    <Query query={FETCH_USER} variables={{ id: currentUserId }}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        console.dir(currentUserId);
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