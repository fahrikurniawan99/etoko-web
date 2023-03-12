import React from "react";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CustomError from "./components/Error";
import Layout from "./components/Layout";
import useAuth from "./hooks/useAuth";
import useFetch from "./hooks/useFetch";
import CategoryFilterPage from "./pages/CategoryFilterPage";
import CheckoutPage from "./pages/Checkout/Checkout";
import HomePage from "./pages/HomePage";
import OrdersPage from "./pages/OrdersPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

export default function App() {
  const { user, isLogin } = useAuth();
  const { data } = useFetch("/api/cart", user.jwt);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/product/:slug",
          element: <ProductDetailPage />,
        },
        {
          path: "/products/:categoryid",
          element: <CategoryFilterPage />,
        },
        isLogin && { path: "/orders", element: <OrdersPage /> },
        {
          path: "*",
          element: (
            <CustomError
              title={"ERROR 404!"}
              description={"looks like the page was not found"}
            />
          ),
        },
      ],
    },
    !isLogin && {
      path: "/signin",
      element: <SignInPage />,
    },
    !isLogin && {
      path: "/signup",
      element: <SignUpPage />,
    },
    data?.data[0]?.attributes?.items?.length && {
      path: "checkout",
      element: <CheckoutPage />,
    },
    {
      path: "*",
      element: (
        <CustomError
          title={"ERROR 404!"}
          description={"looks like the page was not found"}
        />
      ),
    },
  ]);
  return (
    <div>
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
}
