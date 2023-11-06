import { Product } from "../../types/product.type";
import request from "../request";

const ProductApi = {
  createProduct(body: Product) {
    return request.post("/product", body);
  },

  getListProducts(count: number) {
    return request.get(`/products/${count}`);
  },

  getProductCount() {
    return request.get(`/products/total`);
  },

  getAllProducts(sort: string, order: string, page: number) {
    return request.post(`/products`, {
      sort,
      order,
      page,
    });
  },

  getProduct(slug: string | undefined) {
    return request.get(`/product/${slug}`);
  },

  updateProduct(slug: string, body: Product) {
    return request.put(`/product/${slug}`, body);
  },

  deleteProduct(slug: string) {
    return request.delete(`/product/${slug}`);
  },
};

export default ProductApi;
