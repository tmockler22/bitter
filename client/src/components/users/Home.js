import React, { Component } from "react";
import PostIndex from "../posts/PostIndex";
import CreatePost from "../posts/CreatePost";
<<<<<<< HEAD
import Search from "../Search/Search";
=======
>>>>>>> upstream/master
import { FETCH_USER } from "../../graphql/queries";
import { Query } from "react-apollo";
import { currentUser } from "../../util/util";
import "./home.css"

class HomeProfile extends Component {

  render() {
    if (currentUser()) {
      let userId = currentUser().id
      return (
        <Query query={FETCH_USER} variables={{ id: userId }}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            return (
              <div className="profile-container">
                <div className="profile-header">
                  <div className="profile-title">Home
<<<<<<< HEAD
                  <Search />
=======
>>>>>>> upstream/master
                </div>
                </div>
                <div className="profile-container-body">
                  <CreatePost user={data.user} />
                  <PostIndex params={this.props} />
                </div>
              </div>
            )
          }}
        </Query>
      )
    } else {
      return <div></div>
    }
  }
}


export default HomeProfile;