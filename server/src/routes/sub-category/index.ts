import express from "express";

import { checkAdmin, checkAuth } from "../../middlewares/auth.middleware";
import {
  createCategory,
  deleteCategory,
  getCategory,
  getListCategories,
  updateCategory,
} from "../../controllers/sub-category.controller";

export default (router: express.Router) => {
  router.post("/sub-category", checkAuth, checkAdmin, createCategory);
  router.get("/sub-categories", getListCategories);
  router.get("/sub-category/:slug", checkAuth, checkAdmin, getCategory);
  router.put("/sub-category/:slug", checkAuth, checkAdmin, updateCategory);
  router.delete("/sub-category/:slug", checkAuth, checkAdmin, deleteCategory);
};
