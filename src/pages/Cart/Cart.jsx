import { DeleteOutlineOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CustomError from "../../components/Error";
import { hiddenLoading, showLoading } from "../../helpers/Loading";
import rupiahFormater from "../../helpers/rupiahFormater";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import makeRequest from "../../lib/axiosInstance";
import { clearCart, deleteItem } from "../../redux/cart/cartSlice";
import Order from "./Order";

export default function Cart() {
  const { products } = useCart();
  const dispatch = useDispatch();
  const [subTotal, setSubTotal] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    setSubTotal(products.reduce((prev, cur) => prev + cur.price, 0));

    return () => {};
  }, [products]);

  const clearCartHandler = () => {
    dispatch(clearCart());
  };

  const checkout = async () => {
    try {
      showLoading();
      const ids = products.map((item) => item.id);
      await makeRequest.put(
        "/api/cart",
        { data: { items: ids } },
        { headers: { Authorization: `Bearer ${user.jwt}` } }
      );
      hiddenLoading();

      const container = document.createElement("div");
      container.setAttribute("id", "modal-contianer");
      document.body.appendChild(container);
      document.body.classList.add("oveflow-hidden");
      ReactDOM.render(
        <Order
          token={user.jwt}
          totalPrice={subTotal}
          clearCart={clearCartHandler}
        />,
        container
      );
    } catch (error) {
      console.log(error);
      hiddenLoading();
    }
  };

  return !products.length ? (
    <CustomError title={"Oopss!"} description={"sorry no items here."} />
  ) : (
    <div className="lg:mt-10 container mx-auto px-2 lg:px-0">
      <div className="w-full flex justify-between lg:flex-row flex-col">
        <div className="mt-10 lg:mt-0">
          {products.map((value) => (
            <div className="w-full overflow-x-auto" key={value.id}>
              <div className="flex relative mb-5 w-[600px]" key={value.id}>
                <Link to={`/product/${value.slug}`}>
                  <img
                    src={value.img}
                    alt="product"
                    className="h-20 w-20 rounded-md"
                  />
                </Link>
                <div className="bg-white w-7 font-medium h-7 text-xs border rounded-full text-gray-900 flex justify-center items-center absolute -top-3 left-16">
                  1
                </div>
                <div className="text-gray-900 ml-5 my-auto tracking-tighter">
                  <h2 className="font-bold text-lg">{value.title}</h2>
                  <p className="text-gray-500">{value.category}</p>
                </div>
                <p className="ml-auto my-auto text-gray-900">
                  {rupiahFormater(value.price)}
                </p>
                <DeleteOutlineOutlined
                  className="ml-8 transition-all duration-300 hover:text-red-400 cursor-pointer text-red-500 my-auto"
                  onClick={() => {
                    const confirm = window.confirm("Yakin ingin menghapus?");
                    if (confirm) {
                      dispatch(deleteItem(value.id));
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="">
          <div className="border-b py-5 lg:w-[300px]">
            <p className="flex items-center justify-between text-gray-500">
              Subtotal
              <span className="text-gray-900">{rupiahFormater(subTotal)}</span>
            </p>
            <p className="flex items-center justify-between text-gray-500">
              Shipping
              <span className="text-gray-900 mt-3">{rupiahFormater(0)}</span>
            </p>
          </div>
          <div className="text-gray-500 flex justify-between items-center my-5">
            Total{" "}
            <p className="text-gray-900 text-xl font-semibold">
              {rupiahFormater(subTotal)}
            </p>
          </div>
          <button
            onClick={checkout}
            className="w-full bg-gray-900 text-white py-5 rounded-lg font-semibold "
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
