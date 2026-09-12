//routes for collections

import { Router } from "express";
import { addCollection, getAllCollections } from "../controllers/collections.controller.js";
import requireAdmin from "../middleware/requireAdmin.js";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseToken.js";

const collectionsRouter = Router();
collectionsRouter.get("/get-collections", getAllCollections);
collectionsRouter.post("/add-collection",verifyFirebaseToken, requireAdmin, addCollection);
export default collectionsRouter;
