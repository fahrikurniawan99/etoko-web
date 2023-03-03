import { BookmarkAdd, WarningAmberOutlined, Close } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import rupiahFormater from "../../helpers/rupiahFormater";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import useFetch from "../../hooks/useFetch";
import { addToCart } from "../../redux/cart/cartSlice";

const Modal = () => {
  const closeModal = () => {
    document
      .getElementById("root")
      .classList.remove("w-full", "h-screen", "overflow-hidden");
    document.body.lastChild.remove();
  };
  return (
    <div className="absolute top-0 w-full h-screen bg-black/50 z-50 left-0 flex overflow-hidden">
      <div className="w-full max-w-md bg-white h-[300px] m-auto shadow-xl p-7 rounded-lg text-center relative">
        <Close
          className="text-gray-700 absolute right-7 cursor-pointer hover:text-gray-900 transition-all duration-300"
          onClick={closeModal}
        />
        <div className="mx-auto bg-yellow-200 h-16 aspect-square rounded-full flex justify-center items-center">
          <WarningAmberOutlined className="text-yellow-500" fontSize="large" />
        </div>
        <h1 className="font-semibold tracking-tight text-xl text-gray-700 text-center mt-4">
          Cannot add product to cart!
        </h1>
        <p className="text-gray-500 leading-relaxed tracking-tight mt-2">
          Please sign in or sign up now. After done you can back again. ThankYou
        </p>
        <div className="flex items-center mt-4 justify-center">
          <a
            href={"/signin"}
            className="text-gray-900 bg-white font-medium text-sm tracking-tight py-3 rounded-lg min-w-[120px]"
          >
            Sign In
          </a>
          <a
            href={"/signup"}
            className="text-white bg-gray-900 font-medium text-sm tracking-tight py-3 rounded-lg min-w-[120px]"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default function Detail() {
  const { slug } = useParams();
  const { data } = useFetch(
    `/api/products?populate=*&filters[slug][$eq]=${slug}`
  );
  const dispatch = useDispatch();
  const { products } = useCart();
  const item = data?.data[0];
  const { isLogin } = useAuth();

  const payload = {
    id: item?.id,
    title: item?.attributes?.title,
    price:
      item?.attributes?.priceDiscount > 0
        ? item?.attributes?.priceDiscount
        : item?.attributes?.price,
    category: item?.attributes?.category?.data?.attributes?.title,
    img: item?.attributes?.img?.data?.attributes?.formats?.thumbnail?.url,
    slug: item?.attributes?.slug,
  };

  const handleOnClick = () => {
    if (isLogin) {
      return dispatch(addToCart(payload));
    }
    const container = document.createElement("div");
    document.body.appendChild(container);
    document
      .getElementById("root")
      .classList.add("w-full", "h-screen", "overflow-hidden");
    ReactDOM.render(<Modal />, container);
  };

  return !data ? (
    <div
      className={`flex justify-center items-center container mx-auto`}
      style={{ height: "calc(100vh - 64px)" }}
    >
      <CircularProgress />
    </div>
  ) : (
    <div className="container lg:mb-10  mx-auto" id="detail-product">
      <div className="h-14 w-full border-y flex items-center gap-1 px-2 lg:px-0">
        <Link to={"/"} className="text-gray-900 font-medium">
          Home
        </Link>
        <span className="text-gray-500">&gt;</span>
        <Link
          to={"/products/" + item?.attributes?.category?.data?.id}
          className="text-gray-900 font-medium"
        >
          {item?.attributes?.category?.data?.attributes?.title}
        </Link>
        <span className="text-gray-500">&gt;</span>
        <p className="text-gray-500">{slug}</p>
      </div>
      <div className="w-full flex flex-col lg:flex-row mt-5 px-2 lg:px-0">
        <img
          alt="product"
          src={
            data?.data[0]?.attributes?.img?.data?.attributes?.formats?.small
              ?.url
          }
          className="w-[600px] h-[500px] object-cover"
        />
        <div className="lg:ml-10 mt-10 lg:mt-0">
          <h1 className="text-gray-700 text-3xl font-bold">
            {data?.data[0]?.attributes?.title}
          </h1>
          <h2 className="text-gray-700 font-semibold text-3xl mt-3 flex items-start gap-1">
            {data?.data[0]?.attributes?.priceDiscount > 0
              ? rupiahFormater(data?.data[0]?.attributes.priceDiscount)
              : rupiahFormater(data?.data[0]?.attributes.price)}
            {data?.data[0]?.attributes?.priceDiscount > 0 && (
              <span className="text-gray-400 line-through font-normal text-xl">
                {rupiahFormater(data?.data[0]?.attributes.price)}
              </span>
            )}
          </h2>
          <p className="text-gray-400 leading-relaxed mt-5">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis
            itaque asperiores sapiente eaque perferendis quas incidunt
            laudantium porro excepturi corporis suscipit explicabo enim nam
            maiores, at eveniet ipsam quae. Explicabo?
          </p>
          <div className="flex justify-between items-center mt-10 mb-10 lg:mb-0">
            <button
              disabled={
                Object.keys(
                  products.find((value) => value.id === item.id) || {}
                ).length
              }
              className="bg-gray-900 text-white w-56 py-3 disabled:opacity-20"
              onClick={handleOnClick}
            >
              Add To Cart
            </button>
            <BookmarkAdd
              fontSize="large"
              className="text-gray-900 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
