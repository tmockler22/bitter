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

UserSchema.statics.findPosts = function (userId) {
  return this.findById(userId)
    .populate("posts")
    .then(user => user.posts);
};

UserSchema.statics.addUserPost = (postId, userId) => {
  const User = mongoose.model("users");
  const Post = mongoose.model("posts");

  return User.findById(userId).then(user => {
    return Post.findById(postId).then(post => {
      user.posts.push(post);
      return Promise.all([post.save(), user.save()]).then(
        ([post, user]) => post
      );
    });
  });
};

module.exports = mongoose.model("users", UserSchema);
