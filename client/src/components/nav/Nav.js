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
                      props.history.push("/splash");
                  }}
                >Logout</button>
                  <Link to="/user/5e612afff942dc2ea136aea8"> Guest </Link>
                  <Link to="/user/5e6128ff8765ff2407644c3e"> Michael </Link>
                  <Link to="/user/5e6129fa33db51b116a71ea2"> Garon</Link>
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