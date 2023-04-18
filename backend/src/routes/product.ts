import express from "express";
import Product from "../models/product";
import slugify from "slugify";
import { requireSignin, adminMiddleware } from "../middlewares/index";
import {
  createProduct,
  deleteProductById,
  getProduct,
  getProductDetailsById,
  getProductsByCategory,
  searchProduct,
  // searchProductByKey,
  updateProductById,
} from "../controller/product";
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
// console.log("hehehehehheheh oooohohohooh",path.join(path.dirname(__dirname), "uploads"));
const upload = multer({ storage });

router.post(
  "/product/create",
  requireSignin,
  adminMiddleware,
  upload.array("productPicture"),
  createProduct
);
// router.post("/product/create", upload.single("productPicture"), createProduct);

router.get("/product/get/:category?", getProduct);
router.get("/products/get/:id", getProductDetailsById);
router.delete(
  "/product/delete/:id",
  requireSignin,
  adminMiddleware,
  deleteProductById
);
router.put(
  "/product/update/:id",
  requireSignin,
  adminMiddleware,
  upload.single("productPicture"),
  updateProductById
);
router.get("/product/search/:key", searchProduct);
router.get("/product/get/:categoryName?", getProductsByCategory);

export default router;
