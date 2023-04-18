import express from "express";
import Category from "../models/category";
import slugify from "slugify";
import { requireSignin, adminMiddleware } from "../middlewares/index";
import { addCategory, getCategories } from "../controller/category";
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

const upload = multer({ storage });

// router.post(
//   "/category/create",
//   requireSignin,
//   adminMiddleware,
//   upload.single("categoryImage"),
//   addCategory
// );
router.post(
  "/category/create",

  upload.single("categoryImage"),
  addCategory
);

router.get("/category/getCategory", getCategories);

export default router;
