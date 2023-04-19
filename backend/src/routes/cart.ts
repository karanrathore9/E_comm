import express from "express";
import Cart from "../models/cart";
import { requireSignin, userMiddleware } from "../middlewares/index";
import {
  addItemToCart,
  getCartByUserId,
  removeItemFromCart,
  removeItemQuantityFromCart,
} from "../controller/cart";
const router = express.Router();

// router.post("/user/cart/addtocart", requireSignin, userMiddleware, addItemToCart);
router.post("/user/cart/addtocart/:id", requireSignin, userMiddleware, addItemToCart);

router.get("/user/cart/getcart/:id", requireSignin, userMiddleware, getCartByUserId);

router.delete("/user/cart/remove/:id/:productId", requireSignin, userMiddleware, removeItemFromCart);

router.delete(
  "/user/cart/removequantity/:id/:productId", requireSignin, userMiddleware,
  removeItemQuantityFromCart
);

export default router;
