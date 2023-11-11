import { Document, Model, model, Schema, Types } from "mongoose";

export interface IProduct extends Document {
  name?: string;
  slug?: string;
  description?: string;
  price?: number;
  category?: string;
  subCategory?: string;
  quantity?: number;
  ratings:any[]
}

export let ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    category: {
      type: Types.ObjectId,
      ref: "Category",
    },
    subCategory: [
      {
        type: Types.ObjectId,
        ref: "SubCategory",
      },
    ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Schema.Types.Mixed,
    },
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
    color: {
      type: String,
      enum: ["Black", "Brown", "Silver", "White", "Blue"],
    },
    brand: {
      type: String,
      enum: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
    },
    isPublished: { type: Boolean, default: false, index: true, select: false },
    ratings: [
      {
        star: Number,
        postedBy: { type: Types.ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

export const Product: Model<IProduct> = model<IProduct>(
  "Product",
  ProductSchema
);
