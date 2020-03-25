import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { REBIT, UNREBIT } from "../../graphql/mutations";
import { currentUser } from "../../util/util";
import { FETCH_USER } from "../../graphql/queries";
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
    this.addRebit = this.addRebit.bind(this);
  }

  updateCache(cache, { data }) {
    window.location.reload()
  }

  addRebit() {
    this.state.post.rebits.push(this.state.currentUser)
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
                this.addRebit();
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