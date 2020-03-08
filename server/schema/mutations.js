const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLNonNull, GraphQLArray, GraphQLList } = graphql;
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
        } else if (validUser.loggedIn) {
          return User.addFollow(id, newFollow);
        } else {
          throw new Error('Sorry, you need to be logged in to follow.');
        }
      }
    },
    unfollow: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        unfollowId: { type: GraphQLID },
      },
      async resolve(_, { id, unfollowId }, ctx) {
        const validUser = await AuthService.verifyUser({ token: ctx.token });
        const alreadyFollows = await User.alreadyFollows(id, unfollowId);

        if (!alreadyFollows) {
          throw new Error("You don't follow this user.");
        } else if (validUser.loggedIn) {
          return User.removeFollow(id, unfollowId);
        } else {
          throw new Error('Sorry, you need to be logged in to unfollow.');
        }
      }
    },
    newPost: {
      type: PostType,
      args: {
        body: { type: GraphQLString },
        user: { type: GraphQLID },
        image: {type: GraphQLUpload},
        tags: {type: GraphQLList(GraphQLString)}
      },      
        async resolve(_, { body, user, image, tags }, ctx) {
           const updateObj = {};
          console.log(tags);
         if (user) updateObj.user = user;
         if (body) updateObj.body = body;
         if (image) {
           updateObj.image =  await singleFileUpload(image);
         }
         if (tags) {
           updateObj.tags = tags;
         } 
        const validUser = await AuthService.verifyUser({ token: ctx.token });
        if (validUser.loggedIn) { 
          return new Post(updateObj)
          .save().then(post => User.addUserPost(post._id, user));
        } else {
          throw new Error('Sorry, you need to be logged in to create a post.');
        }
      }
    },
    favorite: {
      type: UserType,
      args: {
        userId: { type: GraphQLID },
        postId: { type: GraphQLID },
      },
      async resolve(_, { userId, postId }, ctx) {
        const validUser = await AuthService.verifyUser({ token: ctx.token });
        const alreadyFavorited = await User.alreadyFavorited(userId, postId);

        if (alreadyFavorited) {
          throw new Error('Already favorited post.');
        } else if (validUser.loggedIn) {
          return User.addFavorite(userId, postId);
        } else {
          throw new Error('Sorry, you need to be logged in to favorite.');
        }
      }
    },

    unfavorite: {
      type: UserType,
      args:{
        userId: {type: GraphQLID},
        postId: {type: GraphQLID},   
      },
      async resolve(_, { userId, postId }, ctx) {
        const validUser = await AuthService.verifyUser({ token: ctx.token });
        const alreadyFavorited = await User.alreadyFavorited(userId, postId);

        if (!alreadyFavorited) {
          throw new Error('You need to favorite that post first.');
        } else if (validUser.loggedIn) {
          return User.unfavorite(userId, postId);
        } else {
          throw new Error('Sorry, you need to be logged in to unfavorite.');
        }
      }
    },
    rebit: {
      type: UserType,
      args: {
        userId: {type: GraphQLID},
        postId: {type: GraphQLID},
      },
      async resolve(_, {userId, postId}, ctx){
        const validUser = await AuthService.verifyUser({token: ctx.token});
        const alreadyRebited = await User.alreadyRebited(userId, postId);

        if(alreadyRebited){
          throw new Error('You already rebited that post');
        }else if (validUser.loggedIn){
          return User.addRebit(userId, postId);
        }else{
          throw new Error('Sorry, you need to be logged in to rebit')
        }
      }
    },
    unRebit: {
      type: UserType,
      args: {
        userId: { type: GraphQLID },
        postId: { type: GraphQLID },
      },
      async resolve(_, { userId, postId }, ctx) {
        const validUser = await AuthService.verifyUser({ token: ctx.token });
        const alreadyRebited = await User.alreadyRebited(userId, postId);

        if (!alreadyRebited) {
          throw new Error('You need to rebit that post first');
        } else if (validUser.loggedIn) {
          return User.removeRebit(userId, postId);
        } else {
          throw new Error('Sorry, you need to be logged in to rebit')
        }
      }
    },
  }
});

module.exports = mutation;