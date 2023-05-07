import { createSlice } from "@reduxjs/toolkit";
import { saveToStorage, getFromStorage } from "../Utils/LocalStorage";

const userSlice = createSlice({
  name: "user",
  initialState: { userArr: getFromStorage("userArr") },
  reducers: {
    addUser: (state, action) => {
      const newUser = {
        ...action.payload,
        listCart: [],
      };
      state.userArr.push(newUser);
      saveToStorage("userArr", state.userArr);
    },
  },
});

export default userSlice;
export const userActions = userSlice.actions;
