const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

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
    posts: {type: GraphQLList(require("./post_type"))}
  })
});

module.exports = UserType;