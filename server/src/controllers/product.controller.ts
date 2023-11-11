import express from "express";

import slugify from "slugify";
import { Product } from "./../models/product.model";
import { get } from "lodash";
import { IUser, User } from "models/user.model";

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

// Rating

export const productStar = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { productId } = req.params;

    const { email } = get(req, "user") as IUser; // thêm lúc đi qua checkAuth

    const productRating = await Product.findById(productId).exec();

    const userRating = await User.findOne({ email }).exec();

    // Kiểm tra xem ai đang update.Check currently logged user, check để thêm mới, sửa hoặc add thêm 1 Object vào mảng

    const { star } = req.body;

    const existRatingOj = productRating?.ratings.find(
      (r) => r.postedBy.toString() === userRating?._id
    );

    //tồn tại thì cập nhập, không thì thêm mới

    if (existRatingOj === undefined) {
      let ratingAdd = await Product.findByIdAndUpdate(
        productRating?._id,
        {
          $push: {
            ratings: {
              star,
              postedBy: userRating?._id,
            },
          },
        },
        { new: true } // nếu sử dụng thì giá trị ratingAdd sẽ trả về giá trị sau khi đc update
      ).exec();

      res.json(ratingAdd);
    } else {
      const ratingUpdate = await Product.updateOne(
        {
          ratings: {
            $elemMatch: existRatingOj,
          },
        },
        {
          $set: {
            "ratings.$.star": star, // dấu $ là chỉ số cho vị trí đã tìm thấy ở ratings
          },
        },
        { new: true }
      ).exec();

      res.json(ratingUpdate);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getProductsRelated = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId).exec();

    //Tìm kiếm các sản phẩm liên quan nhưng ko bao gồm sản phẩm hiện tại

    const related = await Product.find({
      _id: { $ne: product._id },
      category: product?.category,
    })
      .limit(3)
      .populate("category")
      .populate("subCategory")
      // .populate("postedBy", "_id"); //lấy 1 phần thông tin người dùng
      .populate("postedBy") //lấy toàn bộ phần thông tin người dùng
      // .populate("postedBy","-password"); //lấy toàn bộ phần thông tin người dùng trừ pass
      .exec()
  } catch (error) {
    res.status(400).send(error.message);
  }
};
