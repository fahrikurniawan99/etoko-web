import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../../components/Card";
import useFetch from "../../hooks/useFetch";

export default function Category() {
  const { categoryid } = useParams();
  const [subCategory, setSubCategory] = useState(null);
  const { data } = useFetch(
    `/api/products?populate=*&filters[category][id][$eq]=${categoryid}${
      subCategory ? `&filters[sub_categories][title]=${subCategory}` : ""
    }`
  );
  const { data: subCategoryData } = useFetch(
    `/api/sub-categories?filters[categories][id][$eq]=${categoryid}`
  );
  const [active, setActive] = useState(1);

  const clearFilter = () => {
    setSubCategory(null);
  };



  return (
    <div className="lg:grid mx-auto container grid-cols-4">
      <div className="col-span-1 border-r filter__category">
        <div className="h-14 w-full border-y flex items-center gap-1 px-2 lg:px-0">
          <Link to={"/"} className="text-gray-900 font-medium">
            Home
          </Link>
          <span className="text-gray-500">&gt;</span>
          <p className="text-gray-500">Category</p>
        </div>
        <div className="lg:pr-8">
          <button
            onClick={clearFilter}
            className={[
              "mt-3 text-red-500 hover:text-red-400 transition-all duration-500",
              subCategory ? "block" : "hidden",
            ].join(" ")}
          >
            clear filter
          </button>
        </div>
      </div>
      <div className="col-span-3 border-t lg:border-0">
        <div className="h-14 w-full hidden lg:block border-y"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-10 p-10">
          {!data?.data.length ? (
            <div className="text-center col-span-3">
              <p>Product not found</p>
            </div>
          ) : (
            data?.data?.map((value, index) => {
              const item = value?.attributes;
              return (
                <Card
                  key={index}
                  slug={item?.slug}
                  urlImage={item?.img?.data?.attributes?.formats?.small?.url}
                  priceDiscount={item?.priceDiscount}
                  price={item?.price}
                  title={item?.title}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
