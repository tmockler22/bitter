import React, { Component } from "react";
import Modal from "../modal/modal"
import "./splash.css"

class Login extends Component {

  componentWillMount() {
    localStorage.setItem("modal", "")
  }

  setModal(modal) {
    localStorage.setItem("modal", `${modal}`)
    this.forceUpdate()
  }

  render() {
    let modal = localStorage.getItem("modal")
    return (
      <div className="splash-main">
        {modal ? <Modal history={this.props.history} modal={modal}/> : null}
        <div className="splash-left left-splash-bitter-frog">
          <div className="splash-left-textbox">
            <div className="splash-left-text"><i class="fa fa-search" aria-hidden="true"></i>Follow your interests.</div>
            <div className="splash-left-text"><i class="fa fa-users" aria-hidden="true"></i>Hear what people are talking about.</div>
            <div className="splash-left-text"><i class="fa fa-comment" aria-hidden="true"></i>Join the conversation.</div>
          </div>
        </div>
        <div className="splash-right">
          <div className="session-bitter-frog splash-bitter-frog"></div>
          <div className="splash-right-header">See what’s happening in the world right now</div>
          <div className="splash-right-text">Join Bitter today.</div>
          <div className="splash-button sign-up" onClick={() => { this.setModal("register")}}>Sign up</div>
          <div className="splash-button log-in" onClick={() => {this.setModal("login")}}>Log in</div>
        </div>
      </div>
    )
  }
}

export default Login;