import React, { Component } from "react";
import PostIndex from "../posts/PostIndex";
import CreatePost from "../posts/CreatePost";
import Search from "../Search/Search";
import "./home.css"

class HomeProfile extends Component {

  render() {
    return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-title">Home
        <Search />
      </div>
      </div>
      <div className="profile-container-body">
        <CreatePost />
        <PostIndex params={this.props} />
      </div>
    </div>
    )
  }
}


export default HomeProfile;