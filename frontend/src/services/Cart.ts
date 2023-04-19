import axios from "axios";

const API_URL = "http://localhost:2000/api/user/cart/";

const CartService = {
  getCart: (userId: string | null) => {
    return axios.get(API_URL + `getcart/${userId}`);
  },
  removeItem: (userId: string | null, itemId: string | null) => {
    return axios.delete(API_URL + `remove/${userId}/${itemId}`);
  },
  removeItemQuantity: (userId: string | null, itemId: string | null) => {
    return axios.delete(API_URL + `removequantity/${userId}/${itemId}`);
  },
  addToCart: (userId: string | null, requestBody: any) => {
    return axios.post(API_URL + `addtocart/${userId}`, requestBody);
  },
};

export default CartService;


