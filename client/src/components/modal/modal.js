import React, { Component } from "react";
import Login from "../nav/Login"
import Register from "../nav/Register"
import CreatePostModal from "../posts/CreatePostModal";
import "./modal.css"
import EditProfile from "../profile/editProfile"

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
      case 'create-beet':
        this.setState({
          component: (
            <div className="create-post-modal">
                <div className="exit" onClick={this.closeModal}>
                  <i className="fa fa-times"></i>
                <div className=""></div>
              </div>
              
              <CreatePostModal params={this.props.params} user={this.props.user} />
            </div>
          )
        });
        break
      case 'edit-profile':
        this.setState({ 
          component: (
            <div>
              <EditProfile user={this.props.user} />
            </div>) })
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