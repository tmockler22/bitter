import React, { Component } from "react";
import { Query } from "react-apollo";
import { currentUser } from "../../util/util";
import Follow from "./Follow";
import PostIndex from "../posts/PostIndex";
import { FETCH_USER_PROFILE } from "../../graphql/queries";
import Modal from "../modal/modal"
import "./profile.css"
import "./home.css";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: currentUser().id,
      newFollow: props.match.params.id, 
    }
  }

  setModal(modal) {
    localStorage.setItem("modal", `${modal}`)
    this.forceUpdate()
  }

  componentDidUpdate() {
    if (this.state.newFollow !== this.props.match.params.id) {
      this.setState({newFollow: this.props.match.params.id});
  }
  }

  render() {
    let modal = localStorage.getItem("modal")
    return (
      <Query query={FETCH_USER_PROFILE} variables={{ id: this.state.newFollow }}>
        {({ loading, error, data }) => {
          if (loading) return <div style={{ minWidth: '600px' }}>Loading...</div>;
          if (error) return `Error! ${error.message}`;

          return (
            <div className="profile-container">
              {modal ? <Modal user={data.user} modal={modal} /> : null}
              <div className="profile-header">
                <div className="profile-title">{data.user.fullname}</div>
                <div className="profile-tweet-count">{`${data.user.posts.length} beets`}</div>
              </div>
              <div className="profile-container-body">
                <div
                  className="profile-cover-photo"
                  style={data.user.cover_image ?
                    { backgroundImage: `url('${data.user.cover_image}')` } :
                    { backgroundImage: `url('./froggy.png')` }}>
                </div>
                <div 
                  className="profile-profile-picture" 
                  style={data.user.image ? 
                    { backgroundImage: `url('${data.user.image}')` } : 
                    { backgroundImage: `url('./light_blue_back_guy.png')` } }>
                </div>
                {(this.state.id === this.state.newFollow) ? (
                <div>
                  <div 
                    className="follow-button"
                    onClick={() => { this.setModal("edit-profile") }}>
                      Edit profile</div>
                </div>
                ) : (
                    <Query query={FETCH_USER_PROFILE} variables={{ id: this.state.id }}>
                    {({ loading, error, data }) => {
                      if (loading) return <p>Loading...</p>;
                      if (error) return <p>Error</p>;
                      const follows = data.user.follows;
                      return (
                        <Follow follows={follows} params={this.props} />
                      )
                    }}
                  </Query>)}
                  <div className="post-index-container">
                    <PostIndex params={this.props} />
                  </div>
              </div>
            </div>
          );
        }}

      </Query>
    )
  }
}

export default UserProfile;