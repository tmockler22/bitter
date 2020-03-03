const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLBoolean } = graphql;
const User = mongoose.model("users");
const UserType = new GraphQLObjectType({
  name: "UserType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    fullname: {type: GraphQLString},
    username: { type: GraphQLString },
    email: {type: GraphQLString},
    password: {type: GraphQLString},
    bio: {type: GraphQLString},
    token: {type: GraphQLString},
    loggedIn: {type: GraphQLBoolean},
    posts: {
      type: new GraphQLList(require("./post_type")),
      resolve(parentValue) {
        return User.findPosts(parentValue._id);
      }
    },
    follows: {
      type: new GraphQLList(require("./user_type")),
      resolve(parentValue) {
        return User.findFollows(parentValue._id);
      }
    },
    followers: {
      type: new GraphQLList(require("./user_type")),
      resolve(parentValue) {
        return User.findFollowers(parentValue._id);
      }
    }
  })
});

module.exports = UserType;