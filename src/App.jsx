import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CustomError from "./components/Error";
import Layout from "./components/Layout";
import useAuth from "./hooks/useAuth";
import useFetch from "./hooks/useFetch";
import Category from "./pages/Category/Category";
import CheckoutPage from "./pages/Checkout/Checkout";
import Detail from "./pages/Detail/Detail";
import Home from "./pages/Home/Home";

export default function App() {
  const { user } = useAuth();
  const { data } = useFetch("/api/cart", user.jwt);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/product/:slug",
          element: <Detail />,
        },
        {
          path: "/products/:categoryid",
          element: <Category />,
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
      ],
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
      <RouterProvider router={router} />
    </div>
  );
}
