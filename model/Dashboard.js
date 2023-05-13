import mongoose from "mongoose";

const Schema = mongoose.Schema;

const dashboardSchema = new Schema({
  team: {
    type: String,
    unique: true,
    required: true,
  },
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
    required: true,
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
  id: {
    type: String,
  },
});
export default mongoose.model("Dashboard", dashboardSchema);

//users
