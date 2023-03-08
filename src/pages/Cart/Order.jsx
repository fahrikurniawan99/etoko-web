import { PaidOutlined } from "@mui/icons-material";
import clsx from "clsx";
import React, { useState } from "react";
import { hiddenLoading, showLoading } from "../../helpers/Loading";
import useFetch from "../../hooks/useFetch";
import makeRequest from "../../lib/axiosInstance";

export default function Order({ token, totalPrice, clearCart }) {
  const { data } = useFetch("/api/delivery-addresses", token);
  const [isSelected, setIsSelected] = useState(0);

  const handlerPay = async () => {
    try {
      showLoading();
      const body = {
        total: totalPrice,
        delivery_address: data?.data[0]?.id,
      };
      await makeRequest.post(
        "/api/orders",
        { data: body },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      document.getElementById("modal-contianer").remove();
      document.body.classList.remove("oveflow-hidden");
      hiddenLoading();
      clearCart();
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      hiddenLoading();
    }
  };

  return (
    <div className="w-full bg-white h-screen absolute top-0 left-0 z-50 overflow-auto">
      <div className="py-3 border-b">
        <div className="mx-auto container px-2 lg:px-0">
          <h1 className="text-2xl text-gray-900 font-bold">Checkout Page</h1>
        </div>
      </div>
      <div className="lg:flex gap-10 container mx-auto my-5 px-2 lg:px-0">
        <div className="lg:w-7/12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {data &&
              data.data.map((value, index) => {
                const attributes = value.attributes;
                return (
                  <div
                    className={clsx(
                      "shadow-sm px-5 py-3 w-fullrounded-lg text-gray-900 border flex flex-col h-[200px] lg:h-[250px]",
                      isSelected === index && "bg-gray-100"
                    )}
                  >
                    <h1 className="text-xl font-semibold tracking-tight">
                      {attributes.recipientName}
                    </h1>
                    <p className="text-gray-700 tracking-tight">
                      {attributes.phoneNumber}
                    </p>
                    <p className="text-gray-700 tracking-tight mt-1">
                      {attributes.address}{" "}
                      {attributes.detailAddress && (
                        <span>({attributes.detailAddress})</span>
                      )}
                    </p>
                    <div className="flex justify-end gap-3 mt-auto">
                      <button
                        onClick={() => setIsSelected(index)}
                        disabled={isSelected === index}
                        className="block border hover:opacity-50 transition-all duration-300 border-gray-900 w-[120px] text-white py-2 text-xs font-medium bg-gray-900 disabled:opacity-30 disabled:hover:opacity-30"
                      >
                        Pilih Alamat
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="grid-cols-1 lg:grid-cols-2 grid mt-4 gap-5">
            <div>
              <label className="block tracking-tight text-sm font-medium text-gray-700 mb-2">
                Nama Penerima
              </label>
              <input
                type="text"
                value={data?.data[0]?.attributes?.recipientName}
                className="border outline-none border-gray-300 w-full py-2 px-3 rounded-md placeholder:tracking-tight text-gray-600"
                disabled
                placeholder="Nama Penerima"
              />
            </div>
            <div>
              <label className="block tracking-tight text-sm font-medium text-gray-700 mb-2">
                Nomor HP
              </label>
              <input
                type="text"
                value={data?.data[0]?.attributes?.phoneNumber}
                className="border outline-none border-gray-300 w-full py-2 px-3 rounded-md placeholder:tracking-tight text-gray-600"
                disabled
                placeholder="Nomor HP"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block tracking-tight text-sm font-medium text-gray-700 mb-2">
              Alamat
            </label>
            <input
              type="text"
              value={data?.data[0]?.attributes?.address}
              className="border outline-none border-gray-300 w-full py-2 px-3 rounded-md placeholder:tracking-tight text-gray-600"
              disabled
              placeholder="Alamat"
            />
          </div>
          <div className="flex items-center mt-5 justify-end">
            <button
              onClick={handlerPay}
              className="bg-gray-900 flex items-center gap-1 justify-center w-56 h-12 text-white font-medium rounded text-sm ml-5"
            >
              <PaidOutlined fontSize="small" />
              Bayar sekarang
            </button>
          </div>
        </div>
        <div className="lg:w-5/12"></div>
      </div>
    </div>
  );
}
