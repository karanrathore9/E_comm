import express, { NextFunction, Request, response, Response } from "express";
import Cart from "../models/cart";

// interface CartItem {
//   _id: string;
//   product: string;
//   price: number;
//   quantity: number;
// }

interface ICartItem {
  product: string;
  quantity: number;
}

export const addItemToCart = (req: Request, res: Response) => {
  // Cart.findOne({ user: res.locals.user._id })
  Cart.findOne({ user: req.params.id })
    .then((cart) => {
      if (cart != null) {
        const requestItem = req.body.cartItems;
        const product = requestItem[0].product;
        const quantity = requestItem[0].quantity;
        console.log(product, "PRODUCTID");

        const existingItem = cart.cartItems.find(
          (item) => item.product.toString() === product
        );

        if (existingItem) {
          Cart.updateOne(
            {
              user: req.params.id,
              cartItems: { $elemMatch: { product: product } },
            },

            {
              $set: {
                "cartItems.$.quantity": existingItem.quantity + quantity,
              },
            }
          )
            .then((_cart) => {
              return res.status(201).json({ _cart });
            })
            .catch((error) => {
              return res.status(400).json({ error });
            });
        } else {
          Cart.findOneAndUpdate(
            { user: req.params.id },
            {
              $push: {
                cartItems: req.body.cartItems,
              },
            }
          )
            .then((_cart) => {
              return res.status(201).json({ _cart });
            })
            .catch((error) => {
              return res.status(400).json({ error });
            });
        }
      } else {
        const cart = new Cart({
          user: req.params.id,
          cartItems: req.body.cartItems,
        });

        cart
          .save()
          .then((cart) => {
            return res.status(201).json({ cart });
          })
          .catch((error) => {
            return res.status(400).json({ error });
          });
      }
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
};

export const getCartByUserId = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findOne({ user: req.params.id }).populate(
      "cartItems.product"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    return res.status(200).json({ cart });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const removeItemFromCart = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findOne({ user: req.params.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    

    let aitom = null;

    const product = req.params.productId;

    cart.cartItems.forEach((item: any) => {
      if (item.product == product) {
        console.log(item.product, "KAran");
        aitom = item.product;
      }
    });

    if (!aitom) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    Cart.findOneAndUpdate(
      { user: req.params.id },
      {
        $pull: {
          cartItems: {
            product: product,
          },
        },
      }
    )
      .then((_cart) => {
        return res.status(200).json({ message: "Item removed from cart" });
      })
      .catch((error) => {
        return res.status(400).json({ error });
      });
  } catch (error) {
    return res.status(500).json({ error });
  }
};


export const removeItemQuantityFromCart = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findOne({ user: req.params.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const product = req.params.productId;
    let updatedCartItems = cart.cartItems.filter((item: any) => {
      if (item.product.toString() === product) {
        item.quantity--;
        return item.quantity > 0;
      } else {
        return true;
      }
    });

    cart.cartItems = updatedCartItems;

    await cart.save();

    return res.status(200).json({ message: "Item removed/updated from cart" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};