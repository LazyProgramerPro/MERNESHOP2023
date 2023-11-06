import express from "express";

import { checkAdmin, checkAuth } from "../../middlewares/auth.middleware";
import {
  createCategory,
  deleteCategory,
  getCategory,
  getListCategories,
  updateCategory,
  getSubCategories
} from "../../controllers/category.controller";

export default (router: express.Router) => {
  router.post("/category", checkAuth, checkAdmin, createCategory);
  router.get("/categories", getListCategories);
  router.get("/category/:slug", checkAuth, checkAdmin, getCategory);
  router.put("/category/:slug", checkAuth, checkAdmin, updateCategory);
  router.delete("/category/:slug", checkAuth, checkAdmin, deleteCategory);
  router.get("/category/sub-category/:_id", getSubCategories);
};
