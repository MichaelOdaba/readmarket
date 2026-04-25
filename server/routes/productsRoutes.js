import express from "express";
import {
  getAllProductsController,
  getProductsById,
  uploadProductController,
  downloadProductController,
} from "../controllers/productsController.js";
import auth from "../middleware/Auth.js";
import optionalAuth from "../middleware/OptionalAuth.js";

const productsRouter = express.Router();

/**
 * GET /api/products - Fetch all products
 * Public endpoint - no authentication required
 */
productsRouter.get("/", getAllProductsController);

/**
 * GET /api/products/:productId - Fetch a single product by ID
 * Public endpoint
 */
productsRouter.get("/:productId", getProductsById);

/**
 * POST /api/products/upload - Upload a new product
 * Protected endpoint - requires authentication
 * Seller is automatically assigned from the authenticated user
 */
productsRouter.post("/upload", auth, uploadProductController);

/**
 * GET /api/products/:productId/download - Download a product file
 * Optional authentication - free products accessible to all, paid products require purchase
 * Validates purchase for paid products
 */
productsRouter.get(
  "/:productId/download",
  optionalAuth,
  downloadProductController
);

export default productsRouter;
