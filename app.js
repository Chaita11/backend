import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", router);
// app.use(express.static(path.join(__dirname,"/my-app/.next")))
// app.get("*", function(req,res)=>{
//   res.sendFile(path.join(__dirname))
// })

//static files

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => app.listen(5000))
  .then(() => console.log("connected to database and listening to port 5000"))
  .catch((err) => console.log(err));
//X6xXfPqBu9jtXQB1
