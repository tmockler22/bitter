import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { REGISTER_USER } from "../../graphql/mutations";

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
          const { token, email, _id } = data.register;
          localStorage.setItem("auth-token", token);
          localStorage.setItem("user", JSON.stringify({ id: _id, email: email }));
          this.props.history.push("/");
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {registerUser => (
          <div>
            <form
              onSubmit={e => {
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
              <input
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email"
              />
              <input
                value={this.state.username}
                onChange={this.update("username")}
                placeholder="Username"
              />
              <input
                value={this.state.fullname}
                onChange={this.update("fullname")}
                placeholder="Name"
              />
              <input
                value={this.state.password}
                onChange={this.update("password")}
                type="password"
                placeholder="Password"
              />
              <button type="submit">Sign Up</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Register;