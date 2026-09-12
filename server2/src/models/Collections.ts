//schema for collection
import { Collection } from "../types/collection.types.js"
import { Schema, model } from "mongoose";

const collectionSchema = new Schema<Collection>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

const CollectionModel = model<Collection>("Collection", collectionSchema);
export default CollectionModel;