import express from "express";

import {
  createProduct,
  deleteProduct,
  getListProduct,
  getProduct,
  updateProduct,
  getAllProduct,
  productsCount,
  productStar,
  getProductsRelated
} from "../../controllers/product.controller";
import { checkAdmin, checkAuth } from "../../middlewares/auth.middleware";

export default (router: express.Router) => {
  router.post("/product", checkAuth, checkAdmin, createProduct);
  router.get("/products/total", productsCount);
  router.get("/products/:count", getListProduct);
  router.get("/product/:slug", getProduct);
  router.put("/product/:slug", checkAuth, checkAdmin, updateProduct);
  router.delete("/product/:slug", checkAuth, checkAdmin, deleteProduct);
  router.delete("/product/:slug", checkAuth, checkAdmin, deleteProduct);
  router.post("/products", getAllProduct); // sort, order, limit

  //Rating
  router.delete("/product/star/:productId", checkAuth, productStar); // chỉ cần đăng nhập không cần Admin

  //Related
  router.get("/product/related/:productId", getProductsRelated);
};
