import React from "react";
import { Query } from "react-apollo";
import { FETCH_HASHTAG } from "../../graphql/queries";
import PostIndexItem from '../posts/PostIndexItem';

const HashTagIndex = (props) => {
  debugger; 
  console.log(props);
  let searchTerm = "#" + props.match.params.hashtag
 
  console.log(searchTerm);
  return !searchTerm ? <div></div> : (
    <Query query={FETCH_HASHTAG} variables={{ tag: searchTerm }}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        let posts;
        console.log(data);
        posts = data.tag.posts;
        console.log(data);
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