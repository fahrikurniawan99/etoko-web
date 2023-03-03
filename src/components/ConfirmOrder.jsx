import { Close, Receipt, WarningAmberOutlined } from "@mui/icons-material";
import React from "react";

export default function ConfirmOrder({ back, next }) {
  return (
    <div className="absolute top-0 w-full min-h-screen bg-black/50 z-50 left-0 flex overflow-hidden">
      <div className="w-full max-w-md bg-white m-auto shadow-xl p-7 rounded-lg relative">
        <div className="mx-auto bg-green-200 h-16 aspect-square rounded-full flex justify-center items-center">
          <Receipt className="text-green-500" fontSize="large" />
        </div>
        <h1 className="font-semibold tracking-tight text-xl text-gray-700 text-center mt-4">
          Seleaikan pesanan kamu!
        </h1>
        <p className="text-gray-500 leading-relaxed tracking-tight mt-2">
          Masukan <span className="text-gray-700 font-medium">detail</span>{" "}
          pesanan <span className="text-gray-700 font-medium">penerima</span>,
          Terimakasih.
        </p>
        <div className="border-t mt-4">
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
        </div>
        <div className="flex items-center mt-4 justify-center text-center">
          <button
            onClick={back}
            className="text-gray-900 bg-white font-medium text-sm tracking-tight py-3 rounded-lg min-w-[120px]"
          >
            Kembali
          </button>
          <button
            onClick={next}
            className="text-white bg-gray-900 font-medium text-sm tracking-tight py-3 rounded-lg min-w-[120px]"
          >
            Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
}
