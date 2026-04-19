import mongoose from "mongoose";

const notificationSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "LOGIN",
        "REGISTER",
        "PROFILE_UPDATE",
        "UPLOAD",
        "PURCHASE",
        "INFO",
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const notificationModel = mongoose.model("notification", notificationSchema);
export default notificationModel;
