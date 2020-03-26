import React from "react";
import { Query } from "react-apollo";
import { FETCH_USER } from "../../graphql/queries";
import { currentUser } from "../../util/util";
import PostIndexItem from './PostIndexItem';

const PostIndex = (props) => {
  let currentUserId = currentUser() ? currentUser().id : null; 
  let userId; 
  let homeFeed = false; 
  let hashTag = props.hashTag
  let hashTagPosts = props.posts
  
  props = (props.params) ? props.params : props;
  if (props.match.path === "/user/:id") {
    userId = props.match.params.id
  } else if (hashTag) {
    userId = currentUser() ? currentUser().id : null; 
  } else {
    userId = currentUser() ? currentUser().id : null; 
    homeFeed = true; 
  }

  return !userId ? <div></div> : (
    <Query query={FETCH_USER} variables={{ id: userId }}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        let userPosts; 
        let userRebits; 
        let posts; 
        let follows;  
        let currentUser = data.user

        if (homeFeed) {
          userPosts = data.user.posts; 
          userRebits = data.user.rebited_posts;
          follows = Object.values(data.user.follows);
          for (let index = 0; index < follows.length; index++) {
            const el = follows[index];
            userPosts = userPosts.concat(el.posts);
          } 
          userPosts = userPosts.concat(userRebits)
          posts = userPosts; 
        } else if (hashTag) {
          posts = hashTagPosts; 
        } else {
          posts = data.user.posts.concat(data.user.rebited_posts); 
        };

        let sortedPosts = posts.sort(function (postA, postB) {
          return postB.timestamp - postA.timestamp;
        })

          return (
          <div className="post-index">
            {sortedPosts.map(post => 
            <PostIndexItem 
              key={post._id} 
              userId={userId} 
              post={post} 
              params={props} 
              currentUser={currentUser}
              currentUserId={currentUserId}/>  
                )}
          </div>
          );
        }}
      </Query>
    );
  };
export default PostIndex; 