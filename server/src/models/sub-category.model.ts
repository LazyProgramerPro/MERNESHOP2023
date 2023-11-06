import { Document, Model, model, Schema, Types } from "mongoose";

export interface ISubCategory extends Document {
  name?: string;
  slug?: string;
}

export let SubCategorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: [2, "Too short"],
      maxlength: [32, "Too long"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    parent: { type: Types.ObjectId, ref: "Category", require: true },
  },
  { timestamps: true }
);

export const SubCategory: Model<ISubCategory> = model<ISubCategory>(
  "SubCategory",
  SubCategorySchema
);
