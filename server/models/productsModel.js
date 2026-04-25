import mongoose from "mongoose";
const productsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      requires: [true, "provide name"],
    },
    image: {
      type: Array,
      default: [],
    },
    collection: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "collection",
      },
    ],
    sub_collection: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "subCollection",
      },
    ],
    price: {
      type: String,
      default: 0,
    },
    discount: {
      type: Number,
      default: null,
    },
    description: {
      type: String,
      default: "",
    },
    more_details: {
      type: String,
      default: "",
    },
    publish: {
      type: Boolean,
      default: true,
    },
    seller: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    fileUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

productsSchema.index(
  {
    name: "text",
    description: "text",
  },
  {
    weights: {
      name: 10,
      description: 5,
    },
  }
);

const productsModel = mongoose.model("products", productsSchema);
export default productsModel;
