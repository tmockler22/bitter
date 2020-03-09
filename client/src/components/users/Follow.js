import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { FOLLOW_USER, UNFOLLOW_USER } from "../../graphql/mutations";
import { currentUser } from "../../util/util";
import { FETCH_USER } from "../../graphql/queries";

class Follow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: currentUser().id,
      newFollow: props.params.match.params.id
    }
    this.hasFollowed = this.hasFollowed.bind(this);
  }
 
  updateCache(cache, { data }) {
    const currentUserId = this.state.id;
    let user;
    try {
      user = cache.readQuery({ query: FETCH_USER, variables: { id: currentUserId } });
    } catch {
      return;
    }
     
    if (user && data.follow) {
      let newFollow = data.follow;

      let newObj = Object.assign({}, user.user);
      newObj["follows"] = newObj["follows"].concat(newFollow);
      cache.writeQuery({
        query: FETCH_USER,
        variables: { id: currentUserId },
        data: { user: newObj }
      });
    } else if (user && data.unfollow) {
      let newUnfollow = data.unfollow;
      let newObj = Object.assign({}, user.user);
      let currentFollow = Object.values(user.user.follows); 
  
      for (let i = 0; i < currentFollow.length; i++) {
        const el = currentFollow[i];
        if (el._id === newUnfollow._id) {
          currentFollow.splice(i, 1);
        }
      }
      
      newObj["follows"] = currentFollow;
      
      cache.writeQuery({
        query: FETCH_USER,
        variables: { id: currentUserId },
        data: { user: newObj }
      });
    }
  }
 
  hasFollowed() {
    for (let index = 0; index < this.props.follows.length; index++) {
      const userId = this.props.follows[index]._id;
      if(this.state.newFollow === userId) {
        return (<Mutation
          mutation={UNFOLLOW_USER}
          onCompleted={data => {
            if (data.unfollow) {
              const { id } = data.unfollow;
            }
          }}
          update={(client, data) => this.updateCache(client, data)}
        >
          {unfollowUser => (
              <button
                className="follow-submit"
                onClick={e => {
                  e.preventDefault();
                  unfollowUser({
                    variables: {
                      id: this.state.id,
                      unfollowId: this.state.newFollow
                    }
                  });
                }}
              >Unfollow</button>
          )}
        </Mutation>
        ); 
      }
    }
    return (<Mutation
      mutation={FOLLOW_USER}
      onCompleted={data => {
        if (data.unfollow) {
          const { id } = data.unfollow;
        }
      }}
      update={(client, data) => this.updateCache(client, data)}
    >
      {followUser => (
        <div>
          <button
            className="follow-submit"
            onClick={e => {
              e.preventDefault();
              followUser({
                variables: {
                  id: this.state.id,
                  newFollow: this.state.newFollow
                }
              });
            }}
          >Follow</button>
        </div>
      )}
    </Mutation>
    ); 
  }



  render() {
    return <div>{this.hasFollowed()}</div>
  }
}

export default Follow;