import express from "express";
import Cart from "../models/cart";
import { postUserAddress, getUserAddress } from "../controller/address";
import { requireSignin, userMiddleware } from "../middlewares";
const router = express.Router();

router.post("/user/postaddress/:userId", requireSignin, userMiddleware, postUserAddress);
router.get("/user/getaddress/:userId", requireSignin, userMiddleware, getUserAddress);




export default router;
