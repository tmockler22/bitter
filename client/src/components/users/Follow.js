import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { FOLLOW_USER, UNFOLLOW_USER } from "../../graphql/mutations";
import { currentUser } from "../../util/util";

class Follow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: currentUser().id,
      newFollow: props.params.match.params.id
    }
    this.hasFollowed = this.hasFollowed.bind(this);
  }
 
  // updateCache(client, { data }) {
  //   client.writeData({
  //     data: { isLoggedIn: data.login.loggedIn }
  //   });
  // }
 
  hasFollowed() {
    for (let index = 0; index < this.props.follows.length; index++) {
      const userId = this.props.follows[index]._id;
      if(this.state.newFollow === userId) {
        return (<Mutation
          mutation={UNFOLLOW_USER}
          onCompleted={data => {
            const { id, unfollow } = data.unfollow;
          }}
        // update={(client, data) => this.updateCache(client, data)}
        >
          {unfollowUser => (
              <button
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
        const { id, newFollow } = data.follow;
      }}
    // update={(client, data) => this.updateCache(client, data)}
    >
      {followUser => (
        <div>
          <button
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