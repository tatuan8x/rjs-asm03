import React, { useEffect } from "react";
import style from "./Cart.module.css";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/CartSlice";

function Cart() {
  const dispatch = useDispatch();
  const { totalPrice, listCart } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  // cập nhật giỏ hàng khi loadCart
  useEffect(() => {
    dispatch(cartActions.LOAD_CART());
  }, [dispatch]);

  // + sp vào đơn hàng
  const incrementHandler = (id) => {
    dispatch(cartActions.INCREMENT(id));
  };

  // - sp trong đơn hàng
  const decrementHandler = (id) => {
    dispatch(cartActions.DECREMENT(id));
  };

  // remove sp trong đơn hàng
  const removeHandler = (id) => {
    dispatch(cartActions.DELETE(id));
  };

  // hàm định dạng giá tiền cho sp
  function formatPrice(number) {
    if (number == null || isNaN(number)) {
      return "";
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <>
      <div className={style.cartContainer}>
        <div className={style.cartBanner}>
          <span>Cart</span>
          <span>Cart</span>
        </div>
        <h2>SHOPPING CART</h2>
        <div className={style.cartContentContainer}>
          <div className={style.cartTableContainer}>
            <table>
              <thead>
                <tr>
                  <th>IMAGE</th>
                  <th>PRODUCT</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                  <th>TOTAL</th>
                  <th>REMOVE</th>
                </tr>
              </thead>
              <tbody>
                {listCart.map((item) => (
                  <React.Fragment key={item.id}>
                    <tr>
                      <td>
                        <img src={item.img} alt="" />
                      </td>
                      <td>{item.name}</td>
                      <td>{formatPrice(item.price)} vnđ</td>
                      <td className={style.quantityContainer}>
                        <div className={style.quantityBtnWrapper}>
                          <button
                            className={style.quantityBtnLeft}
                            onClick={() => decrementHandler(item.id)}
                          >
                            ◀
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className={style.quantityBtnRight}
                            onClick={() => incrementHandler(item.id)}
                          >
                            ▶
                          </button>
                        </div>
                      </td>
                      <td>{formatPrice(item.totalPrice)} vnđ</td>
                      <td>
                        <span
                          className={style.removeBtn}
                          onClick={() => removeHandler(item.id)}
                        >
                          remove
                        </span>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="6" className={style.cartTableFootBtn}>
                    <div className={style.cartBtnWrapper}>
                      <div
                        className={style.cartBtnContinue}
                        onClick={() => navigate("/shop")}
                      >
                        <FaLongArrowAltLeft /> Continue Shopping
                      </div>
                      <div
                        className={style.cartBtnCheckout}
                        onClick={() => navigate("/checkout")}
                      >
                        Proceed to Checkout <FaLongArrowAltRight />
                      </div>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className={style.cartTotalPriceTable}>
            <div className={style.cartTotalPriceTableWrapper}>
              <div className={style.cartRow}>
                <h2 className={style.cartTotalPriceTitle}>CART TOTAL</h2>
              </div>
              <div className={style.cartRow}>
                <div>
                  <h3>SUBTOTAL</h3>
                </div>
                <div>{formatPrice(totalPrice)} vnđ</div>
              </div>
              <div className={style.cartRow}>
                <div>
                  <h3>TOTAL</h3>
                </div>
                <div className={style.cartFinalPrice}>
                  {formatPrice(totalPrice)} vnđ
                </div>
              </div>
              <div className={style.cartCoupon}>
                <input></input>
                <button>Apply coupon</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
