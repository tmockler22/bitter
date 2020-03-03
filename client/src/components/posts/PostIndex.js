import React, { Component } from "react";
import { Query } from "react-apollo";
import { FETCH_USER } from "../../graphql/queries";
import { currentUser } from "../../util/util";


class PostIndex extends Component {
  constructor(props) {
    super(props)

  }
  
  // showPost() {
  //  return <ul>
  //     {data.user.posts.map(post => (
  //     <div>
  //      <li key={post._id}>{post.body}</li>
  //      <img src={post.image}/>
  //      </div>
  //     ))}
  //   </ul>  
  // }
   
  render() {
    const currentUserId = currentUser() ? currentUser().id : null;
    return !currentUserId ? <div></div> : (
      <Query query={FETCH_USER} variables={{ id: currentUserId }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            // <ul>
            //   {data.user.posts.map(post => (
            //     <li key={post._id}>{post.body}</li>
            //     showPostPicture()
            //   ))}
            // </ul>

            <ul>
            {data.user.posts.map(post => (
              <div>
                <li key={post._id}>{post.body}</li>
                <img src={post.image} />
              </div>
            ))}
          </ul>  

            // <div>
            //   {this.showPost()};
            // </div>
            
          );
        }}
      </Query>
    );
  }
};

export default PostIndex; 