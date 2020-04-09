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
  cover_image: {
    type: String
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
  favorited_posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "posts"
    }
  ],
  rebited_posts:[
    {
      type: Schema.Types.ObjectId,
      ref: "rebits"
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

UserSchema.statics.addUserPost = function (postId, userId) {
  const User = mongoose.model("users");
  const Post = mongoose.model("posts");
  const Tag = mongoose.model("tags");
  return User.findById(userId).then(user => {
    return Post.findById(postId).then(post => {
      user.posts.push(post);
      Tag.addTags(post);
      return Promise.all([post.save(), user.save()]).then(
        ([post, user]) => (post)
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

UserSchema.statics.addFavorite = (userId, postId) => {
  const User = mongoose.model("users");
  const Post = mongoose.model("posts");

  return User.findById(userId).then(user => {
    return Post.findById(postId).then(post => {
      user.favorited_posts.push(postId);
      post.favorites.push(userId);
      return Promise.all([user.save(), post.save()]).then(
        ([user, post]) => (post, user)
      );
    });
  });
};

UserSchema.statics.removeFollow = (id, unfollowId) => {
  const User = mongoose.model("users");

  return User.findById(id).then(user => {
    return User.findById(unfollowId).then(unfollow => {
      user.follows.remove(unfollow);
      unfollow.followers.remove(user);
      return Promise.all([user.save(), unfollow.save()]).then(
        ([user, unfollow]) => unfollow
      );
    });
  });
};

UserSchema.statics.findFavoritedPosts = function (userId) {
  return this.findById(userId)
    .populate("favorited_posts")
    .then(user => user.favorited_posts);
};


UserSchema.statics.alreadyFavorited = function (userId, postId) {
  const User = mongoose.model("users");

  return User.findById(userId).then(user => {
    const newPostString = JSON.stringify(postId); ///postID
    for (let index = 0; index < user.favorited_posts.length; index++) {
      const favorite = user.favorited_posts[index];
      const favoriteString = JSON.stringify(favorite)

      if (favoriteString === newPostString) {
        return true;
      }
    }
    return false;
  });
}

UserSchema.statics.unfavorite = (userId, postId) => {
  const User = mongoose.model("users");
  const Post = mongoose.model("posts")

  return User.findById(userId).then(user => {
    return Post.findById(postId).then(post => {
      user.favorited_posts.remove(post);
      post.favorites.remove(user);
      return Promise.all([user.save(), post.save()]).then(
        ([user, post]) => post
      );
    });
  });
};


UserSchema.statics.findRebits = function (userId) {
  return this.findById(userId)
    .populate("rebited_posts")
    .then(user => user.rebited_posts);
};

UserSchema.statics.alreadyRebited = function(userId, rebitId){
  const User = mongoose.model("users");

  return User.findById(userId).then(user => {
    const rebitIdString = JSON.stringify(rebitId); 
    for (let index = 0; index < user.rebited_posts.length; index++) {
      const rebit = user.rebited_posts[index]._id;
      const rebitString = JSON.stringify(rebit)
      if (rebitString === rebitIdString) {
        return true;
      }
    }
    return true;
  });
}

UserSchema.statics.addRebit = (rebitId, userId, postId) => {
  const User = mongoose.model("users");
  const Post = mongoose.model("posts");
  const Rebit = mongoose.model("rebits");
  return User.findById(userId).then(user => {
    return Post.findById(postId).then(post => {
      return Rebit.findById(rebitId).then(rebit => {
        user.rebited_posts.push(rebit);
        post.rebits.push(userId);
        return Promise.all([post.save(), rebit.save(), user.save()]).then(
          ([user, post, rebit]) => (rebit, post)
        );
      })
    });
  });
};



UserSchema.statics.removeRebit = (userId, rebitId, postId) => {
  const User = mongoose.model("users");
  const Post = mongoose.model("posts");
  const Rebit = mongoose.model("rebits")

  return User.findById(userId).then(user => {
    return Post.findById(postId).then(post => {
      return Rebit.findById(rebitId).then(rebit => {
        user.rebited_posts.remove(rebit);
        post.rebits.remove(userId);
        return Promise.all([user.save(), post.save()]).then(
          ([user, post, rebit]) => (post))
      });
    });
  });
}
module.exports = mongoose.model("users", UserSchema);
