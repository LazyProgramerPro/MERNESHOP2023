import express from "express";
import { Category } from "../models/category.model";
import { SubCategory } from "../models/sub-category.model";

import slugify from "slugify";
import { Product } from "../models/product.model";

export const createCategory = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name } = req.body;

    const category = await new Category({ name, slug: slugify(name) }).save();

    res.json(category);
  } catch (error) {
    res.status(400).send("Create category failed: " + error.message);
  }
};

export const getListCategories = async (
  req: express.Request,
  res: express.Response
) => {
  const listCategories = await Category.find({}).sort({ createdAt: -1 }).exec();

  res.json(listCategories);
};

export const getCategory = async (
  req: express.Request,
  res: express.Response
) => {
  const { slug } = req.params;

  try {
    const category = await Category.findOne({ slug }).exec();

    const products = await Product.find({ category })
      .populate("category")
      // .populate("postedBy", "_id name")
      .exec();

    res.json({
      category,
      products,
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
    const { name } = req.body;
    const { slug } = req.params;
    const updateCategory = await Category.findOneAndUpdate(
      { slug },
      { name, slug: slugify(name) },
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
    const categoryDelete = await Category.findOneAndDelete({ slug }).exec();

    //Sử lí xóa toàn bộ subs category ???
    res.json(categoryDelete);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getSubCategories = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { _id } = req.params;
    const listSubCategories = await SubCategory.find({ parent: _id })
      .sort({ createdAt: -1 })
      .exec();

    res.json(listSubCategories);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
