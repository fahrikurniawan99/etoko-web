import { ArrowBack, Close, LocationOnOutlined } from "@mui/icons-material";
import React from "react";

export default function NewAddressTwo({ item, user, back }) {
  const closeHandler = () => {
    document.body.lastChild.remove();
    document.body.lastChild.remove();
  };
  return (
    item && (
      <div className="w-full h-screen absolute top-0 left-0 bg-black/50 flex lg:py-10">
        <div className="bg-white lg:w-[700px] lg:h-full h-screen w-full m-auto lg:rounded-lg py-5 lg:px-10 px-2 overflow-auto relative">
          <ArrowBack
            className="absolute left-2 lg:left-10 top-5 cursor-pointer"
            sx={{fontSize: 30}}
            onClick={() => {
              const confirm = window.confirm("Yakin ingin membatalkan?");
              if (confirm) {
                back();
              }
            }}
          />
          <Close
            className="absolute right-2 top-2 cursor-pointer"
            onClick={() => {
              const confirm = window.confirm("Yakin ingin membatalkan?");
              if (confirm) {
                closeHandler();
              }
            }}
          />
          <h1 className="font-bold text-gray-900 text-2xl text-center">
            Tambah Alamat
          </h1>
          <p className="bg-gray-100 text-gray-500 px-5 py-4 mt-5">
            {" "}
            <LocationOnOutlined className="text-gray-700 mr-1" />{" "}
            {item.display_name}
          </p>
          <form>
            <div className="mt-4">
              <label
                htmlFor="alamatLengkap"
                className="block tracking-tight text-sm font-medium text-gray-700 mb-2"
              >
                Alamat Lengkap
              </label>
              <textarea
                id="alamatLengkap"
                name="alamatLengkap"
                className="border outline-none border-gray-300 w-full py-2 px-3 rounded-md placeholder:tracking-tight"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="nama"
                className="block tracking-tight text-sm font-medium text-gray-700 mb-2"
              >
                Nama Penerima
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                value={user?.username}
                className="border outline-none border-gray-300 w-full py-2 px-3 rounded-md placeholder:tracking-tight"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="nama"
                className="block tracking-tight text-sm font-medium text-gray-700 mb-2"
              >
                Nomor HP
              </label>
              <input
                type="number"
                id="nomer"
                name="nomer"
                className="border outline-none border-gray-300 w-full py-2 px-3 rounded-md placeholder:tracking-tight"
              />
            </div>
            <div className="flex items-center mt-4 justify-center text-center">
              <button className="text-white bg-gray-900 font-medium text-sm tracking-tight py-3 rounded-lg min-w-[120px]">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
