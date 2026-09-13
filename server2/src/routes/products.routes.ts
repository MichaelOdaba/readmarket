//router for products
import { Router } from "express";
import {  uploadProduct } from "../controllers/products.controller.js";
import { requireVerifyEmail } from "../middleware/requireVerifyEmail.js";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseToken.js";

const productsRouter = Router();
productsRouter.post("/upload-product", verifyFirebaseToken, requireVerifyEmail, uploadProduct);
export default productsRouter;