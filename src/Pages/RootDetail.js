import React from "react";
import { Outlet } from "react-router-dom";

function RootDetail() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default RootDetail;
