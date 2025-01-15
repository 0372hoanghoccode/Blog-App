import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    parentId: {
      type: String,
      default: null,
    },
    likes: {
      type: Array,
      default: [],
    },
    dislikes: {
      type: Array,
      default: [],
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
    numberOfDislikes: {
      type: Number,
      default: 0,
    },
    rank: {
      type: String,
      enum: ["normal", "fan", "superfan", "god"],
      default: "normal",
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

commentSchema.pre("save", function (next) {
  const uniqueLikes = [...new Set(this.likes)];
  const likeCount = uniqueLikes.length;

  if (uniqueLikes.includes(this.userId)) {
    if (likeCount >= 50) this.rank = "god";
    else if (likeCount >= 10) this.rank = "superfan";
    else if (likeCount >= 3) this.rank = "fan";
    else this.rank = "normal";
  } else {
    if (likeCount >= 50) this.rank = "god";
    else if (likeCount >= 10) this.rank = "superfan";
    else if (likeCount >= 3) this.rank = "fan";
    else this.rank = "normal";
  }

  next();
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;