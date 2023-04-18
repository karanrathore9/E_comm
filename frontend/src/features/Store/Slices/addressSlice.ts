import { createSlice } from "@reduxjs/toolkit";

// export interface IUserAddress {
//   houseNo: string;
//   street: string;
//   city: string;
//   state: string;
//   country: string;
//   zipCode: string;
// }

// export interface IRootState {
//   user_data: IUserData;
//   isLoggedIn: boolean;
// }

const initialState = {
  addresses: [],
  selectedAddress: null,
  address: {
    houseNo: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  },
};

export const addressSlice = createSlice({
  name: "useraddresses",
  initialState,
  reducers: {
    setMultipleAddresses: (state, action) => {
      state.addresses = { ...state.addresses, ...action.payload };
      console.log(action.payload);
    },
    saveAddress: (state, action) => {
      state.address = { ...state.address, ...action.payload };
    },
    saveSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
  },
});

console.log(addressSlice.actions, "ACTIONS huggimaro");

export const { setMultipleAddresses, saveAddress, saveSelectedAddress } =
  addressSlice.actions;

export default addressSlice.reducer;
