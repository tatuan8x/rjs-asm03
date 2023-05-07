import React, { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import Cart from "../components/Cart/Cart";

function CartPage() {
  const { products } = useLoaderData();
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={products}>
          {(loadedProduct) => <Cart products={loadedProduct} />}
        </Await>
      </Suspense>
    </>
  );
}

export default CartPage;
