import notificationModel from "../models/notificationModel.js";

export async function getNotificationsController(req, res) {
  try {
    const userId = req.userId;

    const notifications = await notificationModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(20);

    const unreadCount = await notificationModel.countDocuments({
      userId,
      isRead: false,
    });

    return res.status(200).json({
      message: "notifications fetched successfully",
      success: true,
      data: {
        notifications,
        unreadCount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "an error occurred while fetching notifications",
      success: false,
      error: error.message,
    });
  }
}

export async function markNotificationAsReadController(req, res) {
  try {
    const { notificationId } = req.body;

    if (!notificationId) {
      return res.status(400).json({
        message: "notification id is required",
        success: false,
      });
    }

    const updatedNotification = await notificationModel.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({
        message: "notification not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "notification marked as read",
      success: true,
      data: updatedNotification,
    });
  } catch (error) {
    return res.status(500).json({
      message: "an error occurred while marking notification as read",
      success: false,
      error: error.message,
    });
  }
}

export async function createNotificationController(userId, type, title, message, data = {}) {
  try {
    const notification = await notificationModel.create({
      userId,
      type,
      title,
      message,
      data,
    });
    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
  }
}
