import mongoose from "mongoose";
const orderSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    order_id: {
      type: String,
      unique: true,
    },
    product_id: {
      type: mongoose.Schema.ObjectId,
      ref: "products",
    },
    product_details: {
      type: String,
      default: "",
    },
    sub_total_amt: {
      type: Number,
      default: 0,
    },
    total_amt: {
      type: Number,
      default: 0,
    },
    payment_status: {
      type: String,
      default: "",
    },
    payment_id: {
      type: String,
      default: "",
    },
    delivery_address: {
      type: mongoose.Schema.ObjectId,
      ref: "address",
    },
    invoice_reciept: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("order", orderSchema);
export default orderModel;
