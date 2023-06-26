import mongoose from "mongoose";

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default mongoose.model("Question", questionSchema);
