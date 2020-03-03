import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { currentUser } from "../../util/util";
import Follow from "./Follow";
import PostIndex from "../posts/PostIndex";
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: currentUser().id,
      newFollow: props.match.params.id, 
    }
  }

  render() {
    return <div>
      {(this.state.id === this.state.newFollow) ? <div></div> : <Follow params={this.props}/>}
      <PostIndex params={this.props}/>
    </div>
    
  }
}

export default UserProfile;