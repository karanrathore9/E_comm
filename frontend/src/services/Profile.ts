import axios from "axios";
import { FormData } from "../containers/UpdatePassword/updatedPassword"
import { AddressType } from "../containers/Address/address";
import { IUser } from "../containers/Profile/profile";

const API_BASE_URL = "http://localhost:2000/api";

const token = localStorage.getItem("token");
const headers = { Authorization: `Bearer ${token}` };

const getUserProfile = async (userId: string | null) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${userId}`,{ headers });
    return response.data.user;
  } catch (error) {
    console.error(error);
  }
};

const updateUserProfile = async (userId: string | null, userProfile: IUser) => {
  try {
    const form = new FormData();
    form.append("firstName", userProfile.firstName || "");
    form.append("lastName", userProfile.lastName || "");
    form.append("contactNumber", userProfile.contactNumber || "");
    form.append("profilePicture", userProfile.profilePicture || "");

    const response = await axios.put(
      `${API_BASE_URL}/users/update/${userId}`,
      form, { headers }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const updatePassword = (userId: string | null, formData:FormData) => {
  return axios.put(`${API_BASE_URL}/users/${userId}`, formData,{ headers });
};

const getAddress = (userId: string | null) => {
  return axios.get(`${API_BASE_URL}/user/getaddress/${userId}`,{ headers });
};

const postAddress = (userId: string | null, address: AddressType) => {
  return axios.post(`${API_BASE_URL}/user/postaddress/${userId}`, address,{ headers });
};

export default {
  getUserProfile,
  updateUserProfile,
  updatePassword,
  getAddress,
  postAddress,
};