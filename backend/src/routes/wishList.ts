import express from "express";
import WishList from "../models/wishList";
import { requireSignin, userMiddleware } from "../middlewares/index";
import { addToWishList, getWishList } from "../controller/wishList";
const router = express.Router();

// router.post("/user/cart/addtocart", requireSignin, userMiddleware, addItemToCart);
router.post("/user/addtowishlist/:id", addToWishList);

router.get("/user/getwishList/:id", getWishList);



export default router;
