import { Router } from "express";
import {
  getNotifications,
  markNotificationAsRead,
} from "../controllers/notification.controller.js";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseToken.js";

const notificationRouter = Router();
notificationRouter.get(
  "/get-notifications",
  verifyFirebaseToken,
  getNotifications
);

notificationRouter.put(
  "/mark-as-read",
  verifyFirebaseToken,
  markNotificationAsRead
);

export default notificationRouter;
