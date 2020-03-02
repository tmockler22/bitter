import React, { Component } from "react";
import { Query } from "react-apollo";
import { FETCH_POSTS } from "../../graphql/queries";

const PostIndex = () => {
  return (
    <Query query={FETCH_POSTS}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return (
          <ul>
            {data.posts.map(post => (
              <li key={post._id}>{post.body}</li>
            ))}
          </ul>
        );
      }}
    </Query>
  );
};

export default PostIndex; 