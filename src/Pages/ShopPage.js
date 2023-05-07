import React, { Suspense } from "react";
import Shop from "../components/Shop/Shop";
import { Await, useLoaderData } from "react-router-dom";

function ShopPage() {
  const { products } = useLoaderData();
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={products}>
          {(loadedProduct) => <Shop products={loadedProduct} />}
        </Await>
      </Suspense>
    </>
  );
}

export default ShopPage;
