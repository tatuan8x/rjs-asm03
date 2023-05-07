import React, { useState } from "react";
import styles from "./FormLogin.module.css";
import { useDispatch } from "react-redux";
import { getFromStorage } from "../../Utils/LocalStorage";
import { authActions } from "../../store/AuthSlice";
import { cartActions } from "../../store/CartSlice";

function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  // hàm check các lỗi nhập trên FormLogin
  const validateForm = (fieldName) => {
    const errors = {};
    if (!fieldName || fieldName === "email") {
      // nếu user chưa nhập email thì in ra lỗi
      if (email.trim().length === 0) {
        errors.email = "Hãy nhập email";
      }
    }
    if (!fieldName || fieldName === "password") {
      // nếu user chưa nhập password thì in ra lỗi
      if (password.trim().length === 0) {
        errors.password = "Hãy nhập password";
      }
    }
    return errors;
  };

  // nút SIGN IN
  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    // object.keys để kiểm tra lỗi. Nếu có lỗi sẽ dừng code ko chạy nữa
    if (Object.keys(errors).length > 0) {
      return;
    }

    // lấy userArr từ storage
    const userArr = getFromStorage("userArr");
    // tìm email và password của user đã có trong userArr chưa
    const foundUser = userArr.find((user) => user.email === email);
    // check email đã đăng ký hay chưa
    if (!foundUser) {
      setErrors({ ...formErrors, email: "Email chưa đăng ký" });
      return;
    }
    // check password có đúng hay ko
    if (foundUser.password !== password) {
      setErrors({ ...formErrors, password: "Sai password" });
      return;
    }

    // Nếu không có lỗi thì login thành công
    dispatch(authActions.ON_LOGIN(foundUser));
    const userActive = getFromStorage("userActive");
    if (userActive && userActive.listCart) {
      dispatch(cartActions.LOAD_CART());
    }
  };

  // khi user nhấp chuột vào input sau đó nhấp ra ngoài là sẽ báo lỗi
  const handleBlur = (event) => {
    const fieldName = event.target.name;
    // gửi lỗi đến validateForm để in ra lỗi
    const fieldErrors = validateForm(fieldName);
    setErrors({ ...errors, ...fieldErrors });
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginForm}>
          <h3>Sign In</h3>
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onBlur={handleBlur}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span>{errors.email}</span>}
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onBlur={handleBlur}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span>{errors.password}</span>}
          <button type="submit" onClick={handleSubmit}>
            SIGN IN
          </button>
          <p>
            Create an account? <a href="/register">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FormLogin;
