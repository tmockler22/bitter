const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TagSchema = new Schema({
  tag: {
    type: String,
    required: true
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "posts"
    }
  ]
});

TagSchema.statics.addTags = async function (post) {
  const Tag = mongoose.model("tags");
  let tags = post.tags; 
  let tag; 
  for (let index = 0; index < tags.length; index++) {
    let newObj = {};
    newObj.posts = [post._id];
    const el = tags[index];
    newObj.tag = el;
    tag = await Tag.find({"tag": el});
    
    if (tag.length !== 0) { 
      tag[0].posts.push(post._id);
      tag[0].save(); 
    }
    else { 
      new Tag(newObj).save();
    }
  } 
}

TagSchema.statics.findPosts = function (tagId) {
  return this.findById(tagId)
    .populate("posts")
    .then(tag => tag.posts);
};

module.exports = mongoose.model("tags", TagSchema);