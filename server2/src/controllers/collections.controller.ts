//controller for collections
import { Request, Response } from "express";
//get all collections
export const getAllCollections = async (req: Request, res: Response) => {
  try {} catch (error) {
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
  try {} catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};