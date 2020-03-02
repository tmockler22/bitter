import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { CREATE_POST } from "../../graphql/mutations";
import { FETCH_POSTS } from "../../graphql/queries";
import { currentUser } from "../../util/util"

class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      body: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(cache, { data }) {
    let posts;
    try {
      posts = cache.readQuery({ query: FETCH_POSTS });
    } catch (err) {
      return;
    }
    
    if (posts) {
      let postArray = posts.posts;
      let newPost = data.newPost;
      cache.writeQuery({
        query: FETCH_POSTS,
        data: { posts: postArray.concat(newPost) }
      });
    }
  }

  handleSubmit(e, newPost) {
    debugger;
    let user = currentUser();  
    e.preventDefault();
    newPost({
      variables: {
        body: this.state.body,
        user: user.id
      }
    });
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_POST}
        onError={err => this.setState({ message: err.message })}
        update={(cache, data) => this.updateCache(cache, data)}
        onCompleted={data => {
          const { body } = data.newPost;
          this.setState({
            message: body
          });
        }}
      >
        {(newPost, { data }) => (
          <div>
            <form onSubmit={e => this.handleSubmit(e, newPost)}>
              <textarea
                onChange={this.update("body")}
                value={this.state.body}
                placeholder="What's up?"
              />
              <button type="submit">Ribet</button>
            </form>
            <p>{this.state.message}</p>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreatePost;