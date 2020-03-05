import React, { Component } from "react";
import { Query, Mutation} from "react-apollo";
import { UPDATE_USER } from '../../graphql/mutations';
import { FETCH_USER } from "../../graphql/queries";
import { currentUser } from "../../util/util";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: currentUser(),
      id: currentUser().id || "",
      username: currentUser().username || "",
      fullname: currentUser().fullname || "",
      email: currentUser().email || "",
      bio: currentUser().bio || "",
      photoFile: "",
      photoUrl: currentUser().image || ""
    };
    this.showProfilePicture = this.showProfilePicture.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  handleEdit(e) {
    e.preventDefault();
    this.setState({ editing: true });
  }

  updateImage(file) {
    this.setState({ image: file });
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  showProfilePicture() {
    if (!this.state.photoUrl) {
      return <div>No profile pic</div>;
    } else {
      return (
        <div>
          <img src={this.state.photoUrl}></img>
        </div>
      );
    }
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

  render() {
    console.dir(this.state.image);
    return (
      <Mutation
        mutation={UPDATE_USER}
        onCompleted={data => {
          const {
            _id,
            email,
            username,
            fullname,
            bio,
            image
          } = data.updateUser;
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: _id,
              email: email,
              fullname: fullname,
              username: username,
              bio: bio,
              image: image
            })
          );
        }}
      >
        {(updateUser, data) => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                updateUser({
                  variables: {
                    id: this.state.id,
                    username: this.state.username,
                    fullname: this.state.fullname,
                    email: this.state.email,
                    bio: this.state.bio,
                    image: this.state.photoFile
                  }
                });
              }}
            >
              <input
                type="text"
                value={this.state.username}
                onChange={this.update("username")}
                className="update-input"
                placeholder="Username"
              />
              <input
                type="text"
                value={this.state.fullname}
                onChange={this.update("fullname")}
                className="update-input"
                placeholder="Full Name"
              />
              <input
                type="text"
                value={this.state.email}
                onChange={this.update("email")}
                className="update-input"
                placeholder="Email"
              />
              <input
                type="text"
                value={this.state.bio}
                onChange={this.update("bio")}
                className="update-input"
                placeholder="Bio"
              />
              <input
                type="file"
                onChange={this.handleFile.bind(this)}
              />
              <input type="submit"></input>
            </form>
            <div>{this.showProfilePicture()};</div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default EditProfile; 