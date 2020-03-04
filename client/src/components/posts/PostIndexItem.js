import React, { Component } from "react";
import { Query } from "react-apollo";
import { FETCH_USER } from "../../graphql/queries";
import { currentUser } from "../../util/util";

const PostIndexItem = (props) => {
  let post = props.post; 
  return (
        <div>
          <p>{post.body}</p>
          <img src={post.image} />
        </div>
    )
}
           
export default PostIndexItem; 