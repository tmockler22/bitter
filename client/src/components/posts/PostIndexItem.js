import React, { Component } from "react";
import Favorite from "./Favorite";
import Rebit from "./Rebit";
import { Link } from "react-router-dom";
const reactStringReplace = require('react-string-replace');
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
        <div>
          <p>{body}</p>
          <img src={post.image} />
          <Favorite post={post} params={params} userId={userId}/>
          <Rebit post={post} params={params} userId={userId} />
        </div>
    )
}
           
export default PostIndexItem; 