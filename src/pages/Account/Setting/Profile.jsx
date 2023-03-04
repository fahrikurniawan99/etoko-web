import React from "react";

export default function Profile() {
  return (
    <div className="lg:flex">
      <div className="p-5 lg:shadow-md rounded-lg">
        <img
          src="/dummy-avatar.jpg"
          alt="avatar"
          className="w-[300px] h-[400px] object-cover mx-auto lg:mx-0"
        />
        <button
          disabled
          className="font-semibold text-gray-700 border w-full py-3 mt-3 cursor-not-allowed"
        >
          Pilih foto
        </button>
      </div>
      <div className="ml-10">
        <h2 className=" text-gray-700 font-semibold">Ubah Biodata Diri</h2>
        <div className="font-light flex text-gray-500 tracking-tight text-sm mt-3">
          <p className="w-36">Nama</p>
          <p className="tracking-tight">Fahri Kurniawan</p>
        </div>
        <div className="font-light flex text-gray-500 tracking-tight text-sm mt-3">
          <p className="w-36">Tanggal Lahir</p>
          <button className="text-green-600 tracking-tight">
            Tambah Tanggal Lahir
          </button>
        </div>
        <div className="font-light flex text-gray-500 tracking-tight text-sm mt-3">
          <p className="w-36">Jenis Kelamin</p>
          <button className="text-green-600 tracking-tight">
            Tambah Jenis Kelamin
          </button>
        </div>
        <h2 className=" text-gray-700 font-semibold mt-3">Ubah Kontak</h2>
        <div className="font-light flex text-gray-500 tracking-tight text-sm mt-3">
          <p className="w-36">Email</p>
          <button className="text-green-600 tracking-tight">
            Tambah Email
          </button>
        </div>{" "}
        <div className="font-light flex text-gray-500 tracking-tight text-sm mt-3">
          <p className="w-36">Nomor HP</p>
          <p className="tracking-tight">
            0896-3333-2128
          </p>
        </div>
      </div>
    </div>
  );
}
