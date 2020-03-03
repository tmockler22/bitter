import React, { Component } from "react";
import PostIndex from "./posts/PostIndex";
import UserProfile from "./users/Profile";
import { Route, Switch, Link } from "react-router-dom";
import Login from "./nav/Login";
import Register from "./nav/Register";
import Nav from "./nav/Nav";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import EditProfile from "./profile/editProfile";
const App = () => {
  return (
    <div>
      <Link to="/"><h1>Bitter</h1></Link>
      <Route path="/" component={Nav} /> 
      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/register" component={Register} routeType="auth" />
        <ProtectedRoute exact path="/user/:id" component={UserProfile}/>
        <ProtectedRoute exact path="/editprofile/:id" component={EditProfile} routeType="protected" />
        <ProtectedRoute path="/" component={PostIndex} routeType="protected" />
      </Switch>
    </div>
  );
};


export default App;
