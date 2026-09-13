//schema for products
import mongoose, { Schema, Document } from "mongoose";

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
interface Products {
    _id: mongoose.Schema.Types.ObjectId;
    seller: mongoose.Schema.Types.ObjectId;
    name: string;
    more_details: string;
    coverImageUrl: string;
    fileUrl: string;
    description: string;
    price: number;
    discount?: number;
    collection: mongoose.Schema.Types.ObjectId | null;
    createdAt: Date;
    updatedAt: Date;
}
const productSchema = new Schema<Products>({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    more_details: {
        type: String,
        required: true,
    },
    coverImageUrl: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
        required: true, 
    },  
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: null,
    },
    collection: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
        default: null,
    }}, { timestamps: true });

const ProductModel = mongoose.model<Products>("Product", productSchema);
export default ProductModel;

