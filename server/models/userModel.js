import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      default: "",
      required: [true, "provide first name"],
    },
    lastname: {
      type: String,
      default: "",
      required: [true, "provide last name"],
    },
    email: {
      type: String,
      default: "",
      required: [true, "provide email"],
    },
    password: {
      type: String,
      default: "",
      required: [true, "provide password"],
    },
    avatar: {
      type: String,
      default: "",
    },
    mobile: {
      type: String,
      default: "",
    },

    otp: {
      type: String,
      default: "",
    },
    otp_expiry: {
      type: Date,
      default: "",
    },
    refresh_token: {
      type: String,
      default: "",
    },
    last_login_date: {
      type: Date,
      default: "",
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "SUSPENDED"],
      default: "ACTIVE",
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    address_details: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "address",
      },
    ],
    shopping_cart: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "cart",
      },
    ],
    order: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "order",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);
export default userModel;
