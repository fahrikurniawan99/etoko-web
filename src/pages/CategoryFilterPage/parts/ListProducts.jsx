import { SentimentVeryDissatisfied } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";
import rupiahFormater from "../../../utils/rupiahFormater";

const Skeleton = () =>
  Array.from({ length: 12 }).map((_, index) => (
    <div className="animate-pulse col-span-1" key={index}>
      <div className="bg-gray-300 w-full aspect-square rounded"></div>
      <h1 className="bg-gray-300 h-4 w-[200px] mt-2 rounded"></h1>
      <p className="bg-gray-300 h-4 w-[130px] mt-1 rounded"></p>
    </div>
  ));

const Product = ({ title, slug, price, discountPrice, img }) => {
  const navigate = useNavigate();
  return (
    <div className="col-span-1">
      <img
        alt={slug}
        src={img}
        onClick={() => navigate(`/product/${slug}`)}
        className="cursor-pointer hover:opacity-80 transition-all duration-300"
      />
      <h1 className="font-medium mt-2">{title}</h1>
      <p className="flex mt-1 gap-2">
        {rupiahFormater(discountPrice ? discountPrice : price)}
        {discountPrice && (
          <span className="text-xs text-gray-500 line-through">
            {rupiahFormater(price)}
          </span>
        )}
      </p>
    </div>
  );
};

export default function ListProducts({ isError, isLoading, data }) {
  return (
    <div className="w-full grid grid-cols-1 lg:w-10/12 sm:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto">
      {isLoading ? (
        <Skeleton />
      ) : data?.data?.length ? (
        data?.data?.map(({ attributes: item, id }) => {
          return (
            <Product
              title={item.title}
              img={item.img.data.attributes.formats.small.url}
              slug={item.slug}
              discountPrice={item?.priceDiscount}
              price={item.price}
              id={id}
              key={id}
            />
          );
        })
      ) : (
        <div className="flex col-span-1 sm:col-span-2 lg:col-span-3 justify-center items-center">
          <div className="text-center mt-[220px] lg:mt-0">
            <p className="mt-2 tracking-tight text-sm text-gray-700">
              Sorry, the product is not available yet
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
