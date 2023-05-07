import React, { useCallback, useEffect, useState } from "react";
import styles from "./ListProducts.module.css";
import { defer, json } from "react-router-dom";
import Popup from "../../../UI/Popup";
import { useDispatch } from "react-redux";
import { popupActions } from "../../../store/PopupSilce";

function ListProducts({ products }) {
  // dùng dispatch để gửi action đến store
  const dispatch = useDispatch();
  const [loadedProduct, setLoadedProduct] = useState([]);

  // hiển thị popup khi người dùng click vào sp
  const handlShowModal = useCallback(
    (product) => {
      // gửi action đến popupSlice để cập nhật showPopup = true
      dispatch(popupActions.SHOW_POPUP(product));
    },
    [dispatch]
  );

  // useEffect() được sử dụng để thực thi handlShowModal() mỗi khi nó được thay đổi.
  useEffect(() => {
    handlShowModal();
  }, [handlShowModal]);

  // hàm này nhận dữ liệu api từ productsLoader ở App.js
  const loadProducts = useCallback(async () => {
    // nếu ko có dữ liệu sp thì sẽ render 'loading...' ra màn hình
    if (!products) {
      return <div>loading...</div>;
    } else if (products) {
      // nếu có dữ liệu sp thì sẽ chép hết mảng dữ liệu đó vào biến modifiedProducts
      const modifiedProducts = [...products];
      // và đặt giá trị này vào state loadedProduct.
      setLoadedProduct(modifiedProducts);
    }
  }, [products]);

  // effect() để thực thi hàm loadProducts mỗi khi thay đổi
  useEffect(() => {
    loadProducts();
  }, [loadProducts, products]);
  // console.log(products);

  // hàm định dạng giá tiền cho sp
  function formatPrice(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <>
      {/* Component Popup này chỉ hiển thị khi trạng thái showPopup trong redux là true(ng dùng click vào sp)*/}
      <Popup />
      <div className={styles.listProductsTitle}>
        <p>MADE THE HARD WAY</p>
        <h2>TOP TRENDING PRODUCTS</h2>
      </div>
      <div className={styles.listProductsRow}>
        {loadedProduct.map((item) => (
          <React.Fragment key={item._id.$oid}>
            <div className={styles.listProductsContentWrapper}>
              <div onClick={() => handlShowModal(item)}>
                <img src={item.img1} alt={item.name}></img>
              </div>
              <h3>{item.name}</h3>
              <p>{formatPrice(item.price)} vnđ</p>
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

export default ListProducts;

// lấy danh sách sp từ api
async function loadProducts() {
  const response = await fetch(
    "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
  );
  // nếu kết quả trả về không thành công thì throw ra lỗi
  if (!response.ok) {
    throw json({ message: "Could not fetch products" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData;
  }
}
// console.log(loadProducts());

// sau lấy dữ liệu của api từ loadProducts() thì nạp vào loader() với thuộc tính là products
// xuất loader() thông qa defer() đến file App.js
export function loader() {
  return defer({
    products: loadProducts(),
  });
}
