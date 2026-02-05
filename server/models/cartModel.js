import mongoose from "mongoose";
const cartSchema = mongoose.Schema({
  product_id: {
    type: mongoose.Schema.ObjectId,
    ref: "products",
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  quantity: {
    type: Number,
    default: 0,
  },
});
const cartModel = mongoose.model("cart", cartSchema);
export default cartModel;
