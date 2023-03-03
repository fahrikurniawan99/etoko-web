import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

export default function Categories() {
  const { data, isLoading } = useFetch(`/api/categories?populate=*`);
  return (
    <div className="lg:h-[250px] flex mb-10 w-full gap-10 mt-10 flex-col md:flex-row">
      {isLoading
        ? Array.from({ length: 4 }).map((value, i) => (
            <div
              key={i}
              className="w-full h-[140px] lg:h-full lg:flex-1 bg-gray-200 animate-pulse rounded-xl overflow-hidden relative"
            ></div>
          ))
        : data?.data?.map((value) => (
            <div
              key={value.id}
              className="w-full h-[140px] lg:h-full lg:flex-1  rounded-xl overflow-hidden relative"
            >
              <Link
                to={`/products/${value.id}`}
                className="bg-white w-[200px] text-gray-500 py-3 rounded-lg absolute z-40 bottom-10 -translate-x-1/2 left-1/2 text-center"
              >
                {value.attributes.title}
              </Link>
              <div className="bg-black/30 w-full h-full absolute"></div>
              <img
                alt="categories"
                className="w-full h-full object-cover"
                src={`${import.meta.env.VITE_BASE_URL}${
                  value.attributes.img.data.attributes.formats.small.url
                }`}
              />
            </div>
          ))}
    </div>
  );
}
