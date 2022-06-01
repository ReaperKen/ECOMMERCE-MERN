import { Router } from "express";
import {
  DeleteUser,
  GetAllUsers,
  GetOneUser,
  UpdateImage,
  UpdateUser,
} from "../controllers/user.controller.js";
import { verifyAdmin, verifyUser } from "../utils/verify.js";
const router = Router();

//Update User
router.put("/:id", verifyUser, UpdateUser);
router.put("/upload/:id", verifyUser, UpdateImage);
//Delete User
router.delete("/:id", verifyUser, DeleteUser);
//Get One
router.get("/find/:id", verifyUser, GetOneUser);
//Get All
router.get("/", verifyAdmin, GetAllUsers);
export default router;
