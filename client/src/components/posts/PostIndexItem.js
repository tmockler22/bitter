import React, { Component } from "react";
import Favorite from "./Favorite";
import Rebit from "./Rebit"
import "./post_index_item.css"

const PostIndexItem = (props) => {
  let post = props.post; 
  let params = props.params; 
  let userId = props.userId; 
  return (
        <div className="post-item-container">
          {post.user && post.user.image ? <div className="post-item-profile-picture" style={{ backgroundImage: `url(${post.user.image})` }}></div> :
          <div className="post-item-profile-picture default-profile-picture"></div>}
          <span className="post-item-fullname post-item-label">{post.user.fullname}</span>
          <span className="post-item-username post-item-label">{` @${post.user.username}`}</span>
          <p className="post-item-body">{post.body}</p>
          { post.image ?
          <div className="post-item-image-frame">
            <img className="post-item-image" src={post.image} />
          </div> : null
          }
          <div className="post-item-buttons">
            <Rebit  post={post} params={params} userId={userId} />
            <Favorite post={post} params={params} userId={userId}/>
          </div>
        </div>
    )
}
           
export default PostIndexItem; 