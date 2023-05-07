import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Rootlayout from "./Pages/Rootlayout";
import HomePage from "./Pages/HomePage";
import ShopPage from "./Pages/ShopPage";
import RootDetail from "./Pages/RootDetail";
import DetailPage from "./Pages/DetailPage";

import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
// nhập loader và đổi tên thành productsLoader
// nạp productsLoader vào những component cần render api
import { loader as productsLoader } from "./components/ComponentsHome/ListProducts/ListProducts";
import CartPage from "./Pages/CartPage";
import CheckOut from "./components/CheckOut/CheckOut";
import ChatPopup from "./components/ChatPopup/ChatPopup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Rootlayout />,
    children: [
      { index: true, element: <HomePage />, loader: productsLoader },
      { path: "shop", element: <ShopPage />, loader: productsLoader },
      {
        path: "/detail",
        element: <RootDetail />,
        children: [
          {
            path: ":productId",
            element: <DetailPage />,
            loader: productsLoader,
          },
        ],
      },
      { path: "cart", element: <CartPage />, loader: productsLoader },
      { path: "checkout", element: <CheckOut />, loader: productsLoader },
    ],
  },
  { path: "register", element: <RegisterPage /> },
  { path: "login", element: <LoginPage /> },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />, <ChatPopup />
    </>
  );
}

export default App;
