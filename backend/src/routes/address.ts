import express from "express";
import Cart from "../models/cart";
import { postUserAddress, getUserAddress } from "../controller/address";
const router = express.Router();

router.post("/user/postaddress/:userId", postUserAddress);
router.get("/user/getaddress/:userId", getUserAddress);




export default router;
