import express from "express";
import auth from "./auth";
import category from "./category";
import subCategory from "./sub-category";
import product from "./product";
import cloudinary from "./cloudinary";

const router = express.Router();

export default (): express.Router => {
  auth(router);
  category(router);
  subCategory(router);
  product(router);
  cloudinary(router);
  return router;
};
