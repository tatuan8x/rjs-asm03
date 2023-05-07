import React, { useEffect } from "react";
import style from "./CheckOut.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cartActions } from "../../store/CartSlice";

function CheckOut() {
  const dispatch = useDispatch();
  // lấy state từ store
  const { totalPrice, listCart } = useSelector((state) => state.cart);

  // cập nhật giỏ hàng khi loadCart
  useEffect(() => {
    dispatch(cartActions.LOAD_CART());
  }, [dispatch]);

  // hàm định dạng giá tiền cho sp
  function formatPrice(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <>
      <div className={style.checkOutContainer}>
        <div className={style.checkOutBanner}>
          <span>CHECKOUT</span>
          <div className={style.checkOutLinks}>
            <Link to="/">HOME / </Link>
            <Link to="/cart">CART / </Link>
            <Link to="/checkout">CHECKOUT</Link>
          </div>
        </div>
        <div className={style.checkOutContentContainer}>
          <div className={style.checkOutBillContainer}>
            <div className={style.checkOutBillForm}>
              <form className={style.checkOutInnerForm}>
                <h1>BILLING DETAILS</h1>
                <div className={style.checkOutInputWrapper}>
                  <label htmlFor="fullname">FULL NAME:</label>
                  <input
                    placeholder="Enter Your Full Name Here!"
                    type="text"
                  ></input>
                </div>
                <div className={style.checkOutInputWrapper}>
                  <label htmlFor="email">EMAIL:</label>
                  <input
                    placeholder="Enter Your EMAIL Here!"
                    type="email"
                  ></input>
                </div>
                <div className={style.checkOutInputWrapper}>
                  <label htmlFor="phone number">PHONE NUMBER:</label>
                  <input
                    placeholder="Enter Your PHONE NUMBER Here!"
                    type="tel"
                  ></input>
                </div>
                <div className={style.checkOutInputWrapper}>
                  <label htmlFor="address">ADDRESS:</label>
                  <input
                    placeholder="Enter Your ADDRESS Here!"
                    type="text"
                  ></input>
                </div>
                <button type="submit">PLACE ORDER</button>
              </form>
            </div>
          </div>
          <div className={style.checkOutCartTotalContainer}>
            <div className={style.checkOutCartTotal}>
              <h2 className={style.checkOutCartTitle}>CART TOTAL</h2>
            </div>
            {listCart.map((item) => (
              <React.Fragment key={item.id}>
                <div className={style.checkOutCartTotal}>
                  <div className={style.checkOutCartItem}>
                    <h3>{item.name}</h3>
                  </div>
                  <div className={style.checkOutCartItemPrice}>{`${formatPrice(
                    item.price
                  )} vnđ x ${item.quantity}`}</div>
                </div>
              </React.Fragment>
            ))}
            <div className={style.checkOutCartTotal}>
              <div className={style.checkOutCartItem}>
                <h3>TOTAL</h3>
              </div>
              <div className={style.checkOutCartTotalPrice}>
                {formatPrice(totalPrice)} vnđ
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckOut;
