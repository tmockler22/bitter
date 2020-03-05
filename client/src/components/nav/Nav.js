import React from "react";
import { Query } from "react-apollo";
import { IS_LOGGED_IN } from "../../graphql/queries";
import { ApolloConsumer } from "react-apollo";
import { Link } from "react-router-dom";
import "./nav.css";

const Nav = props => {
  return (
    <ApolloConsumer>
      {client => (
        <Query query={IS_LOGGED_IN}>
          {({ data }) => {
            if (data.isLoggedIn) {
              return (
                <div className="nav-container">
                <Link to="/home"><h1>Bitter</h1></Link>
                <button
                  onClick={e => {
                    e.preventDefault();
                    localStorage.removeItem("auth-token");
                    localStorage.removeItem("user");
                    client.writeData({ data: { isLoggedIn: false } });
                      props.history.push("/");
                  }}
                >Logout</button>
                  <Link to="/user/5e5d611823fac9a96fefe040"> Tristan </Link>
                  <Link to="/user/5e5d1afa79b5b383df60b4ab"> Guest </Link>
                  <Link to="/user/5e5edb5d9fc066eeecd637ea"> 2Guest2</Link>
                </div>
              );
            } else {
              return (
                null
              );
            }
          }}
        </Query>
      )}
    </ApolloConsumer>
  );
};

export default Nav; 