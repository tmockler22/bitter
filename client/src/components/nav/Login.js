import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { LOGIN_USER } from "../../graphql/mutations";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    client.writeData({
      data: { isLoggedIn: data.login.loggedIn }
    });
  }

  render() {
    return (
      <Mutation
        mutation={LOGIN_USER}
        onCompleted={data => {
          const { token, _id, email, username, fullname, bio, image } = data.login;
          localStorage.setItem("auth-token", token);
          localStorage.setItem("user", JSON.stringify({ id: _id, email: email, fullname: fullname, username: username, bio: bio, image: image }));
          localStorage.setItem("modal", "")
          this.props.history.push("/home")
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {loginUser => (
          <div className="session-container">
            <form
              className="session-form login-form"
              onSubmit={e => {
                e.preventDefault();
                loginUser({
                  variables: {
                    email: this.state.email,
                    password: this.state.password
                  }
                });
              }}
            >
              <div className="session-bitter-frog"></div>
              <div className="session-title">Log in to Bitter</div>
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
                  value={this.state.password}
                  onChange={this.update("password")}
                  type="password"
                />
                <label className="session-label">Password</label>
              </div>
              <button className="session-submit" type="submit">Log In</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Login;