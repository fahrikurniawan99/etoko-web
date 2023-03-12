import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import FilterBySubCategory from "./parts/FilterBySubCategory";
import ListProducts from "./parts/ListProducts";
import MobileFilter from "./parts/MobileFilter";

export default function CategoryFilterPage() {
  const [subcategory, setSubcategory] = useState("");
  const { categoryid } = useParams();
  const { data, isLoading, isError } = useFetch(
    `/api/products?populate=*&filters[category][id]=${categoryid}${
      subcategory ? `&filters[sub_categories][title]=${subcategory}` : ""
    }`
  );
  const location = useLocation();

  useEffect(() => {
    setSubcategory("");
    return () => {};
  }, [location]);

  return (
    <div className="lg:min-h-[calc(100vh-64px)] container mx-auto lg:flex justify-between gap-10 px-5 lg:px-0 mt-5">
      <FilterBySubCategory {...{ subcategory, setSubcategory }} />
      <MobileFilter {...{ subcategory, setSubcategory }} />
      <ListProducts {...{ data, isLoading, isError }} />
    </div>
  );
}
