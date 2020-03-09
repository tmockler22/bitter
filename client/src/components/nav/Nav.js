import React from "react";
import { Query } from "react-apollo";
import { IS_LOGGED_IN } from "../../graphql/queries";
import { ApolloConsumer } from "react-apollo";
import { Link } from "react-router-dom";
import "./nav.css";
import Modal from "../modal/modal";
import {currentUser} from "../../util/util";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: currentUser() ? currentUser().id : null,
      photoUrl: currentUser().image 
    };
    this.handleFrogLogoOrHomeLogoClick = this.handleFrogLogoOrHomeLogoClick.bind(this);
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
    this.showProfilePicture = this.showProfilePicture.bind(this);
    this.handleProfileButtonClick = this.handleProfileButtonClick.bind(this);
  }

  handleFrogLogoOrHomeLogoClick(e) {
    this.props.history.push("/home");
  }

  handleEditButtonClick(e) {
    this.props.history.push(`/editProfile/${this.state.userId}`);
  }

  componentWillMount() {
    localStorage.setItem("modal", "");
  }

  setModal(modal) {
    localStorage.setItem("modal", `${modal}`);
    this.forceUpdate();
  }

  showProfilePicture() {
    if (!this.state.photoUrl) {
      return <div> no profile pic</div>;
    } else {
      return <div className="image-profile-button-wrapper">
          <img className="nav-image"
            src={this.state.photoUrl}
          ></img>
          <div className="profile-text">
           Profile 
          </div>
        </div>
    }
  }

  handleProfileButtonClick(e){
    e.preventDefault();
    if(this.props.history.location.pathname !== `/user/${this.state.userId}`){
          this.props.history.push(`/user/${this.state.userId}`);
    }
  }

  render() {
    let modal = localStorage.getItem("modal");
    return (
      <ApolloConsumer>
        {client => (
          <Query query={IS_LOGGED_IN}>
            {({ data }) => {
              if (data.isLoggedIn) {
                return (
                  <div className="nav-container">
<<<<<<< HEAD
                    {modal ? <Modal params={this.props.params} modal={modal} /> : null}
=======
                    {modal ? (
                      <Modal history={this.props.history} modal={modal} />
                    ) : null}
>>>>>>> master
                    <div className="logo container">
                      <div
                        className="nav-frog-logo"
                        onClick={this.handleFrogLogoOrHomeLogoClick}
                      ></div>
                      <div className="nav-home-logo-wrapper">
                        <div
                          className="nav-home-logo"
                          onClick={this.handleFrogLogoOrHomeLogoClick}
                        >
                          <i className="fas fa-home nav-home-text"></i>
                          <div className="home-text">Home</div>
                        </div>
                      </div>
                      <div
                        className="edit-profile-button"
                        onClick={this.handleEditButtonClick}
                      >
                        <i
                          class="fa fa-wrench nav-edit-logo"
                          aria-hidden="true"
                        ></i>
                        <div className="edit-profile-text">Edit</div>
                      </div>
                      <div>
                        <div onClick={this.handleProfileButtonClick}>
                          {this.showProfilePicture()}
                        </div>
                      </div>
                      <div
                        className="logout-button"
                        onClick={e => {
                          e.preventDefault();
                          localStorage.removeItem("auth-token");
                          localStorage.removeItem("user");
                          client.writeData({ data: { isLoggedIn: false } });
                          this.props.history.push("/");
                        }}
                      >
                        <i class="fas fa-sign-in-alt"></i>
                        <div className="logout-button-text">Logout</div>
                      </div>
                      <button
                        className="tweet-button"
                        onClick={() => this.setModal("create-beet")}
                      >
                        Beet
                      </button>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            }}
          </Query>
        )}
      </ApolloConsumer>
    );
  }
}
export default Nav;