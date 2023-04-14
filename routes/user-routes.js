import express from "express";
import {
  getAllUser,
  getEventData,
  login,
  signup,
  addEventData,
  getSingleEvent,
  //   data,
  //   getAllData,
} from "../controllers/user-controller.js";
import Joi from "@hapi/joi";

const router = express.Router();

//VALIDATION
router.get("/", getAllUser);
router.post("/signup", signup);
router.post("/login", login);
router.get("/get-events", getEventData);
router.post("/add-event", addEventData);
router.get("/get-event/:eventId", getSingleEvent);

export default router;
