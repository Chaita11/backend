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
  teamname: {
    type: String,
    required: true,
  },

  teachername: {
    type: String,
    required: true,
  },
  studentname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  accountType: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});
export default mongoose.model("User", userSchema);

//users
