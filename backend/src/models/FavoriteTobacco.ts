import mongoose from "mongoose";

const FavoriteTobaccoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tobacco: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tobacco",
      required: true,
    },
  },
  {
    timestamps: true,
    id: true,
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

export default mongoose.model("FavoriteTobacco", FavoriteTobaccoSchema);
