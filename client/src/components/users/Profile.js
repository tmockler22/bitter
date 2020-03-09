import React, { Component } from "react";
import { Query } from "react-apollo";
import { currentUser } from "../../util/util";
import Follow from "./Follow";
import PostIndex from "../posts/PostIndex";
import { FETCH_USER } from "../../graphql/queries";
import "./home.css";
import Search from "../Search/Search";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: currentUser().id,
      newFollow: props.match.params.id, 
    }
  }

  componentDidUpdate() {
    if (this.state.newFollow !== this.props.match.params.id) {
      this.setState({newFollow: this.props.match.params.id});
  }
  }

  render() {
    return <div className="profile-container">
      {(this.state.id === this.state.newFollow) ? <div></div> : 
        <Query query={FETCH_USER} variables={{ id: this.state.id }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            const follows = data.user.follows;
            return (
              <div>
                <div className="profile-title">
                  <p className="nav-title">User</p>
                <Search /> 
                </div>
                <Follow follows={follows} params={this.props} />
              </div>
            )
          }}
        </Query>}
         
      <PostIndex params={this.props}/>
    </div>
    
  }
}


export default UserProfile;