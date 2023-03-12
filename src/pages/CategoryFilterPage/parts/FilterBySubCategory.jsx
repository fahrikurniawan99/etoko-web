import clsx from "clsx";
import React from "react";
import useFetch from "../../../hooks/useFetch";

const Skeleton = () =>
  Array.from({ length: 5 }).map((_, i) => (
    <button
      className="w-[200px] h-12 rounded bg-gray-300 animate-pulse"
      key={i}
    ></button>
  ));

export default function FilterBySubCategory({ subcategory, setSubcategory }) {
  const { data, isLoading } = useFetch("/api/sub-categories");

  return (
    <div className="w-2/12 hidden lg:block">
      {isLoading ? (
        <Skeleton />
      ) : (
        data?.data?.map(({ attributes, id }) => {
          return (
            <button
              key={id}
              onClick={() => setSubcategory(attributes.title)}
              className={clsx(
                "w-[200px] font-medium text-left px-3 h-12 rounded",
                subcategory === attributes.title
                  ? "text-gray-700 bg-gray-200"
                  : "text-gray-600"
              )}
            >
              {attributes.title}
            </button>
          );
        })
      )}
    </div>
  );
}
