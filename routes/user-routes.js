import express from "express";
import {
  getAllUser,
  getEventData,
  login,
  signup,
  addEventData,
  getSingleEvent,
  checkSession, //   data,
  //   getAllData,
} from "../controllers/user-controller.js";
import Joi from "@hapi/joi";
import requireAuth from "../middleware/authMiddleware.js";

const router = express.Router();

//VALIDATION
router.get("/", getAllUser);
router.post("/signup", signup);
router.post("/login", login);
router.get("/get-events", getEventData);
router.post("/add-event", addEventData);
router.get("/get-event/:eventId", getSingleEvent);
router.get("/checkSession", checkSession);

export default router;
