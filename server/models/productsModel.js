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
    category: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "category",
      },
    ],
    sub_category: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "sub_category",
      },
    ],
    stock: {
      type: Number,
      default: 0,
    },
    unit: {
      type: String,
      default: 0,
    },
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
    name: 10,
    description: 5,
  }
);

const productsModel = mongoose.model("products", productsSchema);
export default productsModel;
