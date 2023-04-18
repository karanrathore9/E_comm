import express, { NextFunction, Request, response, Response } from "express";
import WishList from "../models/wishList";
import { log } from 'console';

export const addToWishList = async (req :Request, res:Response) => {

//   const { userId } = req.params;
  const { productId } = req.body;

  try {
    const wishList = await WishList.findOne({ user: req.params.id });

    if (!wishList) {
      const newWishList = new WishList({
        user: req.params.id,
        wishListItem: [productId],
      });
      await newWishList.save();
      return res.status(201).json(newWishList);
    }

    // check if the product is already in the wishlist
    const productIndex = wishList.wishListItem.indexOf(productId);
    if (productIndex !== -1) {
      // remove the product from the wishlist if it's already in it
      wishList.wishListItem.splice(productIndex, 1);
      await wishList.save();
      return res.status(200).json(res);
    }

    // add the product to the wishlist
    wishList.wishListItem.push(productId);
    await wishList.save();

    return res.status(200).json(wishList);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};


export const getWishList = async (req:Request, res:Response) => {
//   const { userId } = req.params.id;

  try {
    const wishList = await WishList.findOne({ user: req.params.id }).populate(
      "wishListItem"
    );

    if (!wishList) {
      return res.status(404).json({ error: "Wishlist not found" });
    }

    return res.status(200).json(wishList);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

