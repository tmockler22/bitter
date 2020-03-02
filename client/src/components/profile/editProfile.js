import React, { Component } from "react";
import { Query, Mutation} from "react-apollo";
//import {Mutation} from "react-apollo";
import { UPDATE_USER } from '../../graphql/mutations' 
import { FETCH_USER } from "../../graphql/queries";

class EditProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.id || "",
      username: this.props.username || "",
      fullname: this.props.fullname || "",
      email: this.props.email || "",
      bio: this.props.bio || "",
      image: this.props.image || "",
    }
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

    render() {
    // if we are editing we'll return a Mutation component
    return (
      
      <Mutation mutation={UPDATE_USER}>
        {(updateUser, data) => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                updateUser({
                  variables: 
                  {
                    id: "5e5d7c8c00599c85cd2f2ac2", 
                    username: this.state.username, 
                    fullname: this.state.fullname,
                    email: this.state.email,
                    bio: this.state.bio,
                    image: this.state.image
                    }
                });
              }}
            >
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                className="update-input"
                placeholder="Username" />

              <input type="text"
                value={this.state.fullname}
                onChange={this.update('fullname')}
                className="update-input"
                placeholder="Full Name" />

              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
                className="update-input"
                placeholder="Email" />

              <input type="text"
                value={this.state.bio}
                onChange={this.update('bio')}
                className="update-input"
                placeholder="Bio" />

              <input
                type="file"
                required
                onChange={({
                  target: {
                    validity,
                    files: [file]
                  }
                }) => validity.valid && this.setState({ image: file })}
              />

              <input type="submit"></input>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default EditProfile; 