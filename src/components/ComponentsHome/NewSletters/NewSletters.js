import React from "react";
import styles from "./NewSletters.module.css";

function NewSletters() {
  return (
    <div className={styles.newSlettersContainer}>
      <div className={styles.newSlettersService}>
        <div>
          <h2>FREE SHIPPING</h2>
          <p>Free shipping worldwide</p>
        </div>
        <div>
          <h2>24 x 7 SERVICE</h2>
          <p>Free shipping worldwide</p>
        </div>
        <div>
          <h2>FESTIVAL OFFER</h2>
          <p>Free shipping worldwide</p>
        </div>
      </div>
      <div className={styles.newSlettersDescEmail}>
        <div className={styles.newSlettersDesc}>
          <h2>LET'S BE FRIEND</h2>
          <p>Nisi nisi tempor consequat laboris nisi</p>
        </div>
        <div className={styles.newSlettersFormEmail}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
          ></input>
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
}

export default NewSletters;
