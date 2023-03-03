import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Accordion from "../../components/Accordion";
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
          <Accordion
            title={"Type"}
            index={1}
            active={active}
            toggleAccordion={setActive}
          >
            {subCategoryData &&
              subCategoryData?.data?.map((value, index) => (
                <div className="flex items-center mt-2">
                  <input
                    type="radio"
                    name={"Type"}
                    id={index}
                    key={index}
                    checked={
                      value.attributes.title === subCategory ? true : false
                    }
                    onChange={() => setSubCategory(value.attributes.title)}
                  />
                  <label
                    htmlFor={index}
                    className={[
                      "ml-1 transition-all duration-500 font-medium cursor-pointer",
                      subCategory == value.attributes.title
                        ? "text-gray-900 "
                        : "text-gray-500 ",
                    ].join(" ")}
                  >
                    {value.attributes.title}
                  </label>
                </div>
              ))}
          </Accordion>
          <Accordion
            title={"Price"}
            index={2}
            active={active}
            toggleAccordion={setActive}
          >
            <div className="bg-gray-100 flex w-full px-3 py-3 rounded-md text-gray-400 mt-4">
              <span>From Rp.</span>
              <input
                type={"number"}
                className="w-full bg-transparent outline-none text-gray-800 ml-1 font-medium h-full"
                style={{ flex: 1 }}
              />
            </div>
            <div className="bg-gray-100 flex mt-3 w-full px-3 py-3 rounded-md text-gray-400">
              <span>Up to Rp.</span>
              <input
                type={"number"}
                className="w-full bg-transparent outline-none text-gray-800 ml-1 font-medium h-full"
                style={{ flex: 1 }}
              />
            </div>
          </Accordion>
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
