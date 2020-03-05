const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
  body: {
    type: String, 
    required: true
  },
  image: {
    type: String
  },
  // timestamps: { 
  //   createdAt: 'created_at', 
  //   updatedAt: 'updated_at' 
  // },
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

PostSchema.statics.findFavorites = function (postId) {
  return this.findById(postId)
    .populate("favorites")
    .then(post => post.favorites);
};

module.exports = mongoose.model("posts", PostSchema);