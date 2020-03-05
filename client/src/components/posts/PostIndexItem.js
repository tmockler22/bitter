import React, { Component } from "react";
import Favorite from "./Favorite";
import Rebit from "./Rebit"
import "./post_index_item.css"

const PostIndexItem = (props) => {
  let post = props.post; 
  let params = props.params; 
  let userId = props.userId; 
  debugger
  return (
        <div className="post-item-container">
          {post.user && post.user.image ? <div className="post-item-profile-picture" style={{ backgroundImage: `url(${post.user.image})` }}></div> :
          <div className="post-item-profile-picture default-profile-picture"></div>}
          <span className="post-item-fullname">{post.user.fullname}</span>
          <span className="post-item-username">{` @${post.user.username}`}</span>
          <p>{post.body}</p>
          <img src={post.image} />
          <Favorite post={post} params={params} userId={userId}/>
          <Rebit  post={post} params={params} userId={userId} />
        </div>
    )
}
           
export default PostIndexItem; 