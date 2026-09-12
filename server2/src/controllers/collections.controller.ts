//controller for collections
import { Request, Response } from "express";
import CollectionModel from "../models/Collections.js";
//get all collections
export const getAllCollections = async (req: Request, res: Response) => {
  try {
    const collections = await CollectionModel.find().sort({ createdAt: -1 });
    res.status(200).json({message: "Collections retrieved successfully", success: true, data: collections , count: collections.length});
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//get a single collection by id
export const getCollectionById = async (req: Request, res: Response) => {
  try {} catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//add a new collection
export const addCollection = async (req: Request, res: Response) => {

  try {
const { name, image, description } = req.body;

    //check if the collection already exists
    const existingCollection = await CollectionModel.findOne({ name });
    if (existingCollection) {
      return res.status(400).json({ message: "Collection already exists" });
    }

    //create the new collection
    const newCollection = await CollectionModel.create({ name, image, description });
    res.status(201).json({ message: "Collection created successfully", success: true, data: newCollection });
    
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};