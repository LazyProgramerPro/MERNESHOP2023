import express from "express";
import {
  createOrUpdateUser,
  getCurrentUser,
} from "../../controllers/auth.controller";
import { checkAdmin, checkAuth } from "../../middlewares/auth.middleware";

export default (router: express.Router) => {
  router.post("/create-or-update-user", checkAuth, createOrUpdateUser);
  router.get("/current-user", checkAuth, getCurrentUser);
  router.get("/current-admin", checkAuth, checkAdmin, getCurrentUser);
};
