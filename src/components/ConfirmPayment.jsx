import { Receipt } from "@mui/icons-material";
import React from "react";
import gopay from "../assets/gopay.webp";
import ovo from "../assets/ovo.webp";
import shope from "../assets/shope.png";

export default function ConfirmPayment({ next, back }) {
  return (
    <div className="absolute top-0 w-full min-h-screen bg-black/50 z-50 left-0 flex overflow-hidden">
      <div className="w-full max-w-md bg-white m-auto shadow-xl p-7 rounded-lg relative overflow-hidden">
        <div className="opacity-30 bg-blue-200 w-32 aspect-square absolute rounded-full -right-10 -top-10"></div>
        <div className="opacity-30 bg-red-200 w-32 aspect-square absolute rounded-full right-0 -top-16"></div>
        {/* <div className="mx-auto bg-green-200 h-16 aspect-square rounded-full flex justify-center items-center">
          <Receipt className="text-green-500" fontSize="large" />
        </div> */}
        <button
          className="italic font-bold text-gray-800 text-2xl text-center"
          style={{ letterSpacing: -1.4 }}
        >
          E-Toko
        </button>
        {/* <p className="text-gray-500 leading-relaxed tracking-tight mt-2 text-center">
          Masukan <span className="text-gray-700 font-medium">detail</span>{" "}
          <span className="text-gray-700 font-medium">penerima</span> pesanan,
          Terimakasih.
        </p> */}
        {/* <div className="border-t mt-4">
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block tracking-tight text-sm font-medium text-gray-700 mb-2"
            >
              Nama
            </label>
            <input
              type="text"
              id="email"
              name="email"
              //   onChange={handleChange}
              //   value={form.email ?? ""}
              className="border outline-none border-gray-300 w-full py-2 px-3 rounded-md placeholder:tracking-tight"
              placeholder="ex: John Doe"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block tracking-tight text-sm font-medium text-gray-700 mb-2"
            >
              Telepon
            </label>
            <input
              type="text"
              id="email"
              name="email"
              //   onChange={handleChange}
              //   value={form.email ?? ""}
              className="border outline-none border-gray-300 w-full py-2 px-3 rounded-md placeholder:tracking-tight"
              placeholder="ex: 08xx-xxxx-xxxx"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block tracking-tight text-sm font-medium text-gray-700 mb-2"
            >
              Alamat
            </label>
            <input
              type="text"
              id="email"
              name="email"
              //   onChange={handleChange}
              //   value={form.email ?? ""}
              className="border outline-none border-gray-300 w-full py-2 px-3 rounded-md placeholder:tracking-tight"
              placeholder="ex: Jakarta"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block tracking-tight text-sm font-medium text-gray-700 mb-2"
            >
              Catatan untuk pengirim{" "}
              <span className="text-gray-400 font-normal text-xs tracking-normal">
                (optional)
              </span>
            </label>
            <input
              type="text"
              id="email"
              name="email"
              //   onChange={handleChange}
              //   value={form.email ?? ""}
              className="border outline-none border-gray-300 w-full py-2 px-3 rounded-md placeholder:tracking-tight"
              placeholder="ex: Jangan salah kirim barang"
            />
          </div>
        </div> */}
        <div className="mt-4 z-50">
          <h2 className="text-gray-500 tracking-tight">Metode pembayaran</h2>
          <div className="flex items-center mt-8">
            <input type="radio" id="gopay" className="w-5 aspect-square" />
            <label htmlFor="gopay">
              <img
                src={gopay}
                alt="gopay"
                className={["h-8 ml-5 saturate-100"].join(" ")}
              />
            </label>
          </div>
          <div className="flex items-center mt-8">
            <input type="radio" id="shope" className="w-5 aspect-square" />
            <label htmlFor="shope">
              <img
                src={shope}
                alt="shope"
                className={["h-8 ml-5 saturate-0"].join(" ")}
              />
            </label>
          </div>
          <div className="flex items-center mt-8">
            <input type="radio" id="ovo" className="w-5 aspect-square" />
            <label htmlFor="ovo">
              <img
                src={ovo}
                alt="ovo"
                className={["h-8 ml-5 saturate-0"].join(" ")}
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col items-center mt-10 justify-center text-center">
          <button
            onClick={back}
            className="text-gray-900 order-2 bg-white font-medium text-sm tracking-tight py-3 rounded-lg min-w-[120px]"
          >
            bayar nanti
          </button>
          <button
            onClick={next}
            className="text-white w-full order-1 bg-gray-900 font-medium text-sm tracking-tight py-3 rounded-lg min-w-[120px] z-50"
          >
            BAYAR SEKARANG
          </button>
        </div>
         <div className="opacity-20 bg-blue-500 w-full aspect-square absolute rounded-full right-16 -translate-x-1/2 -bottom-[340px] "></div>
      </div>
    </div>
  );
}
