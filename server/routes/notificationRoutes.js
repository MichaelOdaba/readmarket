import express from "express";
import {
  getNotificationsController,
  markNotificationAsReadController,
} from "../controllers/notificationController.js";
import auth from "../middleware/Auth.js";

const notificationRouter = express.Router();

notificationRouter.get("/", auth, getNotificationsController);
notificationRouter.put("/mark-as-read", auth, markNotificationAsReadController);

export default notificationRouter;
