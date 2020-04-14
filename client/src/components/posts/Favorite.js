import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { FAVORITE, UNFAVORITE} from "../../graphql/mutations";
import { Query } from "react-apollo";
import { currentUser } from "../../util/util";
import { FETCH_USER } from "../../graphql/queries";
import merge from 'lodash.merge';

class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: currentUser().id,
      postId: props.post._id
    }
    this.hasFavorited = this.hasFavorited.bind(this);
  }

  updateCache(cache, { data }) {
    let currentUserId = this.props.userId;
    let userId = this.state.userId;
    let user; 

    try {
      user = cache.readQuery({ query: FETCH_USER, variables: { id: currentUserId } });
    } catch {
      user = cache.readQuery({ query: FETCH_USER, variables: { id: userId } });
    }
  
    let newObj = merge({}, user.user);
    let newPost; 
    let posts = newObj["posts"];
    posts = posts.concat(newObj.rebited_posts)

    if (user && data.favorite) {
      for (let index = 0; index < posts.length; index++) {
        const post = posts[index];
        if (post._id === this.state.postId) {
          post["favorites"] = post["favorites"].concat(data.favorite)
          newPost = post;
          newObj["posts"][index] = newPost
        }
        if (post.original && post.original._id === this.state.postId) {
          post.original["favorites"] = post.original["favorites"].concat(data.favorite)
          newPost = post.original;
          newObj.rebited_posts[index - newObj.posts.length].original = newPost
        }
      }     
    } else if (user && data.unfavorite) {
      for (let index = 0; index < posts.length; index++) {
        const post = posts[index];
        if (post._id === this.state.postId) {
          post["favorites"] = post["favorites"].filter(fav => fav._id !== this.state.userId);
          newPost = post;
          newObj["posts"][index] = newPost
        }
        if (post.original && post.original._id === this.state.postId) {
          post.original.favorites = post.original.favorites.filter(fav => fav._id !== this.state.userId);
          newPost = post.original;
          newObj.rebited_posts[index - newObj.posts.length].original = newPost
        }
      }
    }
    cache.writeQuery({
      query: FETCH_USER,
      variables: { id: currentUserId },
      data: { user: newObj }
    });
  }

  hasFavorited() {
    for (let index = 0; index < this.props.post.favorites.length; index++) {
      const userFavoriteId = this.props.post.favorites[index]._id;
       
      if (this.state.userId === userFavoriteId) {
        return (<Mutation
          mutation={UNFAVORITE}
          onCompleted={data => {
          }}
          update={(client, data) => this.updateCache(client, data)}
        >
          {unfavorite => (
            <div
              className="unfavorite"
              onClick={e => {
                e.preventDefault();
                unfavorite({
                  variables: {
                    userId: this.state.userId,
                    postId: this.state.postId
                  }
                });
              }}
            ><i className="unfavorite-icon fas fa-heart"></i><span className="favorite-count-active">{this.props.post.favorites.length}</span></div>
          )}
        </Mutation>
        );
      }
    }
    return (<Mutation
      mutation={FAVORITE}
      onCompleted={data => {
      }}
      update={(client, data) => this.updateCache(client, data)}
    >
      {favorite => (
        <div>
          <div
            className="favorite"
            onClick={e => {
              e.preventDefault();
              favorite({
                variables: {
                  userId: this.state.userId,
                  postId: this.state.postId
                }
              });
            }}
          ><i className="favorite-icon far fa-heart"></i><span className="favorite-count">{this.props.post.favorites.length}</span></div>
        </div>
      )}
    </Mutation>
    );
  }



  render() {
    return <div>{this.hasFavorited()}</div>
  }
}

export default Favorite;