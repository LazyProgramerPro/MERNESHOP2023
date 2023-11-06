import { Document, Model, model, Schema } from "mongoose";

export interface ICategory extends Document {
  name?:string;
  slug?:string;
}

export let CategorySchema: Schema = new Schema(
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
  },
  { timestamps: true }
);

export const Category: Model<ICategory> = model<ICategory>("Category", CategorySchema);
