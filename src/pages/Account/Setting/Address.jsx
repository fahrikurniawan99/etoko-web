import React from "react";
import ReactDOM from "react-dom";
import NewAddress from "../../../components/NewAddress";
import useAuth from "../../../hooks/useAuth";

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
          className="bg-gray-900 text-white font-semibold w-52 py-3 rounded-md text-sm ml-auto"
        >
          Tambah Alamat
        </button>
      </div>
    </div>
  );
}
