import axios from "axios";

const baseURL = "http://localhost:2000/api";

const UserService = {
  getWishList: (userId: any) =>
    axios.get(`${baseURL}/user/getwishList/${userId}`),

  addToCart: (userId: any, requestBody: any) =>
    axios.post(`${baseURL}/user/cart/addtocart/${userId}`, requestBody),

  removeFromWishList: (userId: any, productId: any) =>
    axios.post(`${baseURL}/user/addtowishlist/${userId}`, { productId }),
};

export default UserService;
