import { ShoppingBagOutlined, WarningAmberOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { closeModal, showModal } from "../helpers/modalAction";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import { logout } from "../redux/auth/authSlice";
import { clearCart } from "../redux/cart/cartSlice";
import DialogModal from "./DialogModal";
import ShoppingCart from "./ShoppingCart";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { products } = useCart();
  const { isLogin } = useAuth();
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [location]);

  const openModalDialog = () => showModal();
  const cancelLogout = () => closeModal();
  const logoutHandler = () => {
    setIsDisabled(true);
    setIsLoading(true);
    dispatch(clearCart());
    dispatch(logout());
  };

  return (
    <>
      <DialogModal
        title={"Keluar akun"}
        desc={
          "Apakah kamu yakin ingin keluar akun ? jika iya kamu tidak akan bisa bertransaksi ataupun menambakan item ke keranjang belanja."
        }
        icon={
          <WarningAmberOutlined
            className="text-red-600"
            sx={{ fontWeight: 100 }}
          />
        }
        cancelText={"Batalkan"}
        actionText={"Keluar"}
        cancelClick={cancelLogout}
        actionClick={logoutHandler}
        disabled={isDisabled}
        isLoading={isLoading}
      />
      <div className="sticky top-0 z-50 bg-white px-2 lg:px-0">
        <ShoppingCart isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex container mx-auto h-16 items-center">
          {/* <div
            className={[
              "bg-white z-50 w-[300px] right-6 absolute top-10 overflow-auto py-5 px-7 shadow-lg rounded-lg origin-top-right transition-all",
              isOpen ? "block" : "hidden",
            ].join(" ")}
            style={{ maxHeight: "calc(100vh-64px)" }}
          >
            <p className="tracking-tight font-medium text-gray-800 text-lg mb-3">
              {products.length} items
            </p>
            <div className="border-t pt-5">
              <Link
                to={"/shopping-cart"}
                className="block text-center rounded-xl bg-gray-900 text-white py-4 w-full text-sm font-semibold"
              >
                View Cart
              </Link>
            </div>
          </div> */}
          <Link
            to={"/"}
            className="italic font-bold text-gray-800 text-2xl"
            style={{ letterSpacing: -1.4 }}
          >
            E-Toko
          </Link>
          <div className="flex items-center lg:ml-16 lg:gap-5 gap-2 ml-auto text-sm lg:text-nbase">
            {isLogin ? (
              <Link to={`/account/`} className="text-gray-500">
                Account
              </Link>
            ) : (
              <>
                <Link to={`/signin`} className="text-gray-500">
                  Sign In
                </Link>
                <Link to={`/signup`} className="text-gray-500">
                  Sign Up
                </Link>
              </>
            )}
            <Link to={`/about`} className="text-gray-500">
              About
            </Link>
            {isLogin && (
              <button
                className="text-red-500 font-medium"
                onClick={openModalDialog}
              >
                Logout
              </button>
            )}
          </div>
          <div className="lg:ml-auto ml-2" onClick={() => setIsOpen(!isOpen)}>
            <div className="bg-red-50 h-10 aspect-square rounded-full flex justify-center items-center text-red-900 relative cursor-pointer hover:bg-red-100 transition-all duration-200">
              <ShoppingBagOutlined className="text-sm" />
              <span className="absolute bg-gray-800 h-5 w-5 rounded-full text-white flex justify-center items-center text-xs -top-2 left-0 lg:left-auto lg:-right-1">
                {products.length}
              </span>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
