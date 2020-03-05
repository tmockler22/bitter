import React, { Component } from "react";
import { Query } from "react-apollo";
import { currentUser } from "../../util/util";
import Follow from "./Follow";
import PostIndex from "../posts/PostIndex";
import { FETCH_USER } from "../../graphql/queries";

class HomeProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {

  }

  render() {
    return (<div>
      <PostIndex params={this.props} />
    </div>)

  }
}


export default HomeProfile;