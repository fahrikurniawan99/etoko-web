import { ShoppingBagOutlined } from "@mui/icons-material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import { logout } from "../redux/auth/authSlice";
import { clearCart } from "../redux/cart/cartSlice";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { products } = useCart();
  const { isLogin } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [location]);

  const handleLogout = () => {
    const confirm = window.confirm("Are you sure you want to logout ?");
    if (confirm) {
      dispatch(clearCart());
      dispatch(logout());
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-white">
      <div className="flex container mx-auto h-16 items-center relative">
        <div
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
        </div>
        <Link
          to={"/"}
          className="italic font-bold text-gray-800 text-2xl"
          style={{ letterSpacing: -1.4 }}
        >
          E-Toko
        </Link>
        <div className="flex items-center lg:ml-16 lg:gap-5 gap-2 ml-auto text-sm lg:text-nbase">
          {isLogin ? (
            <Link to={`/account`} className="text-gray-500">
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
            <button className="text-red-500 font-medium" onClick={handleLogout}>
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
    </div>
  );
}
