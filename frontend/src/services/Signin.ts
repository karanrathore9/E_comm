import axios from "axios";

const API_URL = "http://localhost:2000/api";

export const login = (email: string, password: string) => {
  return axios.post(`${API_URL}/signin`, {
    email,
    password,
  });
};
