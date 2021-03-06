import React from "react";
import { Query } from "react-apollo";
import { FETCH_HASHTAG } from "../../graphql/queries";
import PostIndex from '../posts/PostIndex';
import "./hashtag.css";

const HashTagIndex = (props) => {

  let searchTerm = "#" + props.match.params.hashtag
  return !searchTerm ? <div></div> : (
    <Query query={FETCH_HASHTAG} variables={{ tag: searchTerm }}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) window.location.reload();
        let posts;
        posts = data.tag.posts;
        return (
          <div className="profile-container">
            <div className="hashtag-header">
              <div className="profile-title">{searchTerm}</div>
            </div>
            <div className="post-index-container">
              <PostIndex params={props} posts={posts} hashTag={true}/>
            </div>
          </div>
        );
      }}
    </Query>
  );
};
export default HashTagIndex;