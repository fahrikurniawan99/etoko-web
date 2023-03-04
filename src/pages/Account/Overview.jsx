import {
    LocalAtmOutlined,
    LocalShippingOutlined, ProductionQuantityLimits
} from "@mui/icons-material";
import React from "react";

export default function Overview({ setIsOpen }) {
  return (
    <>
      <h1 className="font-semibold text-gray-800 tracking-tight text-2xl">
        Ringkasan
      </h1>
      <p className="text-gray-400 tracking-tight">
        Informasi tentang traksaksi anda.
      </p>
      <div className="mt-5 space-y-5">
        <div className="w-full flex gap-5 items-center">
          <div className="h-20 w-20 rounded-lg bg-green-100 flex justify-center items-center">
            <LocalAtmOutlined
              className="text-green-500"
              sx={{ fontSize: 50 }}
            />
          </div>
          <div>
            <h2 className="text-gray-400 tracking-tight text-xl">
              Pesanan Seleai
            </h2>
            <p className="text-green-500 font-bold text-3xl">1000</p>
          </div>
        </div>
        <div className="w-full flex gap-5 items-center">
          <div className="h-20 w-20 rounded-lg bg-orange-100 flex justify-center items-center">
            <LocalShippingOutlined
              className="text-orange-500"
              sx={{ fontSize: 50 }}
            />
          </div>
          <div>
            <h2 className="text-gray-400 tracking-tight text-xl">
              Pesanan Menuju Lokasi
            </h2>
            <p className="text-orange-500 font-bold text-3xl">10</p>
          </div>
        </div>
        <div className="w-full flex gap-5 items-center">
          <div className="h-20 w-20 rounded-lg bg-red-100 flex justify-center items-center">
            <ProductionQuantityLimits
              className="text-red-500"
              sx={{ fontSize: 50 }}
            />
          </div>
          <div>
            <h2 className="text-gray-400 tracking-tight text-xl">
              Perlu Di Selesikan
            </h2>
            <p className="text-red-500 font-bold text-3xl">999</p>
          </div>
        </div>
      </div>
    </>
  );
}
