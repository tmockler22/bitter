import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { REBIT, UNREBIT } from "../../graphql/mutations";
import { FETCH_USER } from "../../graphql/queries";
import { currentUser } from "../../util/util";
import merge from 'lodash.merge';

class Rebit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      userId: props.currentUserId,
      post: props.post.original ? props.post.original : props.post,
      rebit: props.post.original ? props.post : null,
    }
    this.hasRebited = this.hasRebited.bind(this);
  }

  updateCache(cache, { data }) {
    let userId = this.state.currentUser._id;
    let currentUserId = this.state.userId;
    
    if (data.unRebit && this.state.post.user._id !== userId) {
      userId = this.state.post.user._id
    }
    
    let sameUser = userId === currentUserId;
    let userLoadedFlag = true;
    let user;
    let currentUser;

    try {
      user = cache.readQuery({ query: FETCH_USER, variables: { id: userId } });
    } catch {
      user = cache.readQuery({ query: FETCH_USER, variables: { id: currentUserId } });
      userLoadedFlag = false
    }
    try {
      currentUser = cache.readQuery({ query: FETCH_USER, variables: { id: currentUserId } });
    } catch {
    }
    let currentUserObj = merge({}, currentUser.user);
    let otherUserObj = merge({}, user.user);

    if (user && data.rebit) {
      sameUser ? otherUserObj.rebited_posts.push(data.rebit) : currentUserObj.rebited_posts.push(data.rebit);

      otherUserObj.posts.forEach(post => {
        if (post._id === data.rebit.original._id) {
          post.rebits = data.rebit.original.rebits
        }
      })

    } else if (user && data.unRebit) {
      let rebited_posts = currentUserObj.rebited_posts

      for (let i = 0; i < rebited_posts.length; i++) {
        const rebit = rebited_posts[i];
        if (rebit.original._id === data.unRebit._id) {
          sameUser ? otherUserObj.rebited_posts.splice(i, 1) : currentUserObj.rebited_posts.splice(i, 1);
        }
      }

      let newPost;
      otherUserObj.posts.forEach((post, i) => {
        if (post._id === data.unRebit._id) {
          post.rebits.forEach((user, idx) => {
            if (user._id === currentUserId) {
              newPost = post
              newPost.rebits.splice(idx, 1)
              otherUserObj.posts[i] = newPost
            }
          })
        }
      })
    }

    cache.writeQuery({
      query: FETCH_USER,
      variables: { id: currentUserId },
      data: { user: currentUserObj }
    });
    if (userLoadedFlag) {
      cache.writeQuery({
        query: FETCH_USER,
        variables: { id: userId },
        data: { user: otherUserObj }
      });
    }
  }

  hasRebited() {
    for (let index = 0; index < this.state.post.rebits.length; index++) {
      const userRebitId = this.state.post.rebits[index]._id;
      let rebitId = this.state.rebit ? this.state.rebit._id : null
      if (!rebitId) {
        this.state.currentUser.rebited_posts.forEach(rebit => {
          if (rebit.original._id === this.state.post._id) {
            rebitId = rebit._id
          };
        });
      };

      if (this.state.userId === userRebitId) {
        return (<Mutation
          mutation={UNREBIT}
          onCompleted={data => {
          }}
          update={(client, data) => this.updateCache(client, data)}
        >
          {unRebit => (
            <div
              className="unrebit"
              onClick={e => {
                e.preventDefault();
                unRebit({
                  variables: {
                    userId: this.state.userId,
                    postId: this.state.post._id,
                    rebitId: rebitId
                  }
                });
              }}
            ><i className="unrebit-icon fa fa-retweet"></i><span className="rebit-count-active">{this.state.post.rebits.length}</span></div>
          )}
        </Mutation>
        );
      }
    }
    return (
      <Mutation
        mutation={REBIT}
        onCompleted={data => {
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {rebit => (
          <div>
            <div
              className="rebit"
              onClick={e => {
                e.preventDefault();
                rebit({
                  variables: {
                    user: this.state.userId,
                    original: this.state.post._id
                  }
                });
              }}
            ><i className="rebit-icon fa fa-retweet"></i><span className="rebit-count">{this.state.post.rebits.length}</span></div>
          </div>
        )}
      </Mutation>
    );
  }



  render() {
    return <div>{this.hasRebited()}</div>
  }
}

export default Rebit;