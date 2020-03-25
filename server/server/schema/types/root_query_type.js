const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;
require("../../models/index");
const UserType = require("./user_type");
const PostType = require("./post_type");
const RebitType = require("./rebit_type");
const TagType = require("./tag_type");
const Tag = mongoose.model("tags");
const User = mongoose.model("users");
const Post = mongoose.model("posts");
const Rebit = mongoose.model("rebits");

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
    searchUsers: {
      type: new GraphQLList(UserType), 
      args: { searchTerm: {type: new GraphQLNonNull(GraphQLString)}},
      resolve(_, args) {
        return User.find({ fullname: { $regex: args.searchTerm, $options: "i" } });
      }
    },
    searchHashtags: {
      type: new GraphQLList(TagType),
      args: { searchTerm: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(_, args) {
        return Tag.find({ tag: { $regex: args.searchTerm, $options: "i" } });
      }
    },
    tags: {
      type: new GraphQLList(TagType),
      resolve() {
        return Tag.find({});
      }
    },
    tag: {
      type: TagType,
      args: {tag: { type: new GraphQLNonNull(GraphQLString) } },
      async resolve(_, args) {
        console.log(args.tag);
        let thisTag = await Tag.find({ tag: args.tag });
        console.log(thisTag);
        return thisTag[0]; 
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
    },
    rebits: {
      type: new GraphQLList(RebitType),
      resolve() {
        return Rebit.find({});
      }
    },
    rebit: {
      type: RebitType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Rebit.findById(args._id);
      }
    }
  })
});

module.exports = RootQueryType;