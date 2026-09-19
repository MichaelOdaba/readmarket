//products controller
import { Request, Response } from "express";
import ProductModel from "../models/Products.js";
import CollectionModel from "../models/Collections.js";
import { UserModel } from "../models/User.js";
import { AuthenticatedUser } from "../types/user.types.js";

// Product {
//   _id: ObjectId
//   seller: ObjectId (ref: User)
//   title: string
//   description: string
//   coverImageUrl: string        (Cloudinary — folder: readmarket/product-covers)
//   fileUrl: string              (Cloudinary — folder: readmarket/product-files, resource_type: raw)
//   price: number
//   discountPrice: number | null
//   collection: ObjectId | null (ref: Collection)
//   createdAt: Date
//   updatedAt: Date
// }
//add product
export const uploadProduct = async (req: AuthenticatedUser, res: Response) => {
  try {
    const { name, description, price, coverImageUrl, fileUrl, more_details, collectionId } = req.body;
    const firebaseUid = req.user?.uid;

    if (!firebaseUid) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const seller = await UserModel.findOne({ firebaseUid });
    if (!seller) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

      //check if all fields are provided
    if (!name || !description || price === undefined || !coverImageUrl) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    //if the collectionId is not provided, return an error
    if (!collectionId) {
      return res.status(400).json({ success: false, message: "Collection ID is required" });
    }
    //check if the collection exists
    const collection = await CollectionModel.findById(collectionId);
    if (!collection) {
      return res.status(404).json({ success: false, message: "Collection not found" });
    }
    //file URL is required
    if (!fileUrl) {
      return res.status(400).json({ success: false, message: "File URL is required" });
    }
    //check if price is a valid number or less than 0
    if (isNaN(price) || price < 0) {
      return res.status(400).json({ success: false, message: "Price must be a valid number and greater than or equal to 0" });
    }

  
    const productData = {
      seller: seller._id,
      name,
      description,
      price,
      coverImageUrl,
      fileUrl,
      collectionId,
      ...(typeof more_details === "string" && more_details.trim()
        ? { more_details: more_details.trim() }
        : {}),
    };

    const newProduct = await ProductModel.create(productData);

    //create a new notification for the user about the successful upload
    const notification = {
      type: "UPLOAD",
      title: "Product Uploaded",
      message: `Your product "${name}" has been uploaded successfully.`,
      isRead: false,
      createdAt: new Date(),
    };

    //if the product is created successfully, return the product
    
    res.status(201).json({ message: "Product created successfully", success: true, data: newProduct });
  }catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error);
  }}

  //get all products
  export const getAllProducts = async (req: Request, res: Response) => {
    try{
      const products = await ProductModel.find().sort({ createdAt: -1 }).populate("seller", "firstName lastName avatar email").populate("collectionId", "name");
      res.status(200).json({ message: "Products retrieved successfully", success: true, data: products, count: products.length });
    }catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
  export const getProductById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const product = await ProductModel.findById(id).populate("seller", "firstName lastName avatar email").populate("collectionId", "name");
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product retrieved successfully", success: true, data: product });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }

  