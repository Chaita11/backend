import mongoose from "mongoose";

const Schema = mongoose.Schema;

const dashboardSchema = new Schema({
  ve: {
    type: String,
    required: true,
  },
  webd: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },

  digitalI: {
    type: String,
    required: true,
  },
  photography: {
    type: String,
  },
  keynote: {
    type: String,
    required: true,
  },
  gaming: {
    type: String,
    required: true,
  },
  gd: {
    type: String,
    required: true,
  },
  surprise: {
    type: String,
    required: true,
  },
  quiz: {
    type: String,
    required: true,
  },
});
export default mongoose.model("Dashboard", dashboardSchema);

//users
