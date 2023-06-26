import express from "express";
import {
  login,
  signup,
  checkSession,
  logout,
  leaderboard,
  getLevelQuestion, //   data,
  //   getAllData,
} from "../controllers/user-controller.js";
import Joi from "@hapi/joi";
import { checkAdminAccess } from "../middleware/admin.middleware.js";
import { checkUserAccess } from "../middleware/user.middleware.js";

const router = express.Router();

//VALIDATION

/*
public routes
*/
router.post("/signup", signup);
router.post("/login", login);
router.get("/checkSession", checkSession);
router.get("/leaderboard", leaderboard);

/*
user routes
*/
router.get("/getUserLevel", checkUserAccess, getLevelQuestion);
router.post("/logout", checkUserAccess, logout);
export default router;
