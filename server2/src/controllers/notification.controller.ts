//controllers for handling notifications

import { Request, Response } from "express";
import { NotificationModel } from "../models/Notifications.js";
import { AuthenticatedUser, User } from "../types/user.types.js";
import { UserModel } from "../models/User.js";

interface NotificationRequest {
  _id: string;
  user_id: string;
}
export async function createNotifications(
  userId: string,
  type: string,
  title: string,
  message: string,
  data: object = {}
) {
  try {
    const notification = await NotificationModel.create({
      user_id: userId,
      type,
      title,
      message,
      data,
    });
    return notification;
  } catch (error: any) {
    console.error("notification error", error);
  }
}
export const getNotifications = async (
  req: AuthenticatedUser,
  res: Response
) => {
  try {
    const userId = req.user?.uid; // Assuming you have the user ID in the request object

    //check is the user is authenticated and has a valid uid
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await UserModel.findOne({ firebaseUid: userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Fetch notifications for the user from your database
    const notifications: object[] = await NotificationModel.find({
      user_id: user._id,
    })
      .sort({ createdAt: -1 })
      .limit(20);

    //check if notifications does not exist
    if (!notifications) {
      return res.status(404).json({
        success: false,
        message: "No notifications found for the user",
      });
    }
    //check if the user has any notifications
    if (notifications.length === 0) {
      return res
        .status(200)
        .json({ success: true, data: { notifications: [] } });
    }

    //count the number of unread notifications for the user
    const unreadCount = await NotificationModel.countDocuments({
      user_id: user._id,
      isRead: false,
    });
    res
      .status(200)
      .json({ success: true, data: { notifications, unreadCount } });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch notifications" });
  }
};
export const markNotificationAsRead = async (
  req: AuthenticatedUser,
  res: Response
) => {
  try {
    const { notificationId } = req.body;
    const userId = req.user?.uid;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await UserModel.findOne({ firebaseUid: userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const notification = await NotificationModel.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found" });
    }

    res.status(200).json({ success: true, data: notification });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to mark notification as read" });
  }
};
