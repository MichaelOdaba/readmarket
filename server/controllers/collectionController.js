import collectionModel from "../models/collectionModel.js";
import productsModel from "../models/productsModel.js";
import mongoose from "mongoose";

// GET all collections
export async function getCollectionsController(req, res) {
  try {
    const collections = await collectionModel.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Collections fetched successfully",
      success: true,
      data: collections,
      count: collections.length,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while fetching collections",
      success: false,
      error: error.message,
    });
  }
}

// GET single collection by ID
export async function getCollectionByIdController(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid collection ID",
        success: false,
      });
    }

    const collection = await collectionModel.findById(id);

    if (!collection) {
      return res.status(404).json({
        message: "Collection not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Collection fetched successfully",
      success: true,
      data: collection,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while fetching the collection",
      success: false,
      error: error.message,
    });
  }
}

// GET products in a collection with pagination and filtering
export async function getCollectionProductsController(req, res) {
  try {
    const { id } = req.params;
    const { page = 1, limit = 12, sort = "-createdAt" } = req.query;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid collection ID",
        success: false,
      });
    }

    const collection = await collectionModel.findById(id);
    if (!collection) {
      return res.status(404).json({
        message: "Collection not found",
        success: false,
      });
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await productsModel
      .find({
        collection: id,
        publish: true,
      })
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const totalProducts = await productsModel.countDocuments({
      collection: id,
      publish: true,
    });

    return res.status(200).json({
      message: "Products fetched successfully",
      success: true,
      data: products,
      collection: collection,
      pagination: {
        totalProducts,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalProducts / parseInt(limit)),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while fetching products",
      success: false,
      error: error.message,
    });
  }
}

// CREATE collection (Admin only)
export async function addCollectionController(req, res) {
  try {
    const { name, image, description } = req.body;
    if (!name || !image || !description) {
      return res.status(400).json({
        message: "name, image and description are required",
        success: false,
      });
    }

    const newCollection = await collectionModel.create({
      name,
      image,
      description,
    });
    return res.status(201).json({
      message: "Collection created successfully",
      success: true,
      data: newCollection,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while creating the collection",
      success: false,
      error: error.message,
    });
  }
}

// UPDATE collection (Admin only)
export async function updateCollectionController(req, res) {
  try {
    const { id } = req.params;
    const { name, image, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid collection ID",
        success: false,
      });
    }

    const collection = await collectionModel.findById(id);
    if (!collection) {
      return res.status(404).json({
        message: "Collection not found",
        success: false,
      });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (image !== undefined) updateData.image = image;
    if (description !== undefined) updateData.description = description;

    const updatedCollection = await collectionModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return res.status(200).json({
      message: "Collection updated successfully",
      success: true,
      data: updatedCollection,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while updating the collection",
      success: false,
      error: error.message,
    });
  }
}

// DELETE collection (Admin only)
export async function deleteCollectionController(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid collection ID",
        success: false,
      });
    }

    const collection = await collectionModel.findById(id);
    if (!collection) {
      return res.status(404).json({
        message: "Collection not found",
        success: false,
      });
    }

    // Remove collection reference from all products
    await productsModel.updateMany(
      { collection: id },
      { $pull: { collection: id } }
    );

    await collectionModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Collection deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while deleting the collection",
      success: false,
      error: error.message,
    });
  }
}
