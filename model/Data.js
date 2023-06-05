import mongoose from "mongoose";

const Schema = mongoose.Schema;

const dataSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  subheading: {
    type: String,
    required: true,
  },
  body: [
    {
      para: {
        type: String,
      },
    },
  ],
  btn: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  head: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  team: {
    type: Number,
    required: true,
  },

  participants: {
    type: Number,
    required: true,
  },
  pf: [
    {
      prelims: {
        type: String,
        required: true,
      },
      finals: {
        type: String,
        required: true,
      },
    },
  ],
  icons: [
    {
      link: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  id: {
    type: Number,
    required: true,
    unique: true,
  },
});
export default mongoose.model("Data", dataSchema);
