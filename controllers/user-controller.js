import bcrypt from "bcryptjs";
import User from "../model/User.js";
import jwt from "jsonwebtoken";
import Question from "../model/Question.js";

export const signup = async (req, res, next) => {
  const { email, schoolname, username, name, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return res.status(400);
  }
  if (existingUser) {
    return res.status(400).json({ message: "User already exists!" });
  }

  const hashedPassword = bcrypt.hashSync(password);

  const user = new User({
    email,
    schoolname,
    username,
    name,
    password: hashedPassword,
  });
  try {
    await user.save();
    return res
      .status(200)
      .json({ message: "Registration successful!", success: true });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Some Error Occurred",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username === null) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    if (password === null) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    const userExists = await User.findOne({
      username,
    });

    if (!userExists) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const passwordIsValid = await bcrypt.compare(password, userExists.password);

    console.log(passwordIsValid);

    if (!passwordIsValid) {
      return res.status(400).json({
        message: "Password Invalid",
      });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return res.status(400).json({
        message: "No JWT Secret",
      });
    }

    const jwtToken = jwt.sign(
      {
        email: userExists.email,
        schoolname: userExists.schoolname,
        username: userExists.username,
        _id: userExists._id,
      },
      jwtSecret
    );
    res.cookie("sessionCookie", jwtToken, {
      httpOnly: false,
    });

    return res.status(200).json({
      token: jwtToken,
      success: true,
      message: "Login Successful",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const checkSession = async (req, res) => {
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

    return res.status(200).json({
      message: "Sucessfull!",
      success: true,
      data: decoded,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Some error occured!",
      success: false,
    });
  }
};

export const leaderboard = async (req, res, next) => {
  try {
    const users = await User.find({}, "username points").sort({ points: -1 });
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getLevelQuestion = async (req, res, next) => {
  try {
    const { userID } = res.locals;
    const loggedInUser = await User.findById(userID);
    console.log(loggedInUser);

    if (!loggedInUser) {
      return res.status(400).json({ message: "User not found!" });
    }
    const userLevel = loggedInUser.level;
    console.log(userLevel);
    // const questionLevel = Question.findOne(level: userLevel);
    console.log(questionLevel);
    console;
    // const users = await User.find({}, { answer: 0 }).sort({ points: -1 });
    // return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  const decoded = jwt.verify(sessionCookie, process.env.JWT_SECRET);

  try {
    res.clearCookie("sessionCookie");
    res.redirect("/login"); // Redirect to the login page or any other desired page
  } catch (error) {
    console.log(err);
    return res.status(400).json({
      message: "Some error occured!",
      success: false,
    });
  }
};
