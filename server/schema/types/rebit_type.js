const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const Rebit = mongoose.model("rebits");
const RebitType = new GraphQLObjectType({
  name: "RebitType",

  fields: () => ({
    _id: { type: GraphQLID },
    timestamp: { type: GraphQLString },
    user: {
      type: require('./user_type'),
      resolve(parentValue) {
        return Rebit.findById(parentValue._id).populate("user").then(rebit => rebit.user);
      }
    },
    original: { 
      type: require('./post_type'),
      resolve(parentValue){
        return Rebit.findById(parentValue._id).populate("original").then(rebit => rebit.original);
      }
    },
  })
});

module.exports = RebitType;