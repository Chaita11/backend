import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  schoolname: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 0,
  },
  submissions: [
    {
      answer: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
      isCorrect: Boolean,
      points: Number,
    },
  ],
});
export default mongoose.model("User", userSchema);

//users
