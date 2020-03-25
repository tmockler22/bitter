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
          <div>
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


// class PostIndex extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       homeFeed: false,
//       userId: '',
//       userPosts: [],
//       posts: [],
//       follows: [],
//       currentUser: {},
//       hashTagPosts: []
//     }
//   }

//   componentDidMount() {
//   if (this.props.params.match.path === "/user/:id") {
//     this.state.userId = this.props.params.match.params.id
//   } else if (this.props.hashTag) {
//     this.state.userId = currentUser() ? currentUser().id : null
//   } else {
//     this.state.homeFeed = true
//     this.state.userId = currentUser() ? currentUser().id : null
//   }

//   return <Query query={FETCH_USER} variables={{ id: this.state.userId }}>
//       {({ loading, error, data }) => {

//         this.state.currentUser = data.user;
//         if (this.state.homeFeed) {
//           let userPosts = data.user.posts.concat(data.user.rebited_posts)
//           let follows = Object.values(data.user.follows) 

//           for (let i = 0; i < follows.length; i++) {
//             const followedUser = follows[i];
//             userPosts = userPosts.concat(followedUser.posts);
//             userPosts = userPosts.concat(followedUser.rebited_posts);
//           }

//           this.state.posts = userPosts

//         } else if (this.state.hashTag) {
//           this.state.posts = this.state.hashTagPosts
//         } else {
//           this.state.posts = data.user.posts.concat(data.user.rebited_posts)
//         };
//       }}
//     </Query>
//   }

//   componentDidUpdate() {

//   }

//   render() {
//     debugger
//     let sortedPosts = this.state.posts.sort(function (postA, postB) {
//       return postB.timestamp - postA.timestamp;
//     })

//     return (
//       <div>
//         {sortedPosts.map(post => <PostIndexItem key={post._id} userId={this.state.userId} post={post} params={this.props.params} currentUser={this.state.currentUser} />)}
//       </div>
//     );
//   };
// }
// export default PostIndex; 
