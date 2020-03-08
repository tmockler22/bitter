const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const Tag = mongoose.model("tags");
const TagType = new GraphQLObjectType({
  name: "TagType",
  fields: () => ({
    _id: { type: GraphQLID },
    tag: { type: GraphQLString },
    posts: {
      type: new GraphQLList(require("./post_type")),
      resolve(parentValue) {
        return Tag.findPosts(parentValue._id);
      }
    }
  })
});

module.exports = TagType;