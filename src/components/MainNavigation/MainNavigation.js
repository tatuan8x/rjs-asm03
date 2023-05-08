import React from "react";
import styles from "./MainNavigation.module.css";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/AuthSlice";

function MainNavigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userActive = useSelector((state) => state.auth.userActive);
  // lấy state tổng sp trong giỏ của user
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  // thêm hàm này để khi f5 sẽ ko bị mất thông tin giỏ hàng của user
  useEffect(() => {
    dispatch(cartActions.LOAD_CART());
  }, [dispatch]);
  
  // nút logout
  const logoutHandler = () => {
    dispatch(authActions.ON_LOGOUT());
  };

  return (
    <nav className={styles.navContainer}>
      <div className={styles.navMainContainer}>
        <ul className={styles.navMainList}>
          <li className={styles.navHome} onClick={() => navigate("/")}>
            Home
          </li>
          <li className={styles.navShop} onClick={() => navigate("shop")}>
            Shop
          </li>
        </ul>
      </div>
      <div className={styles.shopName}>
        <h1>BOUTIQUE</h1>
      </div>
      <div className={styles.navCartContainer}>
        <ul className={styles.navCartList}>
          {userActive && Object.keys(userActive).length !== 0 && (
            <>
              <li className={styles.navCart}>
                <FaShoppingCart />
                <Link to="cart">Cart({totalQuantity})</Link>
              </li>
              <li className={styles.navCart}>
                <NavLink>
                  <FaUser />
                  {userActive.fullname}
                  <span></span>
                </NavLink>
              </li>
              <li>
                <a href="/" onClick={logoutHandler}>
                  (Logout)
                </a>
              </li>
            </>
          )}
          {userActive && Object.keys(userActive).length === 0 && (
            <li className={styles.navCart}>
              <FaUser />
              <Link to="login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default MainNavigation;
