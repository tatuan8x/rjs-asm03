import React from "react";
import MainNavigation from "../components/MainNavigation/MainNavigation";
import { Outlet } from "react-router-dom";
import Footer from "../components/ComponentsHome/Footer/Footer";

function Rootlayout() {
  return (
    <>
      <MainNavigation />
      <Outlet />
      <Footer />
    </>
  );
}

export default Rootlayout;
