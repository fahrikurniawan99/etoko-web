import React from "react";
import Button from "../../../components/Button";
import moment from "moment";

export default function ListOrders({ data }) {
  return (
    <div className="w-full overflow-x-auto">
      {data?.map(({ attributes: item, id }) => {
        return (
          <div key={id} className="lg:w-full w-[400px] flex py-5 items-center">
            <p className="border-r pr-3 border-gray-300 font-medium">
              {item?.products?.data?.length} items
            </p>
            <span className="ml-3 inline-block bg-indigo-200 text-indigo-500 text-sm tracking-tighter py-1 px-4 font-medium rounded">
              {item?.status}
            </span>
            <p className="text-gray-500 ml-auto pr-3 border-r border-gray-300">
              {moment(item?.createdAt).format("DD MMMM yy")}
            </p>
            <button className="text-indigo-600 tracking-tigh font-medium pl-3">
              details
            </button>
          </div>
        );
      })}
    </div>
  );
}
