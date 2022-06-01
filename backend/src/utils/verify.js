import { CreateError } from "./error.js";
import jwt from "jsonwebtoken";

export const VerifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(CreateError(401, "You are not authenticate"));

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) return next(CreateError(403, "Token not valid"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  VerifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(CreateError(403, "You are not authorized"));
    }
  });
};
export const verifyAdmin = (req, res, next) => {
  VerifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(CreateError(403, "You are not authorized"));
    }
  });
};
