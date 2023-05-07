import { createSlice } from "@reduxjs/toolkit";
import { getFromStorage, saveToStorage } from "../Utils/LocalStorage";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    listCart: [],
    totalQuantity: 0,
    changed: false,
    totalPrice: 0,
  },
  reducers: {
    LOAD_CART(state) {
      // lấy thông tin user đã active
      const userActive = getFromStorage("userActive");

      // check liscart của userActive
      state.listCart = userActive.listCart || [];
      // tính số item có trong listCart
      state.totalQuantity = state.listCart.reduce(
        (quantity, item) => quantity + item.quantity,
        0
      );

      // tính tổng số tiền trong listCart
      state.totalPrice = state.listCart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      state.changed = false;
    },

    // action khi user click nút add to cart
    ADD_TO_CART(state, action) {
      const { newItem, addQuantity } = action.payload;

      // lấy thông tin userActive và userArr
      const userActive = getFromStorage("userActive");
      const userArr = getFromStorage("userArr");

      // thêm tổng số item
      state.totalQuantity += addQuantity;
      state.changed = true;

      // check id sp trog giỏ hàng có trùng với id sp trong store ko
      const idProdCart = state.listCart.find(
        (product) => product.id === newItem._id.$oid
      );

      // push item vào giỏ hàng, trog giỏ hàng phải có các thông tin sp như là:
      // id sp, giá sp(price), số lượng(quantity), hình sp(img), tên(name), tổng giá(totalPrice)
      if (!idProdCart) {
        const newItemPrice = parseInt(newItem.price);
        state.listCart.push({
          id: newItem._id.$oid,
          img: newItem.img1,
          name: newItem.name,
          price: newItemPrice,
          quantity: addQuantity,
          totalPrice: newItemPrice * addQuantity,
        });
        state.totalPrice += newItemPrice * addQuantity;
      } else {
        const addedItem = parseInt(newItem.price) * addQuantity;
        idProdCart.quantity += addQuantity;
        idProdCart.totalPrice += addedItem;

        // cập nhật state totalPrice trog store
        state.totalPrice += addedItem;
      }

      // tìm userID của user đang mua hàng để cập nhật cho đúng user đó
      if (userActive && userArr) {
        const userIndex = userArr.findIndex(
          (user) => user.userId === userActive.userId
        );
        // nếu findIndex !-1
        if (userIndex !== -1) {
          userActive.listCart = state.listCart;
          userArr[userIndex].listCart = state.listCart;

          // lưu vào storage
          saveToStorage("userArr", userArr);
          saveToStorage("userActive", userActive);
        }
      }
    },

    // action khi user click + thêm sp vào giỏ hàng
    INCREMENT(state, action) {
      // lấy thông tin userActive và userArr
      const userActive = getFromStorage("userActive");
      const userArr = getFromStorage("userArr");

      // Data nhận về sẽ là id của sp
      const id = action.payload;

      // check id sp trog giỏ hàng có trùng với id sp trong store ko
      const idProdCart = state.listCart.find((item) => item.id === id);

      if (idProdCart) {
        idProdCart.quantity++;
        idProdCart.totalPrice += idProdCart.price;

        // cập nhật state redux store
        state.totalQuantity++;
        state.totalPrice += idProdCart.price;
        state.changed = true;
      }

      // tìm userID của user đang mua hàng để cập nhật cho đúng user đó
      if (userActive && userArr) {
        const userIndex = userArr.findIndex(
          (user) => user.userId === userActive.userId
        );
        // nếu findIndex !-1
        if (userIndex !== -1) {
          userActive.listCart = state.listCart;
          userArr[userIndex].listCart = state.listCart;

          // lưu vào storage
          saveToStorage("userArr", userArr);
          saveToStorage("userActive", userActive);
        }
      }
    },

    // action khi user click - sp trong giỏ hàng
    DECREMENT(state, action) {
      // lấy thông tin userActive và userArr
      const userActive = getFromStorage("userActive");
      const userArr = getFromStorage("userArr");

      // Data nhận về sẽ là id của sp
      const id = action.payload;

      // check id sp trog giỏ hàng có trùng với id sp trong store ko
      const idProdCart = state.listCart.find((item) => item.id === id);

      // cập nhật state redux store
      state.totalQuantity--;
      state.totalPrice -= idProdCart.price;
      state.changed = true;

      if (idProdCart.quantity === 1) {
        state.totalPrice -= idProdCart.totalPrice;
        state.listCart = state.listCart.filter((item) => item.id !== id);
      } else {
        const removePrice = parseInt(idProdCart.price);
        idProdCart.quantity--;
        idProdCart.totalPrice -= removePrice;
      }

      // tìm userID của user đang mua hàng để cập nhật cho đúng user đó
      if (userActive && userArr) {
        const userIndex = userArr.findIndex(
          (user) => user.userId === userActive.userId
        );
        // nếu findIndex !-1
        if (userIndex !== -1) {
          userActive.listCart = state.listCart;
          userArr[userIndex].listCart = state.listCart;

          // lưu vào storage
          saveToStorage("userArr", userArr);
          saveToStorage("userActive", userActive);
        }
      }
    },

    // action xoá sp khỏi giỏ hàng
    DELETE(state, action) {
      // lấy thông tin userActive và userArr
      const userActive = getFromStorage("userActive");
      const userArr = getFromStorage("userArr");

      // Data nhận về sẽ là id của sp
      const id = action.payload;

      // check id sp trog giỏ hàng có trùng với id sp trong store ko
      const idProdCart = state.listCart.find((item) => item.id === id);

      if (idProdCart) {
        state.totalQuantity -= idProdCart.quantity;
        state.totalPrice -= idProdCart.totalPrice;
        state.listCart = state.listCart.filter((item) => item.id !== id);
        state.changed = true;
      }

      // tìm userID của user đang mua hàng để cập nhật cho đúng user đó
      if (userActive && userArr) {
        const userIndex = userArr.findIndex(
          (user) => user.userId === userActive.userId
        );
        // nếu findIndex !-1
        if (userIndex !== -1) {
          userActive.listCart = state.listCart;
          userArr[userIndex].listCart = state.listCart;

          // lưu vào storage
          saveToStorage("userArr", userArr);
          saveToStorage("userActive", userActive);
        }
      }
    },
  },
});

export default cartSlice;
export const cartActions = cartSlice.actions;
