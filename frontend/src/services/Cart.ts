import axios from "axios";

const API_URL = "http://localhost:2000/api/user/cart/";

const CartService = {
  getCart: (userId: any) => {
    return axios.get(API_URL + `getcart/${userId}`);
  },
  removeItem: (userId: any, itemId: any) => {
    return axios.delete(API_URL + `remove/${userId}/${itemId}`);
  },
  removeItemQuantity: (userId: any, itemId: any) => {
    return axios.delete(API_URL + `removequantity/${userId}/${itemId}`);
  },
  addToCart: (userId: any, requestBody: any) => {
    return axios.post(API_URL + `addtocart/${userId}`, requestBody);
  },
};

export default CartService;
