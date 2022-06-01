import Product from "../models/Product.model.js";
import User from "../models/User.model.js";

export const CreateProduct = async (req, res, next) => {
  const product = new Product(req.body);
  try {
    await product.save();
    res.status(200).json({ state: "OK" });
  } catch (error) {
    next(error);
  }
};
export const UpdateProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json({ state: "OK" });
  } catch (error) {
    next(error);
  }
};
export const DeleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ state: "OK" });
  } catch (error) {
    next(error);
  }
};
export const GetOneProduct = async (req, res, next) => {
  try {
    const productget = await Product.findById(req.params.id);
    res.status(200).json(productget);
  } catch (error) {
    next(error);
  }
};
export const GetAllProducts = async (req, res, next) => {
  try {
    const Products = await Product.find();
    res.status(200).json(Products);
  } catch (error) {
    next(error);
  }
};
export const GetFeaturedP = async (req, res, next) => {
  try {
    const Products = await Product.find(req.query).limit(req.query.limit);
    res.status(200).json(Products);
  } catch (error) {
    next(error);
  }
};
export const GetSearchP = async (req, res, next) => {
  try {
    const Products = await Product.find(req.query);
    res.status(200).json(Products);
  } catch (error) {
    next(error);
  }
};
export const Wish = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.wishid);
    const wishlist = await User.findByIdAndUpdate(
      req.params.id,
      {
        $push: { wishlist: product },
      },
      { new: true }
    );
    const { password, email, isAdmin, ...other } = wishlist._doc;
    res.status(200).json({ ...other });
  } catch (error) {
    next(error);
  }
};
export const WishDel = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { wishlist } = user;

    const newWish = await wishlist.filter(
      (wish) => wish._id != req.params.wishid
    );

    const newUser = await User.findByIdAndUpdate(req.params.id, {
      wishlist: newWish,
    });
    const { password, email, isAdmin, ...other } = newUser._doc;
    res.status(200).json({ ...other });
  } catch (error) {
    next(error);
  }
};
