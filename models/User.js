const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String, 
    required: true,
    min: 4, 
    max: 15
  },
  email: {
    type: String, 
    required: true
  },
  fullname: {
    type: String, 
    required: true
  },
  bio: {
    type: String
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 32
  }, 
  image: {
    type: String
  },
  posts: [
    {
      type: Schema.Types.ObjectId, 
      ref: "posts"
    }
  ],
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "posts"
    }
  ]
});




module.exports = mongoose.model("users", UserSchema);
