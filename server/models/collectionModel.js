import mongoose from "mongoose";
const collectionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
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
const collectionModel = mongoose.model("collection", collectionSchema);
export default collectionModel;
