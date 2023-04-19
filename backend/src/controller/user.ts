import express, { NextFunction, Request, Response } from "express";
import envData from "../utils/utils.env";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Joi from "joi";

import User, { IUser } from "../models/user";

// Joi validation schema for user signup
const signupSchema = Joi.object({
  firstName: Joi.string().min(3).max(20).required(),
  lastName: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const signup = async (req: Request, res: Response) => {
  // Validate request body using Joi schema
  const { error } = signupSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res
      .status(409)
      .send({ message: "User with given email already exist" });
  }

  const { firstName, lastName, email, password } = req.body;

  const _user = new User({
    firstName,
    lastName,
    email,
    password,
    userName: Math.random().toString(),
  });

  _user
    .save()
    .then((_user) => {
      return res.status(201).json({
        message: "user Created Successfully",
        user: _user,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        message: "Something Went Wrong",
      });
    });
};

// Joi validation schema for user signin
const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const signin = async (req: Request, res: Response) => {
  // Validate request body using Joi schema
  const { error } = signinSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (user.authenticate(req.body.password)) {
      const token = jwt.sign(
        { _id: user._id, role: user.role },
        envData.jwt_secret,
        {
          expiresIn: "32h",
        }
      );
      const {
        _id,
        firstName,
        lastName,
        email,
        role,
        fullName,
        contactNumber,
        profilePicture,
      } = user;
      res.status(200).json({
        token,
        user: {
          _id,
          firstName,
          lastName,
          email,
          role,
          fullName,
          contactNumber,
          profilePicture,
        },
      });
    } else {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }
  }
};

export const getUserById = (req: Request, res: Response) => {
  const userId = res.locals.user._id;
  console.log(userId,"🙌🙌");
  User.findOne({ _id: userId })
    .then((user) => {
      if (user) {
        res.status(200).json({ user });
      } else {
        res.status(404).json({ error: "Something Went Wrong !!" });
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = res.locals.user._id;
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.authenticate(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid current password" });
    }

    user.hash_password = bcrypt.hashSync(newPassword, 10); // set the hashed password value to the hash_password field
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const updateUserById = (req: Request, res: Response) => {
  const userId = res.locals.user._id;
  
  console.log(req.params.userId);
  console.log(req.body);
  // console.log("jhkjhfkjdhfkj+++===", req.file);
  // if (req.file) {
  //   const profileUrl = "http://localhost:2000/" + req.file.filename;
  // }
  let profileUrl;
  if (req.file) {
    profileUrl = "http://localhost:2000/" + req.file.filename;
  }

  User.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        contactNumber: req.body.contactNumber,
        profilePicture: profileUrl,
      },
    }
  )
    .then((user) => {
      if (user) {
        res.status(200).json({ user });
      } else {
        res.status(404).json({ error: "Somethig Went Wrong !!" });
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

