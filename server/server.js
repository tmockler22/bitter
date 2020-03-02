const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("../config/keys").MONGO_URI;
const expressGraphQL = require("express-graphql");
const schema = require("./schema/schema.js")
const app = express();
const { graphqlUploadExpress } = require('graphql-upload');

if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}

mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10}),
  expressGraphQL({
    schema,
    graphiql: true
  }),
  expressGraphQL({
    schema,
    graphiql: true
  })
);

module.exports = app;