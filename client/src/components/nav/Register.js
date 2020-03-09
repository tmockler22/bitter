import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { REGISTER_USER } from "../../graphql/mutations";
import "./session.css"

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      fullname: "",
      username: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    client.writeData({
      data: { isLoggedIn: data.register.loggedIn }
    });
  }

  render() {
    return (
      <Mutation
        mutation={REGISTER_USER}
        onCompleted={data => {
          const { token, _id, email, username, fullname, bio, image } = data.register;
          localStorage.setItem("auth-token", token);
          localStorage.setItem("user", JSON.stringify({ id: _id, email: email, fullname: fullname, username: username, bio: bio, image: image }));
          this.props.history.push("/home");
          localStorage.setItem("modal", "")
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {registerUser => (
          <div className="session-container">
            <form
              className="session-form"
              onSubmit={e => {
                localStorage.setItem("modal", "")
                e.preventDefault();
                registerUser({
                  variables: {
                    email: this.state.email,
                    password: this.state.password,
                    username: this.state.username,
                    fullname: this.state.fullname
                  }
                });
              }}
              >
              <div className="session-form-container">
                <div className="session-bitter-frog"></div>
                <div className="session-title">Create your account</div>
                <div className="session-field">
                  <input
                    className="session-input"
                    value={this.state.email}
                    onChange={this.update("email")}
                  />
                  <label className="session-label">Email</label>
                </div>
                <div className="session-field">
                  <input
                    className="session-input"
                    value={this.state.username}
                    onChange={this.update("username")}
                  />
                  <label className="session-label">Username</label>
                </div>
                <div className="session-field">
                  <input
                    className="session-input"
                    value={this.state.fullname}
                    onChange={this.update("fullname")}
                  />
                  <label className="session-label">Name</label>
                </div>
                <div className="session-field">
                  <input
                    className="session-input"
                    value={this.state.password}
                    onChange={this.update("password")}
                    type="password"
                  />
                  <label className="session-label">Password</label>
                </div>
                <button type="submit" className="session-submit">Sign Up</button>
              </div>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Register;