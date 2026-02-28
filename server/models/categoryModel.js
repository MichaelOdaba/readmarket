import mongoose from "mongoose";
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
});
const categoryModel = mongoose.model("category", categorySchema);
export default categoryModel;
