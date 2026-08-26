//notifications model
import mongoose from "mongoose";

//notification interface
interface Notification {
  _id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  user_id: mongoose.Schema.Types.ObjectId;
}

const notificationSchema = new mongoose.Schema<Notification>({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  //set timestamps to true only
});
export const NotificationModel = mongoose.model<Notification>(
  "Notification",
  notificationSchema
);
