import React from "react";
import Favorite from "./Favorite";
import Rebit from "./Rebit";
import { Link } from "react-router-dom";
import "./post_index_item.css";

const PostIndexItem = (props) => {
  const reactStringReplace = require('react-string-replace');
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
          <Link className="post-item-link" to={`/user/${post.user._id}`}>
            {post.user && post.user.image ? <div className="post-item-profile-picture" style={{ backgroundImage: `url(${post.user.image})` }}></div> :
            <div className="post-item-profile-picture default-profile-picture"></div>}
          </Link>
          <span className="post-item-fullname post-item-label">{post.user.fullname}</span>
          <span className="post-item-username post-item-label">{` @${post.user.username}`}</span>
          <p className="post-item-body">{body}</p>
          { post.image ?
          <div className="post-item-image-frame">
            <img alt="" className="post-item-image" src={post.image} />
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