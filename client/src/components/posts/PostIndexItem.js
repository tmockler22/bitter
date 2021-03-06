import React from "react";
import Favorite from "./Favorite";
import Rebit from "./Rebit";
import { Link } from "react-router-dom";
import "./post_index_item.css";

const PostIndexItem = (props) => {
  const reactStringReplace = require('react-string-replace');
  let currentUser = props.currentUser
  let currentUserId = props.currentUserId
  let post = props.post; 
  let params = props.params; 
  let userId = props.userId; 
  let body = post.original ? post.original.body : post.body;
  let tags = post.original ? post.original.tags : post.tags; 
  
  if (tags) {
  for (let index = 0; index < tags.length; index++) {
    const tag = tags[index];
    const link = tag.slice(1);
    body = reactStringReplace(body, tag, (match, i) => (
      <Link to={`/hashtag/${link}`} key={post._id + tag} style={{ color: "#61dafb"}}>{match}</Link>
    ));
    }
  } 
  if (post.original) {
    let original = post.original
    original._id = original._id.split(" ")[0]

    return (
      <div className="post-item-container">
        <Link className="post-item-link" to={`/user/${post.user._id}`}>
          <div className="post-item-rebitted-by">
          <i className="post-rebit-icon fa fa-retweet"></i>
          <span>Rebitted by {`${post.user.username}`}</span>
          </div>
        </Link>
        <Link className="post-item-link" to={`/user/${original.user._id}`}>
          {
          original.user && original.user.image ? 
            <div className="post-item-profile-picture" style={{ backgroundImage: `url(${original.user.image})` }}></div> :
            <div className="post-item-profile-picture default-profile-picture"></div>
            }
        </Link>
        <Link className="post-item-link" to={`/user/${original.user._id}`}>
          <span className="post-item-fullname post-item-label">{original.user.fullname}</span>
          <span className="post-item-username post-item-label">{` @${original.user.username}`}</span>
        </Link>
        <p className="post-item-body">{body}</p>
        {original.image ?
          <div className="post-item-image-frame">
            <img alt="" className="post-item-image" src={original.image} />
          </div> : null
        }
        <div className="post-item-buttons">
          <Rebit post={post} params={params} userId={post.user._id} currentUser={currentUser} currentUserId={currentUserId}/>
          <Favorite post={original} params={params} userId={original.user._id} />
        </div>
      </div>
    )
  } else {
    post._id = post._id.split(" ")[0]
    return (
          <div className="post-item-container">
            <Link className="post-item-link" to={`/user/${post.user._id}`}>
              {post.user && post.user.image ? <div className="post-item-profile-picture" style={{ backgroundImage: `url(${post.user.image})` }}></div> :
              <div className="post-item-profile-picture default-profile-picture"></div>}
            </Link>
            <Link className="post-item-link" to={`/user/${post.user._id}`}>
              <span className="post-item-fullname post-item-label">{post.user.fullname}</span>
              <span className="post-item-username post-item-label">{` @${post.user.username}`}</span>
            </Link>
            <p className="post-item-body">{body}</p>
            { post.image ?
            <div className="post-item-image-frame">
              <img alt="" className="post-item-image" src={post.image} />
            </div> : null
            }
            <div className="post-item-buttons">
              <Rebit post={post} params={params} userId={userId} currentUser={currentUser} currentUserId={currentUserId} />
              <Favorite post={post} params={params} userId={userId}/>
            </div>
          </div>
      )
    }
}
           
export default PostIndexItem; 