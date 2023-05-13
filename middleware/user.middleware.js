import User from "../model/User.js";
import jwt from "jsonwebtoken";

export const checkUserAccess = (req, res, next) => {
  const sessionCookie = req.cookies.sessionCookie;

  try {
    // Verify the JWT token
    const decoded = jwt.verify(sessionCookie, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(400).json({
        message: "Session not found!",
        success: false,
      });
    }

    const userID = decoded._id;

    const user = User.findById(userID);

    if (!user) {
      return res.status(400).json({
        message: "User not found!",
        success: false,
      });
    }

    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Some error occured.",
      success: false,
    });
  }
};
