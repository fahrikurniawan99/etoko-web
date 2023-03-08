import React from "react";
import { useNavigate } from "react-router-dom";
import rupiahFormater from "../helpers/rupiahFormater";

export default function Card({ urlImage, slug, title, priceDiscount, price }) {
  const navigate = useNavigate();
  return (
    <div
      className="h-[400px] overflow-hidden hover:opacity-80 transition-all duration-500 cursor-pointer"
      onClick={() => navigate(`/product/${slug}`)}
    >
      <img
        src={urlImage}
        alt="thumbnail"
        className="object-cover h-[300px] w-full rounded-lg"
      />
      <h1 className="text-gray-800 font-medium  tracking-tight text-lg mt-2" id="modal-title">
      </h1>
      <p className="text-gray-800 font-medium">
        {priceDiscount ? rupiahFormater(priceDiscount) : rupiahFormater(price)}
        <span
          className={[
            priceDiscount ? "inline-block" : "hidden",
            "ml-1 text-gray-300 line-through font-normal",
          ].join(" ")}
        >
          {rupiahFormater(price)}
        </span>
      </p>
    </div>
  );
}
