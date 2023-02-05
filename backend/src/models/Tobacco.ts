import mongoose from "mongoose";

const TobaccoSchema = new mongoose.Schema(
  {
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
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Tobacco", TobaccoSchema);
