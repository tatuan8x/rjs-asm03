import { createSlice } from "@reduxjs/toolkit";
import { getFromStorage, saveToStorage } from "../Utils/LocalStorage";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    userActive: getFromStorage("userActive"),
  },
  reducers: {
    ON_LOGIN: (state, action) => {
      // khi login thành công thì isAuthenticated = true
      state.isAuthenticated = true;
      state.userActive = action.payload;
      // lưu dữ liệu userActive vào localStorage
      saveToStorage("userActive", state.userActive);
    },

    ON_LOGOUT: (state) => {
      // khi logout sẽ trả isAuthenticated về false
      state.isAuthenticated = false;
      // Reset state của userActive trong store redux
      state.userActive = [];
      state.totalQuantity = 0;

      // Remove userActive khỏi localStorage
      localStorage.removeItem("userActive");
    },
  },
});

export default authSlice;
export const authActions = authSlice.actions;
