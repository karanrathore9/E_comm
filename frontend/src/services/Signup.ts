import axios from "axios";

export const signup = (formData: any) => {
  return axios.post("http://localhost:2000/api/signup", formData);
};
