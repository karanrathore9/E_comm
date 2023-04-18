import axios from "axios";

const API_BASE_URL = "http://localhost:2000/api";

const getUserProfile = async (userId: string | null) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
    return response.data.user;
  } catch (error) {
    console.error(error);
  }
};

const updateUserProfile = async (userId: string | null, userProfile: any) => {
  try {
    const form = new FormData();
    form.append("firstName", userProfile.firstName || "");
    form.append("lastName", userProfile.lastName || "");
    form.append("contactNumber", userProfile.contactNumber || "");
    form.append("profilePicture", userProfile.profilePicture);

    const response = await axios.put(
      `${API_BASE_URL}/users/update/${userId}`,
      form
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const updatePassword = (userId: any, formData: any) => {
  return axios.put(`${API_BASE_URL}/users/${userId}`, formData);
};

const getAddress = (userId: any) => {
  return axios.get(`${API_BASE_URL}/user/getaddress/${userId}`);
};

const postAddress = (userId: any, address: any) => {
  return axios.post(`${API_BASE_URL}/user/postaddress/${userId}`, address);
};

export default {
  getUserProfile,
  updateUserProfile,
  updatePassword,
  getAddress,
  postAddress,
};
