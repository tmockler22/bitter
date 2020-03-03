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
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  ],
  follows: [
    {
      type: Schema.Types.ObjectId,
      ref: "users"
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

UserSchema.statics.findFollows = function (userId) {
  return this.findById(userId)
    .populate("follows")
    .then(user => user.follows);
};

UserSchema.statics.findFollowers = function (userId) {
  return this.findById(userId)
    .populate("followers")
    .then(user => user.followers);
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

UserSchema.statics.alreadyFollows = (id, newFollow) => {
  const User = mongoose.model("users");

  return User.findById(id).then(user => {
    const newFollowString = JSON.stringify(newFollow);
      for (let index = 0; index < user.follows.length; index++) {
        const follow = user.follows[index];
        const stringFollow = JSON.stringify(follow)
        
        if (stringFollow === newFollowString) {
          return true;
        } 
      }
          return false; 
  });
}


UserSchema.statics.addFollow = (id, newFollow) => {
  const User = mongoose.model("users");

  return User.findById(id).then(user => {
    return User.findById(newFollow).then(newFollow => {
      user.follows.push(newFollow);
      newFollow.followers.push(user);
      return Promise.all([user.save(), newFollow.save()]).then(
        ([user, newFollow]) => newFollow
      );
    });
  });
};

module.exports = mongoose.model("users", UserSchema);
