import axios from "axios";

const baseURL = "http://localhost:2000/api";

const token = localStorage.getItem("token");
const headers = { Authorization: `Bearer ${token}` };

const UserService = {
  getWishList: (userId: string | null) =>
    axios.get(`${baseURL}/user/getwishList/${userId}`, { headers }),

  addToCart: (userId: string | null, requestBody: any) =>
    axios.post(`${baseURL}/user/cart/addtocart/${userId}`, requestBody, { headers }),

  removeFromWishList: (userId: string | null, productId: string | null) =>
    axios.post(`${baseURL}/user/addtowishlist/${userId}`, { productId }, { headers }),
};

export default UserService;
