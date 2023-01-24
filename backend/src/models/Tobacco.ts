import mongoose from "mongoose";

const TabaccoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  fabricator: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photosUrl: {
    type: Array,
  },
  userId: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Tabacco", TabaccoSchema);
