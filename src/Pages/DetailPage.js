import React, { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import DetailProducts from "../components/DetailProducts/DetailProducts";

function DetailPage() {
  const { products } = useLoaderData();
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={products}>
          {(loadedProduct) => <DetailProducts products={loadedProduct} />}
        </Await>
      </Suspense>
    </>
  );
}

export default DetailPage;
