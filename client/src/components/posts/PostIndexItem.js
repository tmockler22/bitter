import React, { Component } from "react";
import Favorite from "./Favorite";

const PostIndexItem = (props) => {
  let post = props.post; 
  let params = props.params; 
  let userId = props.userId; 
  return (
        <div>
          <p>{post.body}</p>
          <img src={post.image} />
          <Favorite post={post} params={params} userId={userId}/>
        </div>
    )
}
           
export default PostIndexItem; 