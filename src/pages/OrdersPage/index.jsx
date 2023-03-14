import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import useAuth from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";
import ListOrders from "./parts/ListOrders";
import Skeleton from "./parts/Skeleton";

export default function OrdersPage() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 7;

  const { isLoading: isLoadingOrders, data: orders } = useFetch(
    `/api/orders?pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}&populate=*&sort=createdAt:DESC`,
    user.jwt
  );

  const handlePageClick = (e) => {
    setPage(e.selected + 1);
  };

  return (
    <div className="mx-auto container mt-5 px-2 lg:px-0 min-h-[calc(100vh-215px)] flex flex-col">
      <div>
        <h1 className="text-xl lg:text-3xl font-bold tracking-tight">
          Your Orders
        </h1>

        {isLoadingOrders ? (
          <Skeleton />
        ) : orders?.data?.length ? (
          <ListOrders data={orders?.data} />
        ) : (
          <div className="h-full w-full flex justify-center items-center">
            <p className="text-gray-500 tracking-tight">
              you haven't bought anything
            </p>
          </div>
        )}
      </div>
      {orders && (
        <div className="mt-16 lg:mt-auto justify-center flex">
          <ReactPaginate
            className="flex gap-2"
            previousClassName="h-10 aspect-square flex justify-center items-center"
            nextClassName="h-10 aspect-square flex justify-center items-center"
            pageClassName="h-10 aspect-square flex justify-center items-center"
            activeClassName="bg-gray-300"
            previousLabel={<ChevronLeft />}
            nextLabel={<ChevronRight />}
            pageCount={orders.meta.pagination.pageCount}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            renderOnZeroPageCount={null}
          />
        </div>
      )}
    </div>
  );
}
