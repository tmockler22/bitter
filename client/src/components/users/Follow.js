import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { FOLLOW_USER } from "../../graphql/mutations";
import { currentUser } from "../../util/util";

class Follow extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      id: currentUser().id,
      newFollow: props.params.match.params.id
    }
  }

  // updateCache(client, { data }) {
  //   client.writeData({
  //     data: { isLoggedIn: data.login.loggedIn }
  //   });
  // }

  render() {
    return (<Mutation
        mutation={FOLLOW_USER}
        onCompleted={data => {
          const { id, newFollow } = data.follow;
        }}
        // update={(client, data) => this.updateCache(client, data)}
      >
        {followUser => (
          <div>
            <button
              onClick={e => {
                e.preventDefault();
                followUser({
                  variables: {
                    id: this.state.id,
                    newFollow: this.state.newFollow
                  }
                });
              }}
            >Follow</button>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Follow;