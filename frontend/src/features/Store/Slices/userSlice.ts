import { createSlice } from "@reduxjs/toolkit";

export interface IUserData {
  [x: string]: any;
  email?: string;
  firstName?: string;
  fullName?: string;
  lastName?: string;
  role?: string;
  _id?: string;
  contactNumber?: string;
  profilePicture?: string;
  token?: string;
}

export interface IRootState {
  user_data: IUserData;
  isLoggedIn: boolean;
}

const initialState: IRootState = {
  user_data: {
    firstName: "",
    lastName: "",
    fullName: "",
    contactNumber: "",
    email: "",
    role: "",
    profilePicture: "",
    token: "",
  },
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveLoginInfo: (state: IRootState, action) => {
      state.isLoggedIn = true;
      state.user_data = { ...state.user_data, ...action.payload };
      console.log(action.payload, "THIS IS ACTION PAYLOAD ");
    },
    userLogout: (state: IRootState) => {
      // state.isLoggedIn = false;
      return initialState;
      console.log("LoggedOut Successfully!");
    },
  },
});
console.log(userSlice.actions, "ACTIONS");

export const { saveLoginInfo, userLogout } = userSlice.actions;

export default userSlice.reducer;
