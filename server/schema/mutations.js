const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLNonNull } = graphql;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const Post = mongoose.model("posts");
const UserType = require("./types/user_type");
const PostType = require("./types/post_type");
require("../models/index");
const AuthService = require("../services/Auth");
const { singleFileUpload } = require("../services/s3");
const { GraphQLUpload } = require('graphql-upload');


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
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        username: { type: GraphQLString },
        fullname: {type: GraphQLString},      
        email: { type: GraphQLString },
        bio: { type: GraphQLString },
        image: { type: GraphQLUpload}
      },
      async resolve(_parentvalue, { id, username, fullname, email, bio, image }) {
        const updateObj = {};

        if (id) updateObj.id = id;
        if (username) updateObj.username = username;
        if (fullname) updateObj.fullname = fullname;
        if (email) updateObj.email = email;
        if (bio) updateObj.bio = bio;
        if (image) {
          updateObj.image = await singleFileUpload(image);
        }
        return User.findOneAndUpdate(
          { _id: id },
          { $set: updateObj },
          { new: true },
          (err, user) => {
            return user;
          }
        );
      },
    },
    newPost: {
      type: PostType,
      args: {
        body: { type: GraphQLString },
        user: { type: GraphQLID },
        image: {type: GraphQLUpload}
      },      
        async resolve(_, { body, user, image }, ctx) {
           const updateObj = {};

         if (user) updateObj.user = user;
         if (body) updateObj.body = body;
         if (image) {
           updateObj.image =  await singleFileUpload(image);
         }
        const validUser = await AuthService.verifyUser({ token: ctx.token });
        if (validUser.loggedIn) { 
          return new Post(updateObj)
          .save().then(post => User.addUserPost(post._id, user));
        } else {
          throw new Error('Sorry, you need to be logged in to create a post.');
        }
      }
    }
  }
});

module.exports = mutation;