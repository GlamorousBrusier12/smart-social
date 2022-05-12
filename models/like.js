const mongoose = require("mongoose");

const likesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
    },
    // this defines the objectId of the like object
    likable: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      refPath: "onModel",
    },
    // this feild is used for defining type of the liked object since this is a dynamic reference
    onModel: {
      type: String,
      require: true,
      enum: ["Post", "Comment"],
    },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.model("Like", likesSchema);

module.exports = Like;
