import React, { Component } from "react";
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
          <div>
            {posts.map(post => <PostIndexItem key={post._id} post={post} params={props} />)}
          </div>
        );
      }}
    </Query>
  );
};
export default HashTagIndex;