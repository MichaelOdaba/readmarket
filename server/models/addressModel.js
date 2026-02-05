import mongoose from "mongoose";
const addressSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  address_line: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  pincode: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  mobile: {
    type: String,
    default: "",
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const addressModel = mongoose.model("address", addressSchema);
