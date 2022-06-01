import { Router } from "express";
import {
  CreateProduct,
  DeleteProduct,
  GetAllProducts,
  GetOneProduct,
  UpdateProduct,
  GetFeaturedP,
  GetSearchP,
  Wish,
  WishDel,
} from "../controllers/product.controller.js";
import { verifyAdmin, verifyUser } from "../utils/verify.js";

const router = Router();

//CREATE PRODUCT
router.post("/", verifyAdmin, CreateProduct);
//UPDATE PRODUCT
router.put("/:id", verifyAdmin, UpdateProduct);
router.put("/wish/:id/:wishid", verifyUser, Wish);
router.put("/wishdel/:id/:wishid", verifyUser, WishDel);
//DELETE PRODUCT
router.delete("/:id", verifyAdmin, DeleteProduct);
//GET ONE PRODUCT
router.get("/find/:id", GetOneProduct);
//GET ALL PRODUCTS
router.get("/", GetAllProducts);
router.get("/featured", GetFeaturedP);
router.get("/search", GetSearchP);
export default router;
