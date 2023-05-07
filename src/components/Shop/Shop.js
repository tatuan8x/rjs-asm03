import React, { useCallback, useEffect, useState } from "react";
import styles from "./Shop.module.css";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { popupActions } from "../../store/PopupSilce";
import Popup from "../../UI/Popup";

function Shop({ products }) {
  // dùng dispatch để gửi các actions đến store của Redux.
  const dispatch = useDispatch();
  // dùng để lấy thông tin từ URL và cập nhật trạng thái của component.
  const [searchParams, setSearchParams] = useSearchParams();
  // lưu trữ giá trị từ input search của người dùng.
  const [searchTerm, setSearchTerm] = useState("");
  // lưu trữ giá trị từ dropdown để sắp xếp sản phẩm theo tên.
  const [sortOption, setSortOption] = useState("default");
  // lưu trữ giá trị các sản phẩm được lấy từ products.
  const [loadedProduct, setLoadedProduct] = useState([]);

  // khi ng dùng nhập vào input search sẽ gọi hàm này
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // khi ng dùng bấm chọn search a-z, z-a sẽ gọi bằng hàm này
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // hàm sắp xếp sản phẩm search theo chữ cái a-z, z-a
  const sortedProducts = (products) => {
    // nếu option là a-z thì render những sp có chữ cái từ a-z
    if (sortOption === "a-z") {
      return products.sort((a, b) => a.name.localeCompare(b.name));
    }
    // nếu option là z-a thì render những sp có chữ cái từ z-a
    else if (sortOption === "z-a") {
      return products.sort((a, b) => b.name.localeCompare(a.name));
    }
    // nếu ko chọn j thì render toàn bộ sp
    else {
      return products;
    }
  };

  // hiển thị popup khi người dùng click vào sp
  const handlShowModal = useCallback(
    (product) => {
      // gửi action đến popupSlice để cập nhật showPopup = true
      dispatch(popupActions.SHOW_POPUP(product));
    },
    [dispatch]
  );

  // effect() để thực thi hàm handlShowModal mỗi khi thay đổi
  useEffect(() => {
    handlShowModal();
  }, [handlShowModal]);

  // hàm này nhận dữ liệu api từ productsLoader ở App.js
  const loadProducts = useCallback(async () => {
    // nếu ko có dữ liệu sp thì sẽ render 'loading...' ra màn hình
    if (!products) {
      return <div>loading...</div>;
    } else if (products) {
      // nếu có dữ liệu sp thì sẽ chép hết mảng dữ liệu đó vào biến modifiedProducts
      const modifiedProducts = [...products];
      // và đặt giá trị này vào state loadedProduct.
      setLoadedProduct(modifiedProducts);
    }
  }, [products]);

  // effect() để thực thi hàm loadProducts mỗi khi thay đổi
  useEffect(() => {
    loadProducts();
  }, [loadProducts, products]);
  // console.log(products);

  // Hàm này đc gọi khi người dùng chọn một danh mục sản phẩm để lọc.
  // Khi hàm được gọi, nó sẽ cập nhật trạng thái searchParams bằng cách đặt thuộc tính category của searchParams
  const handleCategory = useCallback(
    (category) => {
      setSearchParams({ category: category });
    },
    [setSearchParams]
  );

  // lọc mảng dữ liệu sp của loadedProduct đã nhận từ api rồi truyền vào filteredProducts
  const filteredProducts = sortedProducts(
    loadedProduct.filter(
      // hàm filter sẽ trả về mảng mới chứa các sp thoả mãn điều kiện sau:
      (product) =>
        // kiểm tra searchParams có tồn tại category hay ko. Nếu ko tồn tại, điều kiện trả về giá trị true.
        !searchParams.get("category") ||
        // kiểm tra giá trị category có phải là "ALL" hay ko. Nếu đúng, điều kiện trả về giá trị true
        searchParams.get("category") === "ALL" ||
        // kiểm tra category của sp có khớp với giá trị category đã chọn hay ko. Nếu khớp, điều kiện trả về giá trị true.
        product.category === searchParams.get("category").toLowerCase()
    )
  );

  // hàm định dạng giá tiền cho sp
  function formatPrice(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <>
      {/* Component Popup này chỉ hiển thị khi trạng thái showPopup trong redux là true (ng dùng click vào sp)*/}
      <Popup />
      <div className={styles.shopMainContainer}>
        <div className={styles.shopBanner}>
          <span>Shop</span>
          <span>Shop</span>
        </div>
        <div className={styles.shopContentContainer}>
          <div className={styles.shopSidebar}>
            <h2>CATEGORIES</h2>

            <div className={styles.shopFilterList}>
              <ul>
                <li className={styles.shopFilterMainTitle}>APPLE</li>
                <li
                  className={styles.shopFilterItem}
                  onClick={() => handleCategory("ALL")}
                >
                  ALL
                </li>
                <li className={styles.shopFilterSubtitle}>IPHONE & MAC</li>
                <li
                  className={styles.shopFilterItem}
                  onClick={() => handleCategory("IPhone")}
                >
                  IPhone
                </li>
                <li
                  className={styles.shopFilterItem}
                  onClick={() => handleCategory("Ipad")}
                >
                  Ipad
                </li>
                <li
                  className={styles.shopFilterItem}
                  onClick={() => handleCategory("Macbook")}
                >
                  Macbook
                </li>
                <li className={styles.shopFilterSubtitle}>WIRELESS</li>
                <li
                  className={styles.shopFilterItem}
                  onClick={() => handleCategory("Airpod")}
                >
                  Airpod
                </li>
                <li
                  className={styles.shopFilterItem}
                  onClick={() => handleCategory("Watch")}
                >
                  Watch
                </li>
                <li className={styles.shopFilterSubtitle}>OTHER</li>
                <li
                  className={styles.shopFilterItem}
                  onClick={() => handleCategory("Mouse")}
                >
                  Mouse
                </li>
                <li
                  className={styles.shopFilterItem}
                  onClick={() => handleCategory("Keyboard")}
                >
                  Keyboard
                </li>
                <li
                  className={styles.shopFilterItem}
                  onClick={() => handleCategory("Other")}
                >
                  Other
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.shopSearchProductsContainer}>
            <div className={styles.shopSearchField}>
              <input
                placeholder="Enter search"
                value={searchTerm}
                onChange={handleSearchChange}
              ></input>
              <select value={sortOption} onChange={handleSortChange}>
                <option value="default">Default sorting</option>
                <option value="a-z">Sort: A-Z</option>
                <option value="z-a">Sort: Z-A</option>
              </select>
            </div>
            <div className={styles.shopSearchResult}>
              {filteredProducts.length === 0 && (
                <p>There are no products in this category</p>
              )}
              {filteredProducts.map((item) => (
                <div className={styles.productsContainer} key={item._id.$oid}>
                  <div
                    className={styles.imgProductsContainer}
                    onClick={() => handlShowModal(item)}
                  >
                    <img
                      className={styles.imgProducts}
                      src={item.img1}
                      alt={item.name}
                    />
                    <div className={styles.productInfo}>
                      <h3>{item.name}</h3>
                      <p>{formatPrice(item.price)} vnđ</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
