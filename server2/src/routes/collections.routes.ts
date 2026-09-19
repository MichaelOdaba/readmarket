//routes for collections

import { Router } from "express";
import { addCollection, editCollection, getAllCollections, getCollectionById, getCollectionProducts } from "../controllers/collections.controller.js";
import requireAdmin from "../middleware/requireAdmin.js";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseToken.js";

const collectionsRouter = Router();
collectionsRouter.get("/get-collections", getAllCollections);
collectionsRouter.get("/get-collection/:id", getCollectionById);
collectionsRouter.get("/get-collection/:id/products", getCollectionProducts)
collectionsRouter.put("/edit-collection/:id", verifyFirebaseToken, requireAdmin, editCollection);
collectionsRouter.post("/add-collection",verifyFirebaseToken, requireAdmin, addCollection);
export default collectionsRouter;
