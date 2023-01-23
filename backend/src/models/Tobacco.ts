import mongoose from "mongoose";

const TabaccoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fabricator: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: Array,
  },
});

export default mongoose.model("Tabacco", TabaccoSchema);
