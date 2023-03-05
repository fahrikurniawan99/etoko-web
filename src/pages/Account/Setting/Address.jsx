import React from "react";
import ReactDOM from "react-dom";
import NewAddress from "../../../components/NewAddress";
import useAuth from "../../../hooks/useAuth";
import useFetch from "../../../hooks/useFetch";

export default function Address() {
  const { user } = useAuth();

  const addNewAddress = () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(<NewAddress user={user} />, container);
  };

  return (
    <div className="">
      <div className="flex">
        <button
          onClick={addNewAddress}
          className="bg-gray-900 text-white font-medium w-52 py-3 text-sm ml-auto"
        >
          Tambah Alamat
        </button>
      </div>
      <AddressList />
    </div>
  );
}

export function AddressList() {
  const { user } = useAuth();
  const { data, isLoading } = useFetch("/api/delivery-addresses", user.jwt);

  return (
    <div className="mt-5">
      {isLoading ? (
        <div className="space-y-5">
          {Array.from({ length: 3 }).map((v, i) => (
            <div
              key={i}
              className="bg-gray-300 animate-pulse h-[150px] w-full rounded-lg"
            ></div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {data?.data.map((item) => {
            const { attributes } = item;
            return (
              <div
                className={[
                  "shadow-sm px-5 py-3 w-full rounded-lg text-gray-900 border flex flex-col",
                ].join(" ")}
              >
                <h1 className="text-xl font-semibold tracking-tight">
                  {attributes.recipientName}
                </h1>
                <p className="text-gray-700 tracking-tight">
                  {attributes.phoneNumber}
                </p>
                <p className="text-gray-700 tracking-tight mt-1">
                  {attributes.address} <span>({attributes.detailAddress})</span>
                </p>
                <div className="flex justify-end gap-3 mt-5">
                  <button className="block border hover:opacity-50 transition-all duration-300 border-gray-900 w-[120px] text-white py-2 text-xs font-medium bg-gray-900">
                    Ubah Alamat
                  </button>
                  <button className="block border hover:opacity-50 transition-all duration-300 border-red-500 w-[120px] text-red-500 py-2 text-xs font-medium">
                    Hapus
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
