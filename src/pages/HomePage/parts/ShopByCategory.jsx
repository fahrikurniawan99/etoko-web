import clsx from "clsx";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";

const categoriesGridSkeleton = [
  "col-span-1 row-span-2 lg:col-span-2 lg:row-span-2",
  "col-span-1 row-span-2 lg:col-span-2 lg:row-span-2",
  "col-span-2 row-span-1 lg:col-span-3 lg:row-span-1",
  "col-span-2 row-span-1 lg:col-span-3 lg:row-span-1",
];

const wrapBaseClasName = "rounded relative overflow-hidden bg-gray-300";

const CategoryCard = ({ grid, title, img, alt, id }) => {
  const navigate = useNavigate();
  return (
    <div
      className={clsx(
        `col-span-${grid?.sm?.col}`,
        `row-span-${grid?.sm?.row}`,
        `lg:col-span-${grid?.lg?.col}`,
        `lg:row-span${grid?.lg?.row}`,
        wrapBaseClasName
      )}
    >
      <div className="h-full w-full bg-gray-900">
        <img alt={alt} src={img} className="w-full h-full object-cover" />
      </div>
      <div
        onClick={() => navigate(`/products/${id}`)}
        className="absolute bottom-0 w-full left-0 h-full bg-black/50 flex flex-col text-white px-8 py-5 cursor-pointer"
      >
        <h3 className="text-lg font-medium mt-auto">{title}</h3>
        <p>Shop now</p>
      </div>
    </div>
  );
};

const CategorySkeleton = () =>
  categoriesGridSkeleton.map((grid, i) => (
    <div className={clsx(grid, wrapBaseClasName, "animate-pulse")} key={i}>
      <div className="absolute-bottom-0 w-full left-0 h-full flex flex-col px-8 py-5">
        <h3 className="h-5 rounded w-[150px] bg-gray-400 mt-auto"></h3>
        <p className="h-5 rounded w-[90px] bg-gray-400 mt-3"></p>
      </div>
    </div>
  ));

export default function ShopByCategory() {
  const { data, isLoading, isError } = useFetch(
    "/api/categories?populate=img&sort=id"
  );

  if (isError) {
    toast.error("Internal server errro");
  }

  return (
    <section>
      <div className="mx-auto container px-2 lg:px-0 mt-10 lg:mt-32">
        <h2 className="text-2xl font-bold">Shop by Category</h2>
        <div className="h-[750px] lg:h-[550px] w-full mt-5 grid lg:grid-cols-7 lg:grid-rows-2 gap-5 lg:gap-10 grid-cols-2 grid-rows-4">
          {isLoading ? (
            <CategorySkeleton />
          ) : (
            data?.data?.map(({ attributes: item, id }) => {
              return (
                <CategoryCard
                  id={id}
                  key={id}
                  title={item.title}
                  alt={item.title}
                  img={item.img.data.attributes.formats.large.url}
                  grid={item.grid}
                />
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
