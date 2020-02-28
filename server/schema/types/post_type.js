const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const PostType = new GraphQLObjectType({
  name: "PostType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    body: { type: GraphQLString },
    user: { type: require('./user_type') },
    favorites: { type: GraphQLList(require("./user_type")) },
    rebit: { type: GraphQLList(require("./user_type")) }
  })
});

module.exports = PostType;