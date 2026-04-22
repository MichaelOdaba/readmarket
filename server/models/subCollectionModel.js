import mongoose from "mongoose";
const subCollectionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    collection: {
      type: mongoose.Schema.ObjectId,
      ref: "collection",
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
const subCollectionModel = mongoose.model("subCollection", subCollectionSchema);
export default subCollectionModel;
