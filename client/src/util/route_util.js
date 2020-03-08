import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Query } from "react-apollo";
import { IS_LOGGED_IN } from "../graphql/queries";


export const AuthRoute = ({
  component: Component,
  path,
  exact,
  routeType,
  ...rest
}) => (
    <Query query={IS_LOGGED_IN}>
      {({ data }) => {
        if (routeType === "auth") {
          return (
            <Route
              path={path}
              exact={exact}
              render={props =>
                !data.isLoggedIn ? <Component {...props} /> : <Redirect to="/home" />
              }
            />
          );
        } else {
          return (
            <Route
              {...rest}
              render={props =>
                data.isLoggedIn ? (
                  <Component {...props} />
                ) : (
                    <Redirect to="/" />
                  )
              }
            />
          );
        }
      }}
    </Query>
  );

export const ProtectedRoute = ({
  component: Component,
  path,
  exact,
  routeType,
  ...rest
}) => (
    <Query query={IS_LOGGED_IN}>
      {({ data }) => {
        if (routeType === "protected") {
          return (
            <Route
              path={path}
              exact={exact}
              render={props =>
                data.isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
              }
            />
          );
        } else {
          return (
            <Route
              {...rest}
              render={props =>
                data.isLoggedIn ? (
                  <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                  )
              }
            />
          );
        }
      }}
    </Query>
  );
