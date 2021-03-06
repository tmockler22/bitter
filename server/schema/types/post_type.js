const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLArray } = graphql;
const { s3 } = require('../../services/s3');
const Post = mongoose.model("posts");
const PostType = new GraphQLObjectType({
  name: "PostType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    body: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    user: {
      type: require('./user_type'),
      resolve(parentValue) {
        return Post.findById(parentValue._id).populate("user").then(post => post.user);
      }
    },
    favorites: {
      type: new GraphQLList(require("./user_type")),
      resolve(parentValue) {
        return Post.findFavorites(parentValue._id);
      }
    },
    tags: { type: new GraphQLList(GraphQLString) },
    rebits: { 
      type: GraphQLList(require("./user_type")),
      resole(parentValue){
        return Post.findRebits(parentValue._id);
      }
    },
    image: {
        type: GraphQLString,
        resolve(parentValue) {
          let imageUrl;
          if (parentValue.image) {
            imageUrl = s3.getSignedUrl('getObject', {
              Bucket: "bitter-app",
              Key: parentValue.image
            });
          }
          return imageUrl || parentValue.image;
        }
      }
  })
});

module.exports = PostType;