import express from "express";
const collectionRouter = express.Router();
import {
  addCollectionController,
  getCollectionsController,
  getCollectionByIdController,
  getCollectionProductsController,
  updateCollectionController,
  deleteCollectionController,
} from "../controllers/collectionController.js";
import auth from "../middleware/Auth.js";
import roleAuth from "../middleware/RoleAuth.js";

// Public routes (no auth required)
collectionRouter.get("/", getCollectionsController);
collectionRouter.get("/:id", getCollectionByIdController);
collectionRouter.get("/:id/products", getCollectionProductsController);

// Admin only routes
collectionRouter.post("/add", auth, roleAuth("ADMIN"), addCollectionController);
collectionRouter.put(
  "/:id",
  auth,
  roleAuth("ADMIN"),
  updateCollectionController
);
collectionRouter.delete(
  "/:id",
  auth,
  roleAuth("ADMIN"),
  deleteCollectionController
);

export default collectionRouter;
