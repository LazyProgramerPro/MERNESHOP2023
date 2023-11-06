import express from "express";
import { get } from "lodash";
import { IUser, User } from "../models/user.model";

export const createOrUpdateUser = async (
  req: express.Request,
  res: express.Response
) => {
  const { name, picture, email } = get(req, "user") as IUser;

  // Nếu người dùng đã tồn tại thì find && update

  const user = await User.findOneAndUpdate(
    { email },
    { name, picture },
    { new: true } //trả về giá trị của user sau khi đã cập nhật
  );

  // Nếu người dùng chưa tồn tại thì trả về còn chưa  thì tạo mới

  if (user) {
    console.log("USER UPDATE:::", user);
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      picture,
      name,
    }).save();

    console.log("NEW USER:::", newUser);

    res.json(newUser);
  }
};

export const getCurrentUser = async (
  req: express.Request,
  res: express.Response
) => {
  const { email } = get(req, "user") as IUser;

  // Lấy người dùng
  const currentUser = await User.findOne({ email }).exec();
  
  if (!currentUser) {
    throw new Error();
  }
  res.json(currentUser);
};
