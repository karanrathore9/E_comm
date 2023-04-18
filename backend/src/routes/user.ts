import express from "express";
import User from "../models/user";
import {
  signup,
  signin,
  getUserById,
  updatePassword,
  updateUserById,
} from "../controller/user";
import { requireSignin } from "../middlewares/index";
import multer from "multer";
import shortid from "shortid";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
console.log(
  "hehehehehheheh oooohohohooh",
  path.join(path.dirname(__dirname), "uploads")
);

const upload = multer({ storage });
// console.log(upload,"this is uploadsmnfkdjnfkjgn+++===");

router.post("/signin", signin);

router.post("/signup", signup);

router.get("/user/:userId", getUserById);

router.put("/users/:userId", updatePassword);

router.put(
  "/users/update/:userId",
  upload.single("profilePicture"),
  updateUserById
);

export default router;
