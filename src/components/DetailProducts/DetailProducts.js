import React, { useCallback, useEffect, useState } from "react";
import styles from "./DetailProducts.module.css";
import { cartActions } from "../../store/CartSlice";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

function DetailProducts({ products }) {
  const dispatch = useDispatch();
  const params = useParams();
  const [targetProduct, setTargetProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);

  // nút tăng số lượng
  const incrementHandler = () => {
    setQuantity(quantity + 1);
  };

  // nút trừ số lượng
  const decrementHandler = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // thêm sp vào giỏ hàng (nút ADD TO CART)
  const addToCartHandler = (product, quantity) => {
    // gửi thông tin sp và số lượng trong giỏ hàng đến store
    dispatch(cartActions.LOAD_CART());
    dispatch(
      cartActions.ADD_TO_CART({ newItem: product, addQuantity: quantity })
    );
  };

  // hàm này nhận dữ liệu api từ productsLoader ở App.js
  const loadProduct = useCallback(async () => {
    // check id sp trong giỏ có trùng khớp với id sp từ api hay ko
    if (products) {
      const foundProduct = products.find(
        (item) => item._id.$oid === params.productId
      );

      // nếu trùng thì cập nhật giá trị targetProduct và relatedProducts
      if (foundProduct) {
        setTargetProduct(foundProduct);
        const filteredProducts = products.filter(
          (product) => product.category === foundProduct.category
        );
        setRelatedProducts(filteredProducts);
      }
      // nếu ko trùng thì báo lỗi
      else {
        return <div>Không tìm thấy sản phẩm tương ứng</div>;
        // console.log(`Không có product với id ${params.productId}`);
      }
    }
  }, [products, params.productId]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  useEffect(() => {
    setQuantity(0);
  }, [targetProduct]);

  // hàm định dạng giá tiền cho sp
  function formatPrice(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  // nếu ko có sp thì ko render
  if (!targetProduct) {
    return null;
  } else
    return (
      <>
        <div className={styles.detailProdContainer}>
          <div className={styles.detailProdInfo}>
            <div className={styles.detailProdImgContainer}>
              <div className={styles.detailProdImgSubs}>
                <img
                  src={targetProduct.img2}
                  alt={targetProduct.category}
                ></img>
                <img
                  src={targetProduct.img3}
                  alt={targetProduct.category}
                ></img>
                <img
                  src={targetProduct.img4}
                  alt={targetProduct.category}
                ></img>
                <img
                  src={targetProduct.img1}
                  alt={targetProduct.category}
                ></img>
              </div>
              <div className={styles.detailProdImgMain}>
                <img
                  src={targetProduct.img1}
                  alt={targetProduct.category}
                ></img>
              </div>
            </div>
            <div className={styles.detailProdInfoContainer}>
              <h2>{targetProduct.name}</h2>
              <p>{formatPrice(targetProduct.price)} vnđ</p>
              <p>{targetProduct.short_desc}</p>
              <p>
                <strong>CATEGORY: </strong>
                {targetProduct.category}
              </p>
              <div className={styles.detailProdQuantityWrapper}>
                <button
                  className={styles.detailProdDecrementBtn}
                  onClick={decrementHandler}
                >
                  <span className={styles.triangleLeft}></span>
                </button>
                <span className={styles.detailProdChangeNumb}>{quantity}</span>
                <button
                  className={styles.detailProdIncrementBtn}
                  onClick={incrementHandler}
                >
                  <span className={styles.triangleRight}></span>
                </button>
                <button
                  className={styles.detailProdAddToCart}
                  onClick={() => addToCartHandler(targetProduct, quantity)}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
          <h2 className={styles.detailProdDesc}>DESCRIPTION</h2>
          <div className={styles.detailProdDescContainer}>
            <div className={styles.detailProdDescWrapper}>
              <h2>PRODUCT DESCRIPTION</h2>
              <div style={{ whiteSpace: "pre-line" }}>
                {targetProduct.long_desc}
              </div>
            </div>
            <h2 className={styles.detailProdRelatedProdTitle}>
              RELATED PRODUCTS
            </h2>
            <div className={styles.detailProdRelatedProdList}>
              {relatedProducts.map((product) => (
                <div
                  key={product._id.$oid}
                  className={styles.detailProdRelatedProdItem}
                >
                  <Link to={`/detail/${product._id.$oid}`}>
                    <img src={product.img1} alt={product.category} />
                  </Link>
                  <div className={styles.detailProdRelatedProdInfo}>
                    <h3>{product.name}</h3>
                    <p>{formatPrice(product.price)} vnđ</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
}

export default DetailProducts;
