import express from "express";

import slugify from "slugify";
import { Product } from "./../models/product.model";

export const createProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { body } = req;

    body.slug = slugify(body.name);

    const product = await new Product(body).save();

    res.json(product);
  } catch (error) {
    res.status(400).send("Create product failed: " + error.message);
  }
};

export const productsCount = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let total = await Product.find({}).estimatedDocumentCount().lean().exec();

    res.json(total);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getListProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { count } = req.params;
    const products = await Product.find({})
      .limit(parseInt(count))
      .populate("category")
      .populate("subCategory")
      .sort([["createdAt", "desc"]])
      .lean()
      .exec();

    res.json(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// không phân trang
// export const getAllProduct = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     // createdAt", "desc bla
//     const { sort, limit, order } = req.body;

//     const products = await Product.find({})
//       .populate("category")
//       .populate("subCategory")
//       .sort([[sort, order]])
//       .limit(limit)
//       .lean()
//       .exec();

//     res.json(products);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };

// phân trang
export const getAllProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // createdAt", "desc bla
    const { sort, order, page } = req.body;

    const currentPage = page || 1;

    const perPage = 5;

    const products = await Product.find({})
      .skip((currentPage - 1) * perPage) //bỏ những thức có thể loại bỏ đi để làm công việc khác nhằm mục đích tăng tốc độ truy vấn
      .populate("category")
      .populate("subCategory")
      .sort([[sort, order]])
      .limit(perPage)
      .lean()
      .exec();

    console.log(sort, order, page);
    console.log(products);

    res.json(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { slug } = req.params;
    const productDelete = await Product.findOneAndDelete({ slug }).exec();

    //Sử lí xóa toàn bộ subs category ???
    res.json(productDelete);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug })
      .populate("category")
      .populate("subCategory")
      .lean()
      .exec();
    res.json(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { body } = req;
    const { slug } = req.params;
    if (body.name) {
      body.name = slugify(body.name);
    }
    const updateProduct = await Product.findOneAndUpdate({ slug }, body, {
      new: true,
    }).exec();
    res.json(updateProduct);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
