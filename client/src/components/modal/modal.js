import React, { Component } from "react";
import Login from "../nav/Login"
import Register from "../nav/Register"
import "./modal.css"

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: localStorage.getItem("modal"),
      component: ""
    };
    this.closeModal = this.closeModal.bind(this)
  }

  componentDidMount() {
    this.selectModal()
  }

  componentDidUpdate() {
    if (!this.state.component && localStorage.getItem("modal")) {
      this.setState({ modal: localStorage.getItem("modal") })
      this.selectModal()
    }
  }

  closeModal() {
    localStorage.setItem("modal", "")
    this.setState({ modal: "", component: "" })
    this.forceUpdate()
  }

  selectModal() {
    if (!this.state.modal) return null;
    switch (this.state.modal) {
      case 'register':
        this.setState({ component: <Register history={this.props.history}/>})
        break
      case 'login':
        this.setState({ component: <Login history={this.props.history}/>})
        break
      default:
        return null;
    }
  }

  render() {
    return (
      this.state.modal ? (
        <div className="modal-component">
          <div onClick={this.closeModal} className="modal-background">
          </div>
          {this.state.component}
        </div>
      ) :
      (null)
    )
  }
}

export default Modal;