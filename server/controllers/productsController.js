import mongoose from "mongoose";
import productsModel from "../models/productsModel.js";
import orderModel from "../models/orderModel.js";

/**
 * Fetch all products with seller information
 * Useful for displaying products on homepage
 */
export async function getAllProductsController(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 20; // Optional limit query parameter

    const startIndex = parseInt(req.query.startIndex) || 0; // Optional pagination
    const searchQuery = req.query.query || ""; // Optional search query
    const products = await productsModel
      .find()
      .populate("seller", "firstName lastName email")
      .populate("collection", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Products fetched successfully",
      success: true,
      data: products,
      count: products.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || error,
      message: "An error occurred while fetching products",
    });
  }
}

/**
 * Fetch a single product by ID
 * Includes seller details and collection info
 */
export async function getProductsById(req, res) {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        message: "Invalid product ID",
        success: false,
      });
    }

    const product = await productsModel
      .findById(productId)
      .populate("seller", "firstName lastName email")
      .populate("collection", "name");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Product fetched successfully",
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || error,
      message: "An error occurred while fetching the product",
    });
  }
}

/**
 * Upload a new product
 * Requires: name, price, description, image, collection
 * Seller is automatically assigned from authenticated user
 */
export async function uploadProductController(req, res) {
  try {
    const {
      name,
      image,
      collection,
      price,
      description,
      more_details,
      fileUrl,
    } = req.body;
    const userId = req.userId; // From auth middleware

    // Validation: Check all required fields are provided
    if (
      !name ||
      price === undefined ||
      price === null ||
      !description ||
      !image ||
      !collection
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please fill all required fields: name, price, description, image, collection",
      });
    }

    // Validate price is a non-negative number (0 allowed for free products)
    if (isNaN(price) || price < 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be 0 or greater",
      });
    }

    // fileUrl is required — every product must have a downloadable file
    if (!fileUrl) {
      return res.status(400).json({
        success: false,
        message: "Please upload a product file (PDF)",
      });
    }

    // Create new product
    const newProduct = new productsModel({
      name: name.trim(),
      price: parseFloat(price),
      description: description.trim(),
      more_details: more_details?.trim() || "",
      image: Array.isArray(image) ? image : [image],
      collection: Array.isArray(collection) ? collection : [collection],
      seller: userId,
      fileUrl, // Cloudinary raw URL for the downloadable PDF
    });

    const savedProduct = await newProduct.save();

    // Populate seller and collection info before sending response
    await savedProduct.populate("seller", "firstName lastName email");
    await savedProduct.populate("collection", "name");

    return res.status(201).json({
      success: true,
      message: "Product uploaded successfully",
      data: savedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || error,
      message: "An error occurred while uploading the product",
    });
  }
}

export async function downloadProductController(req, res) {
  try {
    const { productId } = req.params;
    const userId = req.userId; // May be undefined for unauthenticated users

    // Find the product
    const product = await productsModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check product has a file
    if (!product.fileUrl) {
      return res.status(404).json({
        success: false,
        message: "No file available for this product",
      });
    }

    // Free product — anyone can download
    if (Number(product.price) === 0) {
      return res.status(200).json({
        success: true,
        fileUrl: product.fileUrl,
      });
    }

    // Paid product — user must be authenticated and have a purchase
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please log in to purchase and download this product",
      });
    }

    // Paid product — check if user has a confirmed order
    const order = await orderModel.findOne({
      user_id: userId,
      product_id: productId,
      payment_status: "paid",
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "Purchase required to download this product",
      });
    }

    return res.status(200).json({
      success: true,
      fileUrl: product.fileUrl,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || error,
      message: "An error occurred while processing your download",
    });
  }
}
export async function editProductController(req, res) {
  const userId = req.userId;
  const { productId } = req.params;
  const { name, price, description, more_details, publish } = req.body;

  try {
    // Validate productId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        message: "Invalid product ID",
        success: false,
      });
    }

    // Check authorization first (fetch minimal data)
    const product = await productsModel.findById(productId, "seller");
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    if (product.seller.toString() !== userId) {
      return res.status(403).json({
        message: "You are not authorized to edit this product",
        success: false,
      });
    }

    // Build update object
    const updateData = {};
    if (name !== undefined && name !== null) updateData.name = name.trim();

    if (price !== undefined) {
      if (isNaN(price) || price < 0) {
        return res.status(400).json({
          success: false,
          message: "Price must be 0 or greater",
        });
      }
      updateData.price = parseFloat(price);
    }

    if (description !== undefined && description !== null)
      updateData.description = description.trim();
    if (more_details !== undefined && more_details !== null)
      updateData.more_details = more_details.trim();
    if (publish !== undefined) updateData.publish = publish;

    // Single update operation with populated response
    const updatedProduct = await productsModel
      .findByIdAndUpdate(productId, updateData, {
        new: true,
        runValidators: true,
      })
      .populate("seller", "firstName lastName email")
      .populate("collection", "name");

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || error,
      message: "An error occurred while updating the product",
    });
  }
}
