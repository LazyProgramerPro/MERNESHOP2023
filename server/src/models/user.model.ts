import { Document, Model, model, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: Date;
  picture?: string;
  role?: string;
}

export let UserSchema: Schema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    picture: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: String,
    //wishlist: [{ type: ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

export const User: Model<IUser> = model<IUser>("User", UserSchema);
