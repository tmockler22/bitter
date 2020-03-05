import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { FAVORITE, UNFAVORITE} from "../../graphql/mutations";
import { currentUser } from "../../util/util";
import { FETCH_USER, FETCH_POST } from "../../graphql/queries";
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
    const currentUserId = this.props.userId;
    let user; 

    try {
      user = cache.readQuery({ query: FETCH_USER, variables: { id: currentUserId } });
    } catch {
      return;
    }

    if (user && data.favorite) {
      
      let newObj = merge({}, user.user);
      
      let newPost; 
      let posts = newObj["posts"];
      for (let index = 0; index < posts.length; index++) {
        const el = posts[index];
        if (el._id === this.state.postId) {
         // const newArray = []
          el["favorites"] = el["favorites"].concat(data.favorite)
          newPost = el;
          newObj["posts"][index] = newPost
        }
      }
      cache.writeQuery({
        query: FETCH_USER,
        variables: { id: currentUserId },
        data: { user: newObj }
      });
     
    } // else if (user && data.unfollow) {
    //   let newUnfollow = data.unfollow;
    //   let newObj = Object.assign({}, user.user);
    //   let currentFollow = Object.values(user.user.follows);

    //   for (let i = 0; i < currentFollow.length; i++) {
    //     const el = currentFollow[i];
    //     if (el._id === newUnfollow._id) {
    //       currentFollow.splice(i, 1);
    //     }
    //   }

      // newObj["follows"] = currentFollow;

      // cache.writeQuery({
      //   query: FETCH_USER,
      //   variables: { id: currentUserId },
      //   data: { user: newObj }
      // });
    //}
  }

  hasFavorited() {
    for (let index = 0; index < this.props.post.favorites.length; index++) {
      const userFavoriteId = this.props.post.favorites[index]._id;
       
      if (this.state.userId === userFavoriteId) {
        return (<Mutation
          mutation={UNFAVORITE}
          onCompleted={data => {
            if (data.unfavorite) {
              const { id } = data.unfavorite;
            }
          }}
          update={(client, data) => this.updateCache(client, data)}
        >
          {unfavorite => (
            <button
              onClick={e => {
                e.preventDefault();
                unfavorite({
                  variables: {
                    userId: this.state.userId,
                    postId: this.state.postId
                  }
                });
              }}
            >Unfavorite</button>
          )}
        </Mutation>
        );
      }
    }
    return (<Mutation
      mutation={FAVORITE}
      onCompleted={data => {
        if (data.favorite) {
          const { id } = data.favorite;
        }
      }}
      update={(client, data) => this.updateCache(client, data)}
    >
      {favorite => (
        <div>
          <button
            onClick={e => {
              e.preventDefault();
              favorite({
                variables: {
                  userId: this.state.userId,
                  postId: this.state.postId
                }
              });
            }}
          >Favorite</button>
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