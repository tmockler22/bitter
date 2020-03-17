import React, { Component } from "react";
import Modal from "../modal/modal"
import { Mutation } from "react-apollo";
import { LOGIN_USER } from "../../graphql/mutations";
import "./splash.css"

class Login extends Component {

  componentWillMount() {
    localStorage.setItem("modal", "")
  }

  setModal(modal) {
    localStorage.setItem("modal", `${modal}`)
    this.forceUpdate()
  }

  updateCache(client, { data }) {
    client.writeData({
      data: { isLoggedIn: data.login.loggedIn }
    });
  }

  render() {
    let modal = localStorage.getItem("modal")
    return (
      <div className="splash-main">
        {modal ? <Modal history={this.props.history} modal={modal}/> : null}
        <div className="splash-left left-splash-bitter-frog">
          <div className="splash-left-textbox">
            <div className="splash-left-text"><i className="fa fa-search" aria-hidden="true"></i>Follow your interests.</div>
            <div className="splash-left-text"><i className="fa fa-users" aria-hidden="true"></i>Hear what people are talking about.</div>
            <div className="splash-left-text"><i className="fa fa-comment" aria-hidden="true"></i>Join the conversation.</div>
          </div>
        </div>
        <div className="splash-right">
          <div className="session-bitter-frog splash-bitter-frog"></div>
          <div className="splash-right-header">See what’s happening in the world right now</div>
          <div className="splash-right-text">Join Bitter today.</div>
          <div className="splash-button sign-up" onClick={() => { this.setModal("register")}}>Sign up</div>
          <div className="splash-button sign-up" onClick={() => {this.setModal("login")}}>Log in</div>
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
          <form
            onSubmit={e => {
              e.preventDefault();
              loginUser({
                variables: {
                  email: "BitterFrog@Bitter.com",
                  password: "hello123"
                }
              });
            }}
          >
                <button className="splash-button log-in" type="submit">Demo Log In</button>
          </form>
            )}
          </Mutation>
        </div>
      </div>
    )
  }
}

export default Login;