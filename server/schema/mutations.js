const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const Post = mongoose.model("posts");
const UserType = require("./types/user_type");
const PostType = require("./types/post_type");
require("../models/index");
const AuthService = require("../services/Auth");


const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: UserType,
      args: {
        username: {type: GraphQLString},
        fullname: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.register(args);
      }
    },
    logout: {
    type: UserType,
    args: {
      // all we need to log the user our is an id
      _id: { type: GraphQLID }
    },
    resolve(_, args) {
      return AuthService.logout(args);
    }
  },
  login: {
    type: UserType,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString }
    },
    resolve(_, args) {
      return AuthService.login(args);
    }
  },
  verifyUser: {
    type: UserType,
    args: {
      token: { type: GraphQLString }
    },
    resolve(_, args) {
      return AuthService.verifyUser(args);
    }
  },
  newPost: {
    type: PostType,
    args: {
      body: { type: GraphQLString },
      user: { type: GraphQLID },
    },
      async resolve(_, { body, user }, ctx) {
      const validUser = await AuthService.verifyUser({ token: ctx.token });
      if (validUser.loggedIn) { 
        return new Post({ body, user }).save().then(post => User.addUserPost(post._id, user));
      } else {
        throw new Error('Sorry, you need to be logged in to create a post.');
      }
    }
  },
    follow: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        newFollow: { type: GraphQLID },
      },
      async resolve(_, { id, newFollow }, ctx) {
        const validUser = await AuthService.verifyUser({ token: ctx.token });
        const alreadyFollows = await User.alreadyFollows(id, newFollow);
       
      if (alreadyFollows) { 
          throw new Error('Already followed user.');
        } else if (!validUser.loggedIn) {
          return User.addFollow(id, newFollow);
        } else {
          throw new Error('Sorry, you need to be logged in to follow.');
        }
      }
    }
  }
});

module.exports = mutation;