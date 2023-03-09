import { CheckCircle, Edit } from "@mui/icons-material";
import clsx from "clsx";
import { Form, Formik } from "formik";
import debounce from "lodash.debounce";
import React, { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import rupiahFormater from "../../helpers/rupiahFormater";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import makeRequest from "../../lib/axiosInstance";
import { checkoutSchema } from "../../lib/schema";
import TextInput from "./TextInput";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { products } = useCart();
  const [subTotal, setSubTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [query, setQuery] = useState(null);
  const [userAddress, setUserAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const inputOneRef = useRef(null);
  const [successPayemnt, setSuccessPayemnt] = useState(false);

  useEffect(() => {
    setSubTotal(products.reduce((prev, cur) => prev + cur.price, 0));
  }, [products]);

  const fetchAddress = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await makeRequest.get(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=10`
      );
      setUserAddress(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    if (query) {
      fetchAddress();
    }

    return () => {};
  }, [fetchAddress]);

  const setQueryDebounce = (e) => setQuery(e.target.value);
  const handleOnChange = debounce(setQueryDebounce, 500);

  const handleSelect = async (item) => {
    try {
      setSelectedAddress(item);
      setQuery(null);
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message || "Internal server error"
      );
    }
  };

  const editAddress = () => {
    const value = { ...selectedAddress };
    setSelectedAddress(null);
    inputOneRef.current.value = value.display_name;
    inputOneRef.current.focus();
  };

  const initialValues = {
    recipientName: "",
    phoneNumber: "",
    notes: "",
  };

  const handleSubmit = async (values, { setErrors }) => {
    try {
      const body = {
        data: {
          ...values,
          total: subTotal + deliveryFee,
          address: selectedAddress?.display_name,
        },
      };
      const options = {
        headers: { Authorization: `Bearer ${user.jwt}` },
      };
      await makeRequest.post("/api/orders", body, options);
      setSuccessPayemnt(true);
    } catch (error) {
      console.log(error)
      toast.error(
        error?.response?.data?.error?.message || "Internal server error"
      );
    }
  };

  if (successPayemnt) {
    return <PaymentSucces />;
  }

  return (
    <div className="bg-gray-100 pt-10 min-h-screen">
      <Formik
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, isValid }) => {
          return (
            <Form>
              <div className="grid lg:grid-cols-2 container mx-auto gap-16">
                <div className="">
                  <h1 className="text-lg font-medium text-gray-900 mb-3">
                    Detail Pengiriman
                  </h1>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="col-span-2 relative">
                      <div className="relative">
                        <div className="relative">
                          <input
                            type="text"
                            disabled
                            className="bg-white outline-none border px-4 rounded py-2 w-full text-gray-500"
                            value={selectedAddress?.display_name}
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <CheckCircle
                              className="text-green-500"
                              sx={{ fontSize: 20 }}
                            />
                            <Edit
                              onClick={editAddress}
                              className="text-gray-500 cursor-pointer hover:opacity-50 ml-2"
                              sx={{ fontSize: 20 }}
                            />
                          </div>
                        </div>
                        <input
                          type="text"
                          ref={inputOneRef}
                          onChange={handleOnChange}
                          required
                          className={clsx(
                            "bg-white outline-none border px-4 rounded py-2 w-full top-0 absolute",
                            selectedAddress ? "-z-50" : ""
                          )}
                          placeholder="masukan alamat"
                        />
                      </div>
                      {query && (
                        <div className="absolute top-full left-0 w-full">
                          {isLoading ? (
                            Array.from({ length: 8 }).map((item, index) => (
                              <div
                                key={index}
                                className="border h-12 w-full bg-white p-2"
                              >
                                <div className="bg-gray-200 animate-pulse h-full w-full"></div>
                              </div>
                            ))
                          ) : userAddress.length ? (
                            userAddress.map((item, index) => (
                              <div
                                key={index}
                                onClick={() => handleSelect(item)}
                                className="border border-gray-200 w-full bg-white px-3 py-2 cursor-pointer hover:bg-gray-100 transition-all duration-300"
                              >
                                <p className="">{item?.display_name}</p>
                              </div>
                            ))
                          ) : (
                            <div className="border border-gray-200 w-full bg-white px-3 py-2">
                              <p className="">Alamat tidak tersedia.</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <TextInput
                      label="Nama penerima"
                      className={"col-span-1"}
                      name="recipientName"
                      placeholder="John Doe"
                    />
                    <TextInput
                      label="Nomor HP"
                      className={"col-span-1"}
                      name="phoneNumber"
                      placeholder="081234567898"
                      type="number"
                    />
                    <TextInput
                      label="Catatan"
                      className={"col-span-2"}
                      name="notes"
                      placeholder="opsional"
                      isTextArea
                    />
                  </div>
                </div>
                <div className="">
                  <h1 className="text-lg font-medium text-gray-900 mb-3">
                    Detail Pesanan
                  </h1>
                  <div className="bg-white w-full flex flex-col border text-gray-900">
                    <div className="p-5 w-full h-full overflow-x-auto space-y-5">
                      {products.length &&
                        products.map((item) => {
                          return (
                            <div className="text-gray-900 flex gap-3">
                              <img
                                src={item.img}
                                className="h-20 w-20"
                                alt=""
                              />
                              <div className="justify-between flex w-full">
                                <div className="flex lg:flex-col">
                                  <h1 className="text-lg font-medium w-36 truncate">
                                    {item.title}
                                  </h1>
                                  <p className="text-gray-500 text-sm">
                                    {item.category}
                                  </p>
                                  <p className="mt-auto text-gray-500 text-sm">
                                    Qty 1
                                  </p>
                                </div>
                                <div className="flex lg:flex-col">
                                  <p className="text-lg font-medium">
                                    {rupiahFormater(item.price)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    <div className="mt-auto border-t w-full px-5 pt-5 pb-8">
                      <div className="flex justify-between">
                        <p>SubTotal</p>
                        <p className="text-lg font-medium">
                          {rupiahFormater(subTotal)}
                        </p>
                      </div>
                      <div className="flex justify-between mt-2">
                        <p>Ongkos kirim</p>
                        <p className="text-lg font-medium">
                          {rupiahFormater(deliveryFee)}
                        </p>
                      </div>
                      <div className="flex justify-between mt-3 border-t pt-3">
                        <p className="text-xl">Total</p>
                        <p className="text-xl font-medium">
                          {rupiahFormater(subTotal + deliveryFee)}
                        </p>
                      </div>
                      <button
                        disabled={
                          isLoading ||
                          isSubmitting ||
                          Object.keys(errors).length ||
                          !isValid
                        }
                        type={"submit"}
                        className="bg-gray-900 text-white text-sm h-12 font-medium w-full rounded mt-5 disabled:opacity-30"
                      >
                        {isLoading ? "loading..." : "Pilih Pembayaran"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
