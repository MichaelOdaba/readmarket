//router for products
import { Router } from "express";
import {  getAllProducts, getProductById, uploadProduct } from "../controllers/products.controller.js";
import { requireVerifyEmail } from "../middleware/requireVerifyEmail.js";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseToken.js";

const productsRouter = Router();
productsRouter.post("/upload-product", verifyFirebaseToken, requireVerifyEmail, uploadProduct);
productsRouter.get("/get-all-products", getAllProducts);
productsRouter.get("/get-product/:id", getProductById);

export default productsRouter;