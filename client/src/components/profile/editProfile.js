import React from "react";
import { Mutation} from "react-apollo";
import { UPDATE_USER } from '../../graphql/mutations';
import { currentUser } from "../../util/util";
import "./edit_profile.css"

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
      photoFile: null,
      photoUrl: this.props.user.image || "",
      coverPhotoFile: null,
      coverPhotoUrl: this.props.user.cover_image || ""
    };
    this.showProfilePicture = this.showProfilePicture.bind(this);
    this.showCoverPicture = this.showCoverPicture.bind(this);
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

  showCoverPicture() {
    if (!this.state.coverPhotoUrl) {
      return <div className="edit-cover-picture edit-cover-image-default" style={{ backgroundImage: `url("./froggy.png")` }}></div>;
    } else {
      return (
        <div className="edit-cover-picture" style={{ backgroundImage: `url("${this.state.coverPhotoUrl}")` }}></div>
      );
    }
  }

  showProfilePicture() {
    if (!this.state.photoUrl) {
      return <div className="edit-profile-picture" style={{ backgroundImage: `url("./light_blue_back_guy.png")`}}></div>;
    } else {
      return (
        <div className="edit-profile-picture" style={{ backgroundImage: `url("${this.state.photoUrl}")` }}></div>
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

  handleCoverFile(event) {
    const file = event.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ coverPhotoFile: file, coverPhotoUrl: fileReader.result });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  render() {
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
            image,
            cover_image,
          } = data.updateUser;
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: _id,
              email: email,
              fullname: fullname,
              username: username,
              bio: bio,
              image: image,
              cover_image: cover_image
            })
          );
          window.location.reload()
        }}
      >
        {(updateUser, data) => (
          <div className="edit-profile-container">
            <form
              className="edit-profile-form"
              onSubmit={e => {
                e.preventDefault();
                updateUser({
                  variables: {
                    id: this.state.id,
                    username: this.state.username,
                    fullname: this.state.fullname,
                    email: this.state.email,
                    bio: this.state.bio,
                    image: this.state.photoFile,
                    cover_image: this.state.coverPhotoFile
                  }
                });
              }}
            >
              <div className="edit-profile-form-container">
                <div className="edit-profile-header">
                  <div className="edit-profile-title">Edit profile</div>
                  <input type="submit" value="Save" className="edit-profile-submit"></input>
                </div>
                <div className="edit-cover-picture-container">{this.showCoverPicture()}
                  <label className="edit-cover-picture-label">
                    <i className="fa fa-camera edit-profile-camera"></i>
                    <input
                      type="file"
                      onChange={this.handleCoverFile.bind(this)}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="edit-profile-picture-container">{this.showProfilePicture()}
                  <label className="edit-profile-picture-label">
                    <i className="fa fa-camera edit-profile-camera"></i>
                    <input
                      type="file"
                      onChange={this.handleFile.bind(this)}
                      className="hidden"
                    />
                  </label>
                  </div>
                <div className="edit-field">
                  <input
                    type="text"
                    value={this.state.username}
                    onChange={this.update("username")}
                    className="edit-input"
                  />
                  <label className="edit-label">Username</label>
                </div>
                <div className="edit-field">
                  <input
                    type="text"
                    value={this.state.fullname}
                    onChange={this.update("fullname")}
                    className="edit-input"
                  />
                  <label className="edit-label">Full Name</label>
                </div>
                <div className="edit-field">
                  <input
                    type="text"
                    value={this.state.email}
                    onChange={this.update("email")}
                    className="edit-input"
                  />
                  <label className="edit-label">Email</label>
                </div>
                <div className="edit-field textarea">
                  <textarea
                    value={this.state.bio}
                    onChange={this.update("bio")}
                    className="edit-input textarea"
                  />
                  <label className="edit-label">Bio</label>
                </div>
              </div>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default EditProfile; 