import moment from "moment";
import React from "react";

export default function ListOrders({ data }) {
  return (
    <div className="w-full overflow-x-auto">
      {data?.map(({ attributes: item, id }) => {
        return (
          <div key={id} className="w-[400px] sm:w-full flex py-5 items-center">
            <p className="border-r border-gray-300 font-medium w-20">
              {item?.products?.data?.length} items
            </p>
            <span className="ml-8 inline-block bg-indigo-200 text-indigo-500 text-sm tracking-tighter py-1 px-4 font-medium rounded">
              {item?.status}
            </span>
            <p className="text-gray-500 ml-auto border-gray-300 w-32">
              {moment(item?.createdAt).format("DD MMMM yy")}
            </p>
          </div>
        );
      })}
    </div>
  );
}
