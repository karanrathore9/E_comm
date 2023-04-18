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
router.post("/user/cart/addtocart/:id", addItemToCart);

router.get("/user/cart/getcart/:id", getCartByUserId);

router.delete("/user/cart/remove/:id/:productId", removeItemFromCart);

router.delete(
  "/user/cart/removequantity/:id/:productId",
  removeItemQuantityFromCart
);

export default router;
