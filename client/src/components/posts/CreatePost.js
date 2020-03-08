import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { CREATE_POST } from "../../graphql/mutations";
import { FETCH_USER } from "../../graphql/queries";
import { currentUser } from "../../util/util";
import "./create_post.css";
import { Link } from "react-router-dom";

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      body: "",
      photoFile: null,
      photoUrl: null, 
      tags: []
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

  update(e, field) {
    e.preventDefault();
    return this.setState({ [field]: e.target.value });
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
    let body = this.state.body.split(" "); 
    for (let index = 0; index < body.length; index++) {
      const el = body[index];
      if (el[0] === "#") {
        let tags = this.state.tags.push(el); 
        this.setState({"tags": tags});
      } 
    }
    let user = currentUser();
    e.preventDefault();
  
    newPost({
      variables: {
        image: this.state.photoFile,
        body: this.state.body,
        user: user.id,
        tags: this.state.tags
      }
    });
    
  }

  render() {
    let user = currentUser()
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
          <div className="create-post-container">
            { user && user.image ? <div className="create-post-profile-picture" style={{ backgroundImage: `url(${user.image})` }}></div> : 
              <div className="create-post-profile-picture default-profile-picture"></div>}
            <form className="create-post-form" onSubmit={e => this.handleSubmit(e, newPost)}>
              <input
                className="create-post-text"
                onChange={(e) => this.update(e, "body")}
                value={this.state.body}
                placeholder="What's up?"
              />
              {this.state.photoUrl ? 
              <div>
                <div className="create-post-cancel-image" onClick={() => {this.setState({ photoUrl: '' })}}><i className="fas fa-times"></i></div>
                <div 
                  className="create-post-image-preview" 
                  style={{ backgroundImage: `url(${this.state.photoUrl})`}}>
                </div> 
              </div>
                : null}
              <div className="create-post-buttons">
                <label><i className=" create-post-label	far fa-image"></i>
                <input
                  type="file"
                  className="hidden"
                  onChange={this.handleFile.bind(this)}
                />
                </label>
                <button className="create-post-submit" type="submit">beet</button>
              </div>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreatePost;