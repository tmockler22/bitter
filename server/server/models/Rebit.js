const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RebitSchema = new Schema({
  user: 
  {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  original:
    {
      type: Schema.Types.ObjectId,
      ref: "posts"
    },
  timestamp: 
    { 
      type: Date, default: Date.now 
    }
});

RebitSchema.statics.findPost = function (rebitId){
  return this.findById(rebitId)
  .populate("original")
  .then(rebit => rebit.original);
}

module.exports = mongoose.model("rebits", RebitSchema);