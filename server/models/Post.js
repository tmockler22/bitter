const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
  body: {
    type: String, 
    required: true
  },
  favorites: [
    {
      type: Schema.Types.ObjectId, 
      ref: "users"
    }
  ],
  rebit: [
    {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  ],
  user: 
    {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
});

module.exports = mongoose.model("posts", PostSchema);