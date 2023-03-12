import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ProductDisplay from "./parts/ProductDisplay";
import SkeletonProduct from "./parts/SkeletonProduct";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { data, isLoading } = useFetch(
    `/api/products?populate=*&filters[slug]=${slug}`
  );
  const item = data ? data?.data[0]?.attributes : {};

  return (
    <div className="container mx-auto px-2 lg:px-0 mt-5">
      {isLoading ? (
        <SkeletonProduct />
      ) : (
        <ProductDisplay item={item} id={data?.data[0]?.id} />
      )}
    </div>
  );
}
