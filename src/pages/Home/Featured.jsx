import { ArrowOutward } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import rupiahFormater from "../../helpers/rupiahFormater";
import useFetch from "../../hooks/useFetch";

export default function Featured() {
  const navigate = useNavigate();
  const { data } = useFetch(
    "/api/products?populate=*&[filters][type][$eq]=Featured"
  );

  return (
    <div className="flex w-full lg:justify-between my-10 flex-wrap justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-10">
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
  );
}
