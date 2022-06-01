import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CreateError } from "../utils/error.js";

export const Login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).json(CreateError(404, "User not found"));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(CreateError(400, "Wrong password. Try Again."));
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET
    );
    const { password, isAdmin, ...other } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...other });
  } catch (error) {
    next(error);
  }
};
export const Register = async (req, res, next) => {
  try {
    const { username, email, password, age } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({
      username,
      email,
      age,
      password: hash,
    });
    await newUser.save();
    res.status(200).json({ state: "OK" });
  } catch (error) {
    next(CreateError(500, "User or email already exist, try again."));
  }
};
export const Logout = async (req, res, next) => {
  try {
    res
      .cookie("access_token", { expires: new Date(0) })
      .status(200)
      .json({ state: "OK" });
  } catch (error) {
    next(error);
  }
};
