import { ShoppingBagOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { logout } from "../../redux/auth/authSlice";
import { clearCart } from "../../redux/cart/cartSlice";
import MobileNav from "./parts/MobileNav";
import ShoppingCart from "./parts/ShoppingCart";

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

  const logoutHandler = () => {
    if (window.confirm("Are you sure you want to logout")) {
      dispatch(clearCart());
      dispatch(logout());
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-white px-2 lg:px-0 border-b">
      <ShoppingCart isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex container mx-auto h-16 items-center">
        <Link
          to={"/"}
          className="italic font-bold text-gray-800 text-2xl"
          style={{ letterSpacing: -1.4 }}
        >
          E-Toko
        </Link>
        <div className="hidden lg:flex items-center lg:ml-16 lg:gap-5 gap-2 ml-auto text-sm">
          <Link to={`/products/1`} className="text-gray-500">
            Men
          </Link>
          <Link to={`/products/2`} className="text-gray-500">
            Women
          </Link>
          <Link to={`/products/3`} className="text-gray-500">
            Child
          </Link>
          <Link to={`/products/4`} className="text-gray-500">
            Accessoris
          </Link>
        </div>
        <MobileNav />
        <div className="ml-auto flex items-center gap-5 text-sm">
          <div className="lg:flex hidden items-center gap-5">
            {isLogin ? (
              <Link to={`/orders`} className="text-gray-500">
                Your orders
              </Link>
            ) : (
              <>
                <Link to={`/signin`} className="text-gray-700">
                  Sign In
                </Link>
                <Link to={`/signup`} className="text-gray-700">
                  Sign Up
                </Link>
              </>
            )}
            {isLogin && (
              <button
                className="text-red-500 font-medium"
                onClick={logoutHandler}
              >
                Logout
              </button>
            )}
          </div>
          {isLogin ? (
            <button
              className="text-red-500 font-medium lg:hidden"
              onClick={logoutHandler}
            >
              Logout
            </button>
          ) : (
            <>
              <Link to={`/signin`} className="text-gray-700">
                Sign In
              </Link>
              <Link to={`/signup`} className="text-gray-700">
                Sign Up
              </Link>
            </>
          )}
          <div className="flex items-center gap-1">
            <ShoppingBagOutlined
              className="text-gray-400 cursor-pointer hover:text-gray-800"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />
            <p className="mt-1">{products.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
