import express from "express";
import admin from "../firebase";
import { get, merge } from "lodash";
import { IUser, User } from "../models/user.model";

export const checkAuth = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { authtoken } = req.headers;

  try {
    // không import admin trực tiếp từ firebase

    const firebaseUser = await admin.auth().verifyIdToken(authtoken as string);

    //Add user to req

    merge(req, { user: firebaseUser });

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(401).json({ error: "Invalid or expired token !!!" });
  }
};

// Check permission

export const checkAdmin = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // Sau khi chạy qua MW checkAuth sẽ có thông tin user

  const { email } = get(req, "user") as IUser;
  
  const currentUser = await User.findOne({ email }).exec();

  if (currentUser?.role !== "admin") {
    res.status(403).json({ error: "Admin resource.Access denied." });
  } else {
    next();
  }
};
