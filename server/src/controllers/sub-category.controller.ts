import express from "express";
import { SubCategory } from "../models/sub-category.model";

import slugify from "slugify";
import { Product } from "../models/product.model";

export const createCategory = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, parent } = req.body;

    const category = await new SubCategory({
      name,
      slug: slugify(name),
      parent,
    }).save();

    res.json(category);
  } catch (error) {
    res.status(400).send("Create category failed: " + error.message);
  }
};

export const getListCategories = async (
  req: express.Request,
  res: express.Response
) => {
  const listCategories = await SubCategory.find({})
    .populate("parent", "name") // tham chiều lấy danh sách các trường
    .sort({ createdAt: -1 })
    .lean()
    .exec();

  res.json(listCategories);
};

export const getCategory = async (
  req: express.Request,
  res: express.Response
) => {
  const { slug } = req.params;

  try {
    const subCategory = await SubCategory.findOne({ slug }).exec();

    const products = await Product.find({ subCategory })
    .populate("category")
    // .populate("postedBy", "_id name")
    .exec();

    res.json({
      subCategory,
      products
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateCategory = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, parent } = req.body;
    const { slug } = req.params;
    const updateCategory = await SubCategory.findOneAndUpdate(
      { slug },
      { name, slug: slugify(name), parent },
      { new: true }
    ).exec();
    res.json(updateCategory);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteCategory = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { slug } = req.params;
    const categoryDelete = await SubCategory.findOneAndDelete({ slug }).exec();
    res.json(categoryDelete);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
