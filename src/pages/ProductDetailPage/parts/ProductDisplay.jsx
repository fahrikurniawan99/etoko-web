import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Button from "../../../components/Button";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import { addToCart } from "../../../redux/cart/cartSlice";
import rupiahFormater from "../../../utils/rupiahFormater";

export default function ProductDisplay({ item, id }) {
  const dispatch = useDispatch();
  const { isLogin } = useAuth();
  const { products } = useCart();

  const onAddCart = () => {
    if (products.some((product) => product.id === id)) {
      return toast.error("product already in cart");
    }
    const payload = {
      id: id,
      title: item?.title,
      price: item?.priceDiscount > 0 ? item?.priceDiscount : item?.price,
      category: item?.category?.data?.attributes?.title,
      img: item?.img?.data?.attributes?.formats?.thumbnail?.url,
      slug: item?.slug,
    };
    if (!isLogin) {
      return toast.error("Please login now");
    }
    dispatch(addToCart(payload));
  };

  return (
    <div className="lg:flex gap-5">
      <img
        src={item?.img?.data?.attributes?.url}
        className="w-full lg:w-6/12 aspect-square rounded"
      ></img>
      <div className="w-full lg:w-[46%] ml-auto mt-5">
        <h1 className="text-3xl tracking-tight font-semibold">{item?.title}</h1>
        <div className="flex mt-2">
          <p className="text-2xl tracking-tight">
            {rupiahFormater(
              item?.discountPrice ? item?.discountPrice : item?.price
            )}
          </p>
          {item?.price && (
            <span className="text-xl ml-1 text-gray-400 line-through">
              {rupiahFormater(item?.price)}
            </span>
          )}
        </div>
        <p className="text-gray-500 mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          dignissimos, nam consequatur consectetur quo dicta unde esse ipsa
          porro autem quod reiciendis recusandae quasi ut, tenetur numquam modi,
          maiores labore!
        </p>
        <div className="mt-5">
          <div className="flex justify-between border-t py-2 tracking-tight">
            <span className="flex items-center gap-2">
              <div className="h-2 rounded-full bg-blue-500 aspect-square"></div>
              Category
            </span>
            <span className="font-medium">
              {item?.category?.data?.attributes?.title}
            </span>
          </div>
          <div className="flex justify-between border-t py-2 tracking-tight">
            <span className="flex items-center gap-2">
              <div className="h-2 rounded-full bg-indigo-500 aspect-square"></div>
              Stock
            </span>
            <span className="font-medium">unlimited</span>
          </div>
          <div className="flex justify-between border-t py-2 tracking-tight">
            <span className="flex items-center gap-2">
              <div className="h-2 rounded-full bg-yellow-500 aspect-square"></div>
              Out of stock
            </span>
            <span className="font-medium">
              {item?.orders?.data?.length} item
            </span>
          </div>
        </div>
        <Button
          text={"Add to cart"}
          className={"py-4 w-full mt-5"}
          onClick={onAddCart}
        />
      </div>
    </div>
  );
}
