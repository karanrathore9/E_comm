import express, { NextFunction, Request, Response } from "express";
import envData from "../utils/utils.env";
import jwt from "jsonwebtoken";

export const requireSignin = (req: any, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, envData.jwt_secret);
    req.user = user;
    console.log(user,"fdfgdfgdfgdfgdf");
    next();
  } else
    res.status(400).json({
      message: "Authorization required",
    });
};

export const userMiddleware = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, envData.jwt_secret);
  req.user = user;
  res.locals.user = user;

  if (req.user.role != "user") {
    return res.status(400).json({ message: " User Access denied" });
  }
  next();
};

export const adminMiddleware = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, envData.jwt_secret);
  req.user = user;
  res.locals.user = user;

  if (req.user.role != "admin") {
    return res.status(400).json({ message: " Admin Access denied" });
  }
  next();
};
