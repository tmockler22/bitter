const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("../config/keys").MONGO_URI;
const expressGraphQL = require("express-graphql");
const schema = require("./schema/schema.js")
const app = express();
const { graphqlUploadExpress } = require('graphql-upload');
const cors = require("cors");

if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}

if (process.env.NODE_ENV !== 'production') {
  let origin = "http://localhost:3000";
  app.use(cors({ origin }));
}

mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.json({limit: "50mb", extended: true}));
//bodyParser.json({ limit: "50mb", extended: true });

app.use(cors());
// ...
// use the expressGraphQL middleware to connect our GraphQLSchema to Express
app.use(
  "/graphql",
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  expressGraphQL(req => {
    return {
      schema,
      context: {
        token: req.headers.authorization
      },
      graphiql: true
    };
  })
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static("client/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

module.exports = app;