import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup", // tên slice
  // khai báo trạng thái ban đầu là false(ko hiện popup)
  initialState: { showPopup: false, product: null },
  reducers: {
    // nếu action đc gửi đến = true thì hiện popup
    SHOW_POPUP(state, action) {
      state.showPopup = true;
      state.product = action.payload;
    },
    HIDE_POPUP(state) {
      state.showPopup = false;
      state.product = null;
    },
  },
});
export default popupSlice;
export const popupActions = popupSlice.actions;
