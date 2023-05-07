import { configureStore } from "@reduxjs/toolkit";
import popupSlice from "./PopupSilce";
import cartSlice from "./CartSlice";
import userSlice from "./userSlice";
import authSlice from "./AuthSlice";

const store = configureStore({
  reducer: {
    popup: popupSlice.reducer,
    cart: cartSlice.reducer,
    user: userSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
