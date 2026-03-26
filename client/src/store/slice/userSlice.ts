import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
  mobile: string;
  verify_email: string;
  last_login_date: string;
  status: string;
  address_details: [];
  shopping_cart: [];
  orderHistory: [];
  role: string;
}

const initialValue: UserState = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  avatarUrl: "",
  mobile: "",
  verify_email: "",
  last_login_date: "",
  status: "",
  address_details: [],
  shopping_cart: [],
  orderHistory: [],
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialValue,
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload._id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.avatarUrl = action.payload.avatarUrl;
      state.mobile = action.payload.mobile;
      state.verify_email = action.payload.verify_email;
      state.last_login_date = action.payload.last_login_date;
      state.status = action.payload.status;
      state.address_details = action.payload.address_details;
      state.shopping_cart = action.payload.shopping_cart;
      state.orderHistory = action.payload.orderHistory;
      state.role = action.payload.role;
    },
    logoutUser: (state) => {
      state._id = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.avatarUrl = "";
      state.mobile = "";
      state.verify_email = "";
      state.last_login_date = "";
      state.status = "";
      state.address_details = [];
      state.shopping_cart = [];
      state.orderHistory = [];
      state.role = "";
    },
  },
});
export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
