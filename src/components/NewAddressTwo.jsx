import { ArrowBack, Close, LocationOnOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import makeRequest from "../lib/axiosInstance";

export default function NewAddressTwo({ item, back, user }) {
  const [isError, setIsError] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ name: user?.username });

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (Object.keys(form).length < 2) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [form]);

  const closeHandler = () => {
    document.body.lastChild.remove();
    document.body.lastChild.remove();
  };

  const saveHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const data = {
        address: item?.display_name,
        detailAddress: form?.detailAddress,
        recipientName: form?.name,
        phoneNumber: form?.phone,
      };

      await makeRequest.post(
        "/api/delivery-addresses",
        {
          data,
        },
        {
          headers: { Authorization: `Bearer ${user?.jwt}` },
        }
      );

      setIsLoading(false);
      setIsError(false);

      window.location.reload();
    } catch (error) {
      setIsError(false);
      console.log(error.response.data);
    }
  };

  return (
    item && (
      <div className="w-full h-screen absolute top-0 left-0 bg-black/50 flex lg:py-10">
        <div className="bg-white lg:w-[700px] lg:h-full h-screen w-full m-auto lg:rounded-lg py-5 lg:px-10 px-2 overflow-auto relative">
          <ArrowBack
            className="absolute left-2 lg:left-10 top-5 cursor-pointer"
            sx={{ fontSize: 30 }}
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
                htmlFor="detailAddress"
                className="block tracking-tight text-sm font-medium text-gray-700 mb-2"
              >
                Alamat Lengkap
              </label>
              <textarea
                id="detailAddress"
                name="detailAddress"
                onChange={handleOnChange}
                className="border outline-none border-gray-300 w-full py-2 px-3 rounded-md placeholder:tracking-tight"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="name"
                className="block tracking-tight text-sm font-medium text-gray-700 mb-2"
              >
                Nama Penerima
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleOnChange}
                defaultValue={user?.username}
                className="border outline-none border-gray-300 w-full py-2 px-3 rounded-md placeholder:tracking-tight"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="phone"
                className="block tracking-tight text-sm font-medium text-gray-700 mb-2"
              >
                Nomor HP
              </label>
              <input
                type="number"
                id="phone"
                name="phone"
                onChange={handleOnChange}
                className="border outline-none border-gray-300 w-full py-2 px-3 rounded-md placeholder:tracking-tight"
              />
            </div>
            <div className="flex items-center mt-4 justify-center text-center">
              <button
                disabled={isError || isLoading}
                onClick={saveHandler}
                className="text-white bg-gray-900 font-medium text-sm tracking-tight py-3 rounded-lg min-w-[120px] disabled:opacity-50"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
