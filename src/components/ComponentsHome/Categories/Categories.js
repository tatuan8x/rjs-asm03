import React from "react";
import styles from "./Categories.module.css";
import product_1 from "../../../img/product_1.png";
import product_2 from "../../../img/product_2.png";
import product_3 from "../../../img/product_3.png";
import product_4 from "../../../img/product_4.png";
import product_5 from "../../../img/product_5.png";
import { Link } from "react-router-dom";

function Categories() {
  return (
    <div className={styles.categoriesContainer}>
      <div className={styles.categoriesTitle}>
        <p>CAREFULLY CREATED COLLECTIONS</p>
        <h2>BROWSE OUR CATEGORIES</h2>
      </div>
      <div className={styles.categoriesRow}>
        <Link to="shop">
          <img src={product_1} alt="product_1.png" />
        </Link>
        <Link to="shop">
          <img src={product_2} alt="product_2.png" />
        </Link>
      </div>
      <div className={styles.categoriesRow}>
        <Link to="shop">
          <img src={product_3} alt="product_3.png" />
        </Link>
        <Link to="shop">
          <img src={product_4} alt="product_4.png" />
        </Link>
        <Link to="shop">
          <img src={product_5} alt="product_5.png" />
        </Link>
      </div>
    </div>
  );
}

export default Categories;
