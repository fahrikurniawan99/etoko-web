import { Close } from "@mui/icons-material";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import rupiahFormater from "../../../utils/rupiahFormater";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import makeRequest from "../../../lib/axiosInstance";
import { deleteItem } from "../../../redux/cart/cartSlice";

export default function ShoppingCart({ isOpen, setIsOpen }) {
  const { user } = useAuth();
  const { products } = useCart();
  const [subTotal, setSubTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setSubTotal(products.reduce((prev, cur) => prev + cur.price, 0));
  }, [products]);

  const checkoutHandler = async () => {
    try {
      setIsLoading(true);
      const url = "/api/cart";
      const options = { headers: { Authorization: `Bearer ${user.jwt}` } };
      const body = {
        data: { items: products.map((item) => item.id) },
      };
      await makeRequest.put(url, body, options);
      setIsLoading(false);
      window.location.href = "/checkout";
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.error?.message || "Internal server error"
      );
      setIsLoading(false);
    }
  };

  return (
    <div
      className={clsx(
        isOpen ? "flex" : "hidden",
        "absolute bg-white w-full max-w-md top-full h-[calc(100vh_-_64px)] right-0 flex flex-col border-t border-l text-gray-900 z-[99]"
      )}
    >
      <div className="flex justify-between w-full p-5 font-medium">
        Keranjang Belanja{" "}
        <Close
          className="cursor-pointer text-gray-400"
          onClick={() => {
            setIsOpen(false);
            document.body.classList.remove("overflow-hidden");
          }}
        />
      </div>
      <div className="p-5 w-full h-full space-y-5 overflow-auto">
        {products.length ? (
          products.map((item) => {
            return (
              <div className="text-gray-900 flex gap-3">
                <img src={item.img} className="h-20 w-20" alt="" />
                <div className="justify-between flex w-full">
                  <div className="flex flex-col">
                    <h1 className="lg:text-lg font-medium w-36 truncate">
                      {item.title}
                    </h1>
                    <p className="text-gray-500 text-xs lg:text-sm">
                      {item.category}
                    </p>
                    <p className="mt-auto text-gray-500 text-xs lg:text-sm">
                      Qty 1
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="lg:text-lg font-medium">
                      {rupiahFormater(item.price)}
                    </p>
                    <button
                      onClick={() => dispatch(deleteItem(item.id))}
                      className="text-red-500 text-xs lg:text-sm mt-auto font-medium text-left"
                    >
                      remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">tidak ada item</p>
        )}
      </div>
      <div className="mt-auto border-t w-full px-5 pt-5 pb-8">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p className="text-lg font-medium">{rupiahFormater(subTotal)}</p>
        </div>
        <button
          onClick={checkoutHandler}
          disabled={isLoading || !products.length}
          className="bg-gray-900 text-white text-sm h-12 font-medium w-full rounded mt-5 disabled:opacity-30"
        >
          {isLoading ? "loading..." : "Checkout"}
        </button>
      </div>
    </div>
  );
}
