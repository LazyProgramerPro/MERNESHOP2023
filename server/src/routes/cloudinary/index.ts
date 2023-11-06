import express from "express";

import {
  removeImage,
  uploadImages,
} from "../../controllers/cloudinary.controller";
import { checkAdmin, checkAuth } from "../../middlewares/auth.middleware";

export default (router: express.Router) => {
  router.post("/upload-images", checkAuth, checkAdmin, uploadImages);
  router.post("/remove-image", checkAuth, checkAdmin, removeImage);
};
