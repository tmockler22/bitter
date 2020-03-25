import React, { Component } from "react";
import { Query } from "react-apollo";
import { currentUser } from "../../util/util";
import Follow from "../users/Follow";
import { FETCH_USERS} from "../../graphql/queries";

class whoToFollow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: currentUser().id,
      newFollow: props.match.params.id,
    }
  }

  componentWillMount() {
    localStorage.setItem("modal", "")
  }

  setModal(modal) {
    localStorage.setItem("modal", `${modal}`)
    this.forceUpdate()
  }

  componentDidUpdate() {
    if (this.state.newFollow !== this.props.match.params.id) {
      this.setState({ newFollow: this.props.match.params.id });
    }
  }

  render() {
    let modal = localStorage.getItem("modal")
    return (
      <Query query={FETCH_USER} variables={{ id: this.state.newFollow }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <div className="profile-container">
           
      </div>
          );
        }}

      </Query>
    )
  }
}

export default UserProfile;