import React from "react";
import { Query } from "react-apollo";
import { ApolloConsumer } from "react-apollo";
import "./nav.css";
import Modal from "../modal/modal";
import {currentUser} from "../../util/util";
import { FETCH_USER } from "../../graphql/queries";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: currentUser() ? currentUser().id : null,
      photoUrl: null
    };
    this.handleFrogLogoOrHomeLogoClick = this.handleFrogLogoOrHomeLogoClick.bind(this);
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
    this.handleProfileButtonClick = this.handleProfileButtonClick.bind(this);
  }

  componentDidUpdate() {
    if (!this.state.userId && currentUser()) {
      this.setState({
        userId: currentUser().id
      })
    }
  }

  handleFrogLogoOrHomeLogoClick(e) {
    this.props.history.push("/home");
  }

  handleEditButtonClick(e) {
    this.props.history.push(`/editProfile/${this.state.userId}`);
  }

  setModal(modal) {
    localStorage.setItem("modal", `${modal}`);;
    this.forceUpdate()
  }

  handleProfileButtonClick(e) {
    e.preventDefault();
    this.forceUpdate()
    if (this.props.history.location.pathname !== `/user/${this.state.userId}`) {
      this.props.history.push(`/user/${this.state.userId}`);
    }
  }

  render() {
    let modal = localStorage.getItem("modal");
      if (this.state.userId) {
        return (
          <Query query={FETCH_USER} variables={{ id: this.state.userId }}>
            {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;
            return (
          <div className="nav-container">
            {modal ? (
              <Modal history={this.props.history} user={data.user} modal={modal} />
            ) : null}
<<<<<<< HEAD
            <div className="logo container">
=======
            <div className="logo-container">
>>>>>>> upstream/master
              <div
                className="nav-frog-logo"
                onClick={this.handleFrogLogoOrHomeLogoClick}
              ></div>
<<<<<<< HEAD
              <div className="nav-home-logo-wrapper">
=======
              <div className="logo-wrapper">
>>>>>>> upstream/master
                <div
                  className="nav-home-logo"
                  onClick={this.handleFrogLogoOrHomeLogoClick}
                >
                  <i className="fas fa-home nav-home-text"></i>
                  <div className="home-text">Home</div>
                </div>
              </div>
              <div
<<<<<<< HEAD
                className="edit-profile-button"
=======
                className="logo-wrapper"
>>>>>>> upstream/master
                onClick={() => { this.setModal("edit-profile") }}
              >
                <i
                  className="fa fa-wrench nav-edit-logo"
                  aria-hidden="true"
                ></i>
                <div className="edit-profile-text">Edit</div>
              </div>
<<<<<<< HEAD
              <div>
                <div className="image-profile-button-wrapper" onClick={this.handleProfileButtonClick}>
                    {data.user.image ? <div className="nav-image" style={{ backgroundImage: `url(${data.user.image})` }}></div> :
                      <div className="nav-image default-profile-picture-modal"></div>}
                    <div className="profile-text">
                      Profile
                    </div>
                </div>
=======
                <div className="logo-wrapper" onClick={this.handleProfileButtonClick}>
                  {data.user.image ? <div className="nav-image" style={{ backgroundImage: `url(${data.user.image})` }}></div> :
                    <div className="nav-image default-profile-picture-modal"></div>}
                  <div className="profile-text">
                    Profile
                  </div>
>>>>>>> upstream/master
              </div>
                  <ApolloConsumer>
                    {client => (
              <div
<<<<<<< HEAD
                className="logout-button"
=======
                className="logo-wrapper"
>>>>>>> upstream/master
                onClick={e => {
                  e.preventDefault();
                  localStorage.removeItem("auth-token");
                  localStorage.removeItem("user");
                  client.writeData({ data: { isLoggedIn: false } });
                  this.props.history.push("/");
                }}
              >
<<<<<<< HEAD
                <i className="fas fa-sign-in-alt"></i>
=======
              <i className="fas fa-sign-in-alt logout-button-text-icon"></i>
>>>>>>> upstream/master
                <div className="logout-button-text">Logout</div>
              </div>
                    )}
                    </ApolloConsumer>
              <button
                className="tweet-button"
                onClick={() => this.setModal("create-beet")}
              >
                Beet
              </button>
            </div>
          </div>
            )}}
          </Query>
        );
      } else {
        return null;
      }
  }
}
export default Nav;