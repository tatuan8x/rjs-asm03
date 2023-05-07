import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerWrapper}>
        <div className={styles.footerCol}>
          <h3>COSTOMER SERVICES</h3>
          <ul className={styles.footerList}>
            <li>
              <a href="/">Help & Contact Us</a>
            </li>
            <li>
              <a href="/">Returns & Refunds</a>
            </li>
            <li>
              <a href="/">Online Stores</a>
            </li>
            <li>
              <a href="/">Terms & Conditions</a>
            </li>
          </ul>
        </div>
        <div className={styles.footerCol}>
          <h3>COMPANY</h3>
          <ul className={styles.footerList}>
            <li>
              <a href="/">What we do</a>
            </li>
            <li>
              <a href="/">Available Services</a>
            </li>
            <li>
              <a href="/">Latest Posts</a>
            </li>
            <li>
              <a href="/">FAQs</a>
            </li>
          </ul>
        </div>
        <div className={styles.footerCol}>
          <h3>SOCIAL MEDIA</h3>
          <ul className={styles.footerList}>
            <li>
              <a href="/">Twitter</a>
            </li>
            <li>
              <a href="/">Instagram</a>
            </li>
            <li>
              <a href="/">Facebook</a>
            </li>
            <li>
              <a href="/">Pinterest</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
