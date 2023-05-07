import React, { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import CheckOut from "../components/CheckOut/CheckOut";

function CheckOutPage() {
  const { products } = useLoaderData();
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={products}>
          {(loadedProduct) => <CheckOut products={loadedProduct} />}
        </Await>
      </Suspense>
    </>
  );
}

export default CheckOutPage;
