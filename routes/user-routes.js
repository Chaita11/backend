import express from "express";
import {
  getAllUser,
  getEventData,
  login,
  signup,
  addEventData,
  getSingleEvent,
  checkSession,
  dashboard,
  getDashboardData,
  logout, //   data,
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
router.get("/get-events", getEventData);

router.get("/checkSession", checkSession);
/*
admin routes
*/
router.get("/", checkAdminAccess, getAllUser);
router.post("/add-event", checkAdminAccess, addEventData);
router.get("/get-dashboard", checkAdminAccess, getDashboardData);
/*
user routes
*/
router.get("/get-event/:eventId", checkUserAccess, getSingleEvent);
router.post("/dashboard", checkUserAccess, dashboard);
router.post("/logout", checkUserAccess, logout);
export default router;
