import React, { Component } from "react";
import PostIndex from "./posts/PostIndex";
import { Route, Switch } from "react-router-dom";
import Login from "./nav/Login";
import Nav from "./nav/Nav";
import AuthRoute from "../util/route_util";

const App = () => {
  return (
    <div>
      <h1>Bitter</h1>
      <Route path="/" component={Nav} /> 
      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <Route exact path="/" component={PostIndex} />
      </Switch>
    </div>
  );
};


export default App;
