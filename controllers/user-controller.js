import bcrypt from "bcryptjs";
import User from "../model/User.js";
import jwt from "jsonwebtoken";
import Data from "../model/Data.js";
import cookieParser from "cookie-parser";
import Dashboard from "../model/Dashboard.js";

export const dashboard = async (req, res, next) => {
  const token = req.cookies.sessionCookie;

  const {
    team,
    ve,
    webd,
    code,
    digitalI,
    photography,
    keynote,
    gaming,
    gd,
    surprise,
    quiz,
    id,
  } = req.body;

  let existingTeam;
  try {
    existingTeam = await Dashboard.findOne({ team });
  } catch (error) {
    return console.log(error);
  }
  if (existingTeam) {
    res.status(400).json({ message: "Team already exists!" });
  }
  const registration = new Dashboard({
    team: req.body.team,
    ve: req.body.ve,
    webd: req.body.webd,
    code: req.body.code,
    digitalI: req.body.digitalI,
    photography: req.body.photography,
    keynote: req.body.keynote,
    gaming: req.body.gaming,
    gd: req.body.gd,
    surprise: req.body.surprise,
    quiz: req.body.quiz,
    id: token,
  });
  try {
    await registration.save();
    return res.status(200).json({
      message: "Registration successful!",
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Some Error Occurred",
      success: false,
    });
  }
};

export const getDashboardData = async (req, res, next) => {
  try {
    const dashboardStudents = await Dashboard.find();

    return res.status(200).json(dashboardStudents);
  } catch (error) {
    return console.log(error);
  }
};

export const getEventData = async (req, res, next) => {
  try {
    const events = await Data.find();

    return res.status(200).json(events);
  } catch (error) {
    return console.log(error);
  }
};

export const addEventData = async (req, res, next) => {
  try {
    const {
      title,
      subheading,
      body,
      btn,
      img,
      head,
      domain,
      team,
      participants,
      pf,
      icons,
      id,
    } = req.body;

    const newEvent = new Data({
      title,
      subheading,
      body,
      btn,
      img,
      head,
      domain,
      team,
      participants,
      pf,
      icons,
      id,
    });
    await newEvent.save();
    return res.status(200).json({
      message: "Added new event",
    });
  } catch (error) {
    return console.log(error);
  }
};

export const getSingleEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    if (!eventId) {
      return res.status(404).json({
        message: "ID not provided",
      });
    }

    const event = await Data.findOne({
      _id: eventId,
    });

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    return res.status(200).json(event);
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Event not found, please try again",
    });
  }
};

// export const data = async (req, res, next) => {
//   const { subheading, body, btn, img, head, domain, team, pf, icons, id } =
//     req.body;
// };

export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    return console.log(error);
  }

  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const {
    schoolname,
    email,
    teamname,
    teachername,
    studentname,
    password,
    token: generateToken,
  } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (existingUser) {
    res.status(400).json({ message: "User already exists!" });
  }

  const hashedPassword = bcrypt.hashSync(password);

  const user = new User({
    schoolname,
    teamname,
    teachername,
    studentname,
    email,
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
    const { email, password } = req.body;

    if (email === null) {
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
      email,
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
        teamname: userExists.teamname,
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

export const logout = async (req, res) => {
  const decoded = jwt.verify(sessionCookie, process.env.JWT_SECRET);

  try {
    res.clearCookie("sessionCookie");
    res.redirect("/login"); // Redirect to the login page or any other desired page
  } catch (error) {
    return null;
  }
};
