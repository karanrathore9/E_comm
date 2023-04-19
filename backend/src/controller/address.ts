import express, { NextFunction, Request, response, Response } from "express";
import Address from "../models/address";

export const postUserAddress = async (req: Request, res: Response) => {
  console.log("idhar hi error hai!");
  const userId = res.locals.user._id;
  // const userId = req.body.user._id;

  try {
    console.log("idhar hi error hai!!!!!!");

    const user = userId;
    console.log(user);
    const { houseNo, street, city, state, country, zipCode } = req.body;
    console.log(req.body, "📱📱📱");

    const address = await Address.findOne({ user });

    if (address) {
      const existingAddress = address.addresses.find(
        (a) => a.city === city && a.country === country
      );

      if (existingAddress) {
        existingAddress.houseNo = houseNo;
        existingAddress.state = state;
        existingAddress.street = street;
        existingAddress.zipCode = zipCode;
      } else {
        console.log("HELLO");
        address.addresses.push({
          houseNo,
          street,
          city,
          state,
          country,
          zipCode,
        });
      }

      await address.save();
    } else {
      console.log("Hello");
      const newAddress = new Address({
        user:userId,
        addresses: [{ houseNo, street, city, state, country, zipCode }],
      });
      await newAddress.save();
    }

    return res
      .status(201)
      .json({ message: "User address added/updated successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserAddress = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;
  //console.log("fdjshfgdjhfdshjfdhj++++===");
  try {
    const address = await Address.findOne({ user: userId });

    if (!address) {
      return res.status(404).json({ message: "User address not found" });
    }

    const addresses = address.addresses.map((address) => {
      return `${address.houseNo} ${address.street} ${address.city} ${address.state} ${address.country} ${address.zipCode}`;
    });

    return res.status(200).json({ addresses });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
