import User from "../models/User.model.js";
import { fileUpload } from "../index.js";
import fs from "fs-extra";
import { CreateError } from "../utils/error.js";

export const UpdateUser = async (req, res, next) => {
  try {
    const newUpdated = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const { email, password, isAdmin, ...other } = newUpdated._doc;
    res.status(200).json({ ...other });
  } catch (error) {
    next(CreateError(500, "Something is wrong."));
  }
};
export const DeleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ state: "OK" });
  } catch (error) {
    next(CreateError(500, "This user could not be deleted. Try again."));
  }
};

export const GetOneUser = async (req, res, next) => {
  try {
    const getUser = await User.findById(req.params.id);
    const { password, email, isAdmin, ...other } = getUser._doc;
    res.status(200).json({ ...other });
  } catch (error) {
    next(CreateError(500, "User not found."));
  }
};
export const GetAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
export const UpdateImage = async (req, res, next) => {
  const { image } = req.files;
  const result = await fileUpload(image.tempFilePath);
  const imgurl = result.secure_url;
  try {
    const newImage = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          image: imgurl,
        },
      },
      { new: true }
    );
    const { email, password, isAdmin, ...other } = newImage._doc;
    await fs.unlink(image.tempFilePath);
    res.status(200).json({ ...other });
  } catch (error) {
    next(CreateError(500, "The image could not be updated. Try again."));
  }
};
