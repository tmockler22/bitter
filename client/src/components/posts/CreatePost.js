import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { CREATE_POST } from "../../graphql/mutations";
import { FETCH_USER } from "../../graphql/queries";
import { currentUser } from "../../util/util"

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      body: "",
      photoFile: null,
      photoUrl: null
    };
  }

  handleFile(event) {
    const file = event.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ photoFile: file, photoUrl: fileReader.result });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(cache, { data }) {
    const currentUserId = currentUser().id;
    let user;
    try {
      user = cache.readQuery({
        query: FETCH_USER,
        variables: { id: currentUserId }
      });
    } catch {
      return;
    }
    if (user) {
      let postArray = user.user.posts;
      let newPost = data.newPost;
      newPost.user = currentUser().id;

      let newObj = Object.assign({}, user.user);
      newObj["posts"] = newObj["posts"].concat(newPost);

      cache.writeQuery({
        query: FETCH_USER,
        variables: { id: currentUserId },
        data: { user: newObj}
      });
    }
  }

  handleSubmit(e, newPost) {
    let user = currentUser();
    e.preventDefault();
    newPost({
      variables: {
        image: this.state.photoFile,
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
          const { body, image} = data.newPost;
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
              <input
                type="file"
                onChange={this.handleFile.bind(this)}
              />
              <button type="submit">Ribet</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreatePost;