import React, { Component } from "react";
import Favorite from "./Favorite";
import Rebit from "./Rebit";
import { Link } from "react-router-dom";
const reactStringReplace = require('react-string-replace');
import "./post_index_item.css"

const PostIndexItem = (props) => {

  // reactStringReplace('whats your name', 'your', (match, i) => (
  //   <span>{match}</span>
  // ));

  let post = props.post; 
  let params = props.params; 
  let userId = props.userId; 
  let body = post.body;
  let tags = post.tags; 
  
  if (tags) {
  for (let index = 0; index < tags.length; index++) {
    const el = tags[index];
    const link = el.slice(1);
    body = reactStringReplace(body, el, (match, i) => (
      <Link to={`/hashtag/${link}`} key={post._id} style={{ color: "#61dafb"}}>{match}</Link>
    ));
    }
  } 
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