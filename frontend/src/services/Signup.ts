import axios from "axios";
import { IFormData } from "../containers/Signup/signup";

export const signup = (formData: IFormData) => {
  return axios.post("http://localhost:2000/api/signup", formData);
};
