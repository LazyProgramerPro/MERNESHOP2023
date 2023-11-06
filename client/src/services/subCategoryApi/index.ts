import { SubCategory } from "../../types/sub-category.type";
import request from "../request";

const SubCategoryApi = {
  createCategory(body: SubCategory) {
    return request.post("/sub-category", body);
  },

  getListCategories() {
    return request.get("/sub-categories");
  },

  getCategory(slug: string | null) {
    return request.get(`/sub-category/${slug}`);
  },

  updateCategory(slug: string, body: SubCategory) {
    return request.put(`/sub-category/${slug}`, body);
  },

  deleteCategory(slug: string) {
    return request.delete(`/sub-category/${slug}`);
  },
};

export default SubCategoryApi;
