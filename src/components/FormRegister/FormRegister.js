import React, { useReducer } from "react";
import styles from "./FormRegister.module.css";
import { saveToStorage, getFromStorage } from "../../Utils/LocalStorage";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";

// hàm qản lý state, action đã nhập vào FormRegister của user
// và trả vể state mới dựa trên action đó
const formReducer = (state, action) => {
  switch (action.type) {
    // cập nhật state của fullname
    case "FULLNAME":
      return { ...state, fullname: action.payload };
    // cập nhật state của email
    case "EMAIL":
      return { ...state, email: action.payload };
    // cập nhật state của password
    case "PASSWORD":
      return { ...state, password: action.payload };
    // cập nhật state của phone
    case "PHONE":
      return { ...state, phone: action.payload };
    // cập nhật state của errors để hiển thị các lỗi khi nhập thông tin đăng ký.
    case "SET_ERRORS":
      return { ...state, errors: action.payload };
    // trả về state ban đầu của form đăng ký
    case "RESET_FORM":
      return {
        fullname: "",
        email: "",
        password: "",
        phone: "",
        errors: {},
      };
    default:
      return state;
  }
};

const FormRegister = () => {
  const dispatch = useDispatch();
  // khai báo state ban đầu
  const [formState, formDispatch] = useReducer(formReducer, {
    fullname: "",
    email: "",
    password: "",
    phone: "",
    errors: {},
  });

  // hàm định dạng email
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // hàm check các lỗi nhập trên FormRegister
  const validateForm = (fieldName) => {
    const errors = {};
    if (!fieldName || fieldName === "fullName") {
      // nếu user chưa nhập fullname thì in ra lỗi
      if (formState.fullname.trim().length === 0) {
        errors.fullname = "Hãy nhập fullname";
      }
    }
    if (!fieldName || fieldName === "email") {
      // nếu user chưa nhập email thì in ra lỗi
      if (formState.email.trim().length === 0) {
        errors.email = "Hãy nhập email";
      }
      // nếu user nhập sai định dạng email thì in ra lỗi
      else if (!isValidEmail(formState.email)) {
        errors.email = "Email không hợp lệ";
      }
    }
    if (!fieldName || fieldName === "password") {
      // nếu user chưa nhập password thì in ra lỗi
      if (formState.password.trim().length === 0) {
        errors.password = "Hãy nhập password";
      }
      // check password > 8 ký tự
      else if (formState.password.trim().length < 8) {
        errors.password = "Password phải nhiều hơn 8 ký tự";
      }
    }
    if (!fieldName || fieldName === "phone") {
      // nếu user chưa nhập phone thì in ra lỗi
      if (formState.phone.trim().length === 0) {
        errors.phone = "Hãy nhập số điện thoại";
      }
      // check nếu sđt là chữ thì in ra lỗi
      else if (isNaN(Number(formState.phone))) {
        errors.phone = "Số điện thoại chỉ được nhập số";
      }
      // check sđt phải từ 9-10 số
      else if (
        formState.phone.trim().length < 9 ||
        formState.phone.trim().length > 10
      ) {
        errors.phone = "Số điện thoại là 9 hoặc 10 số";
      }
    }
    return errors;
  };

  // khi user click nút register
  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    formDispatch({ type: "SET_ERRORS", payload: errors });

    // check xem còn lỗi hay không
    const hasError = Object.keys(errors).length > 0;

    if (hasError) {
      // Hiển thị thông báo lỗi cho người dùng
    } else {
      const userArr = getFromStorage("userArr");

      // check trùng email
      if (userArr.some((user) => user.email === formState.email)) {
        formDispatch({
          type: "SET_ERRORS",
          payload: { email: "Email đã được sử dụng" },
        });
      } else {
        // Tạo user mới và lưu vào localStorage
        const newUser = {
          userId: new Date().getTime(),
          ...formState,
          listCart: [],
        };

        const updateUserArr = [...userArr, newUser];
        saveToStorage("userArr", updateUserArr);
        dispatch(userActions.addUser(newUser));
        formDispatch({ type: "RESET_FORM" });

        // Chuyển hướng đến trang login
        window.location.href = "login";
      }
    }
  };

  // khi user nhấp chuột vào input sau đó nhấp ra ngoài là sẽ báo lỗi
  const handleBlur = (event) => {
    const fieldName = event.target.name;
    // gửi lỗi đến validateForm để in ra lỗi
    const fieldErrors = validateForm(fieldName);
    formDispatch({
      type: "SET_ERRORS",
      payload: { ...formState.errors, ...fieldErrors },
    });
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <form className={styles.registerForm}>
          <h3>Sign Up</h3>
          <label htmlFor="fullName"></label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Full Name"
            value={formState.fullname}
            onChange={(e) => {
              formDispatch({
                type: "FULLNAME",
                payload: e.target.value,
              });
            }}
            onBlur={handleBlur}
          />
          {formState.errors.fullname && (
            <span>{formState.errors.fullname}</span>
          )}

          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formState.email}
            onChange={(e) => {
              formDispatch({
                type: "EMAIL",
                payload: e.target.value,
              });
            }}
            onBlur={handleBlur}
          />
          {formState.errors.email && <span>{formState.errors.email}</span>}

          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formState.password}
            onChange={(e) => {
              formDispatch({
                type: "PASSWORD",
                payload: e.target.value,
              });
            }}
            onBlur={handleBlur}
          />
          {formState.errors.password && (
            <span>{formState.errors.password}</span>
          )}

          <label htmlFor="phone"></label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Phone"
            value={formState.phone}
            onChange={(e) => {
              formDispatch({
                type: "PHONE",
                payload: e.target.value,
              });
            }}
            onBlur={handleBlur}
          />
          {formState.errors.phone && <span>{formState.errors.phone}</span>}

          <button type="submit" onClick={handleSubmit}>
            SIGN UP
          </button>
          <p>
            Login ? <a href="login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default FormRegister;
