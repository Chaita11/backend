import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import cors from "cors";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

const corsOptions = {
  credentials: true,
  origin: true,
};

app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(cookieParser());
app.use("/api/user", router);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => app.listen(5000))
  .then(() => console.log("connected to database and listening to port 5000"))
  .catch((err) => console.log(err));
//X6xXfPqBu9jtXQB1
