import React, { useCallback, useEffect } from "react";
import styles from "./Popup.module.css";
import { useSelector, useDispatch } from "react-redux";
import { popupActions } from "../store/PopupSilce";
import { Link } from "react-router-dom";

function Popup() {
  // dùng useSelector để truy cập state của Redux store và lấy ra giá trị product từ store.
  const product = useSelector((state) => state.popup.product);
  // dùng useDispatch để lấy ra hàm dispatch từ Redux store để có thể gửi action đến store.
  const dispatch = useDispatch();

  // hàm đóng popup khi người dùng click vào nút X
  const handlCloseModal = useCallback(() => {
    // gửi action đến popupSlice để cập nhật showPopup = false
    dispatch(popupActions.HIDE_POPUP());
  }, [dispatch]);

  // dùng useEffect để đảm bảo rằng modal popup sẽ được đóng khi component Popup được mount lần đầu tiên hoặc khi giá trị dispatch thay đổi.
  useEffect(() => {
    handlCloseModal();
  }, [handlCloseModal]);

  // hàm định dạng giá tiền cho sp
  function formatPrice(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  // nếu ko có sp đc chọn sẽ return null (ko hiện popup)
  // nếu có thì sẽ render dữ liệu sp(hiện popup)
  if (!product) {
    return null;
  } else
    return (
      <div className={styles.popupContainer}>
        <div className={styles.popupModal}>
          <button className={styles.popupCloseButton} onClick={handlCloseModal}>
            X
          </button>
          <div className={styles.popupContentProduct}>
            <div className={styles.popupImgProduct}>
              <img src={product.img1} alt={product.name} />
            </div>
            <div className={styles.popupDetailProduct}>
              <h3>{product.name}</h3>
              <p className={styles.popupProductPrice}>
                {formatPrice(product.price)} vnđ
              </p>
              <div className={styles.popupProductDesc}>
                {product.short_desc}
              </div>
              <Link to={`/detail/${product._id.$oid}`}>
                <button className={styles.popupDetailButton}>
                  View Detail
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Popup;
