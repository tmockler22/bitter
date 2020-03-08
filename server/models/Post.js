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
  favorites: [
    {
      type: Schema.Types.ObjectId, 
      ref: "users"
    }
  ],
  tags: {
      type: Array 
  },
  rebits: [
    {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  ],
  user: 
    {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
  timestamp: 
    { 
      type: Date, default: Date.now 
    }
});

PostSchema.statics.findFavorites = function (postId) {
  return this.findById(postId)
    .populate("favorites")
    .then(post => post.favorites);
};

PostSchema.statics.findTags = function (postId) {
  return this.findById(postId)
    .populate("favorites")
    .then(post => post.favorites);
};

PostSchema.statics.findRebits = function (postId){
  return this.findById(postId)
  .populate("rebits")
  .then(post => post.rebits);
}

module.exports = mongoose.model("posts", PostSchema);