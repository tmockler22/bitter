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
      userId: currentUser().id,
      postId: props.post._id
    }
    this.hasRebited = this.hasRebited.bind(this);
  }

  updateCache(cache, { data }) {
    const currentUserId = this.props.userId;
    let user;

    try {
      user = cache.readQuery({ query: FETCH_USER, variables: { id: currentUserId } });
    } catch {
      return;
    }

    if (user && data.rebit) {

      let newObj = merge({}, user.user);

      let newPost;
      let posts = newObj["posts"];
      for (let index = 0; index < posts.length; index++) {
        const el = posts[index];
        if (el._id === this.state.postId) {
          // const newArray = []
          el["rebits"] = el["rebits"].concat(data.rebit)
          newPost = el;
          newObj["posts"][index] = newPost
        }
      }
      cache.writeQuery({
        query: FETCH_USER,
        variables: { id: currentUserId },
        data: { user: newObj }
      });

    }  else if (user && data.unRebit) {
      let newObj = merge({}, user.user);
      let posts = newObj["posts"]

      for(let i=0; i < posts.length; i++){
        const post = posts[i];
        if(posts[i]._id === this.state.postId){
          post["rebits"] = post["rebits"].splice(i, data.unrebit);
        }
      }


    cache.writeQuery({
      query: FETCH_USER,
      variables: { id: currentUserId },
      data: { user: newObj }
    });
    }
  }

  hasRebited() {
    for (let index = 0; index < this.props.post.rebits.length; index++) {
      const userRebitId = this.props.post.rebits[index]._id;

      if (this.state.userId === userRebitId) {
        return (<Mutation
          mutation={UNREBIT}
          onCompleted={data => {
            // if (data.unrebit) {
            //   const { id } = data.unrebit;
            // }
          }}
          update={(client, data) => this.updateCache(client, data)}
        >
          {unrebit => (
            <div
              className="unrebit"
              onClick={e => {
                e.preventDefault();
                unrebit({
                  variables: {
                    userId: this.state.userId,
                    postId: this.state.postId
                  }
                });
              }}
            ><i className="unrebit-icon fa fa-retweet"></i><span className="rebit-count-active">{this.props.post.rebits.length}</span></div>
          )}
        </Mutation>
        );
      }
    }
    return (<Mutation
      mutation={REBIT}
      onCompleted={data => {
        // if (data.rebit) {
        //   const { id } = data.rebit;
        // }
      }}
      update={(client, data) => this.updateCache(client, data)}
    >
      {rebit=> (
        <div>
          <div
            className="rebit"
            onClick={e => {
              e.preventDefault();
              rebit({
                variables: {
                  userId: this.state.userId,
                  postId: this.state.postId
                }
              });
            }}
          ><i className="rebit-icon fa fa-retweet"></i><span className="rebit-count">{this.props.post.rebits.length}</span></div>
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