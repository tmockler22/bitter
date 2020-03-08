import React, { Component } from "react";
import HomeProfile from "./users/Home";
import UserProfile from "./users/Profile";
import HashTagIndex from "./hashtag/HashTagIndex";
import { Route, Switch, Link } from "react-router-dom";
import Login from "./nav/Login";
import Register from "./nav/Register";
import Nav from "./nav/Nav";
import Splash from "./splash/splash";
import Search from "./Search/Search";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import EditProfile from "./profile/editProfile";
const App = () => {
  return (
    <div>
      <Route exact path="/hashtag/:hashtag" component={HashTagIndex}/>
      <Route exact path="/search" component={Search} />
      <Route path="/" component={Nav} />
      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/splash" component={Splash} routeType="auth" />
        <AuthRoute exact path="/register" component={Register} routeType="auth" />
        <ProtectedRoute exact path="/user/:id" component={UserProfile}/>
        
        <ProtectedRoute exact path="/editprofile/:id" component={EditProfile} routeType="protected" />
        <ProtectedRoute path="/home" component={HomeProfile} routeType="protected" />
      </Switch>
    </div>
  );
};


export default App;
