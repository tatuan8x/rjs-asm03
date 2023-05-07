import React from "react";
import FormLogin from "../components/FormLogin/FormLogin";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function LoginPage() {
  const userActive = useSelector((state) => state.auth.userActive);
  return (
    <>
      {userActive.length === 0 && <FormLogin />}

      {/* login xong chuyển user đến trang chủ */}
      {userActive && Object.keys(userActive).length !== 0 && (
        <Navigate to="/" />
      )}
    </>
  );
}

export default LoginPage;
