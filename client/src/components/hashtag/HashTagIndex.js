import React from "react";
import { Query } from "react-apollo";
import { FETCH_HASHTAG } from "../../graphql/queries";
import PostIndexItem from '../posts/PostIndexItem';
import "./hashtag.css";
import Search from "../Search/Search";

const HashTagIndex = (props) => {
  
  let searchTerm = "#" + props.match.params.hashtag
 
  console.log(searchTerm);
  return !searchTerm ? <div></div> : (
    <Query query={FETCH_HASHTAG} variables={{ tag: searchTerm }}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return <div></div>;
        let posts;
        posts = data.tag.posts;
        return (
          <div className="profile-container">
            <div className="profile-header">
              <div className="profile-title">{searchTerm}</div>
            </div>
            <div className="hashtag-index">
              {posts.map(post => <PostIndexItem key={post._id} post={post} params={props} />)}
            </div>
          </div>
        );
      }}
    </Query>
  );
};
export default HashTagIndex;