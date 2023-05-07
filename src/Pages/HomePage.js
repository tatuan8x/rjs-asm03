import React, { Suspense } from "react";
import Banner from "../components/ComponentsHome/Banner/Banner";
import Categories from "../components/ComponentsHome/Categories/Categories";
import ListProducts from "../components/ComponentsHome/ListProducts/ListProducts";
import NewSletters from "../components/ComponentsHome/NewSletters/NewSletters";
import { Await, useLoaderData } from "react-router-dom";

function HomePage() {
  const { products } = useLoaderData();
  return (
    <>
      <Banner />
      <Categories />
      <Suspense>
        <Await resolve={products}>
          {(loadedProduct) => <ListProducts products={loadedProduct} />}
        </Await>
      </Suspense>
      <NewSletters />
    </>
  );
}

export default HomePage;
