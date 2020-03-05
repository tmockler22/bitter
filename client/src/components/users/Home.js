import React, { Component } from "react";
import { Query } from "react-apollo";
import { currentUser } from "../../util/util";
import Follow from "./Follow";
import PostIndex from "../posts/PostIndex";
import { FETCH_USER } from "../../graphql/queries";
import CreatePost from "../posts/CreatePost";
import "./home.css"

class HomeProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
    <div className="profile-container">
      <div className="profile-title">Home</div>
      <CreatePost />
      <PostIndex params={this.props} />
    </div>
    )
  }
}


export default HomeProfile;