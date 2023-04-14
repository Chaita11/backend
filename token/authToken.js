import jwt from "jsonwebtoken";

const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
res.header("auth-token", token).send(token);
