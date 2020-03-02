const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLBoolean } = graphql;
const { s3 } = require('../../services/s3');

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
    posts: {type: GraphQLList(require("./post_type"))},
    token: {type: GraphQLString},
    loggedIn: {type: GraphQLBoolean},
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

module.exports = UserType;




