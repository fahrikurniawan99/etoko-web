import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { Close, LocationOnOutlined } from "@mui/icons-material";
import NewAddressTwo from "./NewAddressTwo";

export default function NewAddress({ user }) {
  const [address, setAddress] = useState(null);
  const [query, setQuery] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [tab, setTab] = useState(1);

  const fetchData = useCallback(async () => {
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=10`;
      if (query !== null || "") {
        const res = await axios.get(url);
        setAddress(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [query]);

  useEffect(() => {
    fetchData();

    return () => {};
  }, [fetchData]);

  const updateQuery = (e) => {
    setQuery(e?.target?.value);
  };

  const debounceOnChange = debounce(updateQuery, 500);
  const handleSelectAddress = (item) => {
    setSelectedAddress(item);
    setTab(2);
  };
  const closeHandler = () => {
    document.body.lastChild.remove();
  };

  return tab < 2 ? (
    <div className="w-full h-screen absolute top-0 left-0 bg-black/50 flex">
      <div className="bg-white lg:w-[600px] min-h-screen w-full lg:h-auto m-auto lg:rounded-lg py-5 px-2 lg:px-10">
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
        <input
          required
          type="text"
          id="address"
          name="address"
          onChange={debounceOnChange}
          className="border outline-none border-gray-300 w-full py-2 px-3 rounded-md placeholder:tracking-tight mt-5"
          placeholder="Tuliskan desa atau kota"
        />
        <div className="border-x">
          {address &&
            address?.map((item, index) => {
              return (
                <button
                  className="py-4 w-full px-5 text-left border-b flex hover:opacity-70 transition-all duration-300"
                  key={index}
                  onClick={() => handleSelectAddress(item)}
                >
                  <LocationOnOutlined className="text-gray-500 mr-3" />{" "}
                  {item.display_name}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  ) : (
    <NewAddressTwo item={selectedAddress} user={user} back={() => setTab(1)} />
  );
}
