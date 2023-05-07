import React from "react";
import styles from "./Banner.module.css";
import banner from "../../../img/banner1.jpg";

function Banner() {
  return (
    <>
      <div className={styles.bannerContainer}>
        <img src={banner} alt="banner" />
        <div className={styles.bannerDesc}>
          <p>NEW INSPIRATION 2020</p>
          <h2>20% OFF ON NEW SEASON</h2>
          <a href="/shop">Browse collections</a>
        </div>
      </div>
    </>
  );
}

export default Banner;
