import React from "react";
import { Query } from "react-apollo";
import { IS_LOGGED_IN } from "../../graphql/queries";
import { ApolloConsumer } from "react-apollo";
import { Link } from "react-router-dom";
import CreatePost from "../posts/CreatePost";
const Nav = props => {
  return (
    <ApolloConsumer>
      {client => (
        <Query query={IS_LOGGED_IN}>
          {({ data }) => {
            if (data.isLoggedIn) {
              return (
                <div>
                <button
                  onClick={e => {
                    e.preventDefault();
                    localStorage.removeItem("auth-token");
                    localStorage.removeItem("user");
                    client.writeData({ data: { isLoggedIn: false } });
                    console.log(localStorage.getItem("user"));
                    props.history.push("/");
                  }}
                >
                  Logout
                </button>
                  <CreatePost />
                </div>
              );
            } else {
              return (
                <div>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Sign Up</Link>
                </div>
              );
            }
          }}
        </Query>
      )}
    </ApolloConsumer>
  );
};

export default Nav; 