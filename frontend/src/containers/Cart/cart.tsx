import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import "./style.css";
import CartService from "../../services/Cart";
import { useDispatch } from "react-redux";
import {
  setCartItems,
  incrementCounter,
  decrementCounter,
} from "../../features/Store/Slices/cartSlice";

interface Product {
  _id: string;
  name: string;
  productPicture: string;
}

interface CartItem {
  _id: string;
  product: Product;
  price: number;
  quantity: number;
}

const Cart = (): JSX.Element => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const dispatch = useDispatch();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    getCart();
  }, []);

  const getCart = (): void => {
    CartService.getCart(userId)
      .then((res) => {
        console.log(res.data.cart.cartItems);
        dispatch(setCartItems(res.data.cart.cartItems));
        setCart(res.data.cart.cartItems);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (cart.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [cart]);

  const removeItem = (id: string): void => {
    CartService.removeItem(userId, id)
      .then((res) => {
        console.log(res);
        getCart();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeItemQuantity = (id: string): void => {
    CartService.removeItemQuantity(userId, id)
      .then((res) => {
        console.log(res);
        getCart();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToCart = (id: string, price: number): void => {
    const requestBody = {
      cartItems: [
        {
          product: id,
          quantity: 1,
          price: price,
        },
      ],
    };

    CartService.addToCart(userId, requestBody)
      .then((res) => {
        console.log(res);
        getCart();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="cartContainer">
        {isEmpty ? (
          <div className="emptyCartMessage">Your cart is empty.</div>
        ) : (
          <Card className="cartTable">
            <div className="cartTableRow cartTableHeader">
              <div className="cartTableCell">Name</div>
              <div className="cartTableCell">Price</div>
              <div className="cartTableCell">Quantity</div>
              <div className="cartTableCell">Image</div>
              <div className="cartTableCell">Total</div>
            </div>
            {cart.map((item: CartItem) => (
              <div key={item._id} className="cartTableRow">
                <div className="cartTableCell">{item.product.name}</div>
                <div className="cartTableCell">{item.price}</div>
                <div className="cartTableCell">
                  <button
                    onClick={() => {
                      removeItemQuantity(item.product._id);
                    }}
                  >
                    -
                  </button>
                  {item.quantity}

                  <button
                    onClick={() => addToCart(item.product._id, item.price)}
                  >
                    +
                  </button>
                </div>
                <div className="cartTableCell">
                  <img
                    style={{ width: 100 }}
                    src={item.product.productPicture}
                  />
                </div>
                <div className="cartTableCell">
                  {item.quantity * item.price}
                </div>

                <button
                  onClick={() => {
                    removeItem(item.product._id);
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </Card>
        )}
      </div>
    </>
  );
};

export default Cart;





