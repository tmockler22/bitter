const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
require("../../../models/index");
const UserType = require("./user_type");
const PostType = require("./post_type")

const User = mongoose.model("users");
const Post = mongoose.model("posts");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return User.findById(args._id);
      }
    },
    posts: {
        type: new GraphQLList(PostType),
          resolve() {
          return Post.find({});
        }
      },
      post: {
        type: PostType,
        args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(_, args) {
          return Post.findById(args._id);
        }
      }
  }),
});

module.exports = RootQueryType;