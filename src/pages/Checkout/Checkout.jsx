import { Listbox } from "@headlessui/react";
import { CheckCircle } from "@mui/icons-material";
import axios from "axios";
import clsx from "clsx";
import { Form, Formik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import PaymentSucces from "../../components/PaymentSucces";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import makeRequest from "../../lib/axiosInstance";
import { checkoutSchema } from "../../lib/schema";
import { clearCart } from "../../redux/cart/cartSlice";
import rupiahFormater from "../../utils/rupiahFormater";
import TextInput from "./TextInput";

function Province({ province, nextHandler }) {
  const [selectedProvince, setSelectedProvince] = useState(null);

  return (
    province && (
      <div className="col-span-2 z-50">
        <div className="relative">
          <Listbox value={selectedProvince} onChange={setSelectedProvince}>
            <Listbox.Button className="bg-white w-full text-left px-4 py-2 border flex justify-between items-center">
              {selectedProvince ? selectedProvince.province : "Pilih provinsi"}
            </Listbox.Button>
            <Listbox.Options className="absolute top-full border border-t-0 bg-white w-full h-[300px] overflow-y-auto">
              {province.map((item, index) => {
                return (
                  <Listbox.Option
                    key={item.province_id}
                    value={item}
                    className={({ active }) =>
                      clsx(
                        "py-2 cursor-pointer relative px-4",
                        index === 0 ? " border-t-0" : " border-t"
                      )
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span>{item.province}</span>
                        {selected && (
                          <CheckCircle
                            sx={{ fontSize: 16 }}
                            className="absolute top-1/2 -translate-y-1/2 right-4 text-green-500"
                          />
                        )}
                      </>
                    )}
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </Listbox>
        </div>
        <div className="text-right">
          <button
            type="button"
            disabled={!selectedProvince}
            onClick={() => nextHandler(selectedProvince)}
            className="bg-gray-900 min-w-[80px] text-white rounded w-fit px-5 h-11 mt-3 disabled:cursor-not-allowed text-sm font-medium tracking-tight"
          >
            Konfirmasi
          </button>
        </div>
      </div>
    )
  );
}
function City({ city, nextHandler }) {
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    city && (
      <div className="col-span-2 z-50">
        <div className="relative">
          <Listbox value={selectedCity} onChange={setSelectedCity}>
            <Listbox.Button className="bg-white w-full text-left px-4 py-2 border flex justify-between items-center">
              {selectedCity ? selectedCity.city_name : "Pilih kota"}
            </Listbox.Button>
            <Listbox.Options className="absolute top-full border border-t-0 bg-white w-full h-[300px] overflow-y-auto">
              {city.map((item, index) => {
                return (
                  <Listbox.Option
                    key={item.city_id}
                    value={item}
                    className={({ active }) =>
                      clsx(
                        "py-2 cursor-pointer relative px-4",
                        index === 0 ? " border-t-0" : " border-t"
                      )
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span>{item.city_name}</span>
                        {selected && (
                          <CheckCircle
                            sx={{ fontSize: 16 }}
                            className="absolute top-1/2 -translate-y-1/2 right-4 text-green-500"
                          />
                        )}
                      </>
                    )}
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </Listbox>
        </div>
        <div className="text-right">
          <button
            type="button"
            disabled={!selectedCity}
            onClick={() => nextHandler(selectedCity)}
            className="bg-gray-900 min-w-[80px] text-white rounded w-fit px-5 h-11 mt-3 disabled:cursor-not-allowed text-sm font-medium tracking-tight"
          >
            Konfirmasi
          </button>
        </div>
      </div>
    )
  );
}

export default function CheckoutPage() {
  const { user } = useAuth();
  const { products } = useCart();
  const [subTotal, setSubTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [deliveryCost, setDeliveryCost] = useState({ fee: 0 });
  const [successPayment, setSuccessPayment] = useState(false);
  const [province, setProvince] = useState(null);
  const [city, setCity] = useState(null);
  const [provinceValue, setProvinceValue] = useState(null);
  const [cityValue, setCityValue] = useState(null);
  const dispatch = useDispatch();

  const getProvince = useCallback(async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/province`
    );
    setProvince(response.data.rajaongkir.results);
  }, []);

  const getCity = async (provinceId) => {
    const response = await axios(
      `${import.meta.env.VITE_API_URL}/city?province=` + provinceId
    );
    setCity(response.data.rajaongkir.results);
    toast.dismiss();
  };

  const getCost = async (cityId) => {
    const body = {
      origin: "352",
      destination: cityId,
      weight: 1700,
      courier: "jne",
    };
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/cost`,
      body
    );
    const cost = {
      fee: response.data.rajaongkir.results[0].costs[0].cost[0].value,
      origin: response.data.rajaongkir["origin_details"].city_name,
      destination: response.data.rajaongkir["destination_details"].city_name,
      service: "jne",
    };
    setDeliveryCost(cost);
    toast.dismiss();
    toast.success(`Ongkos kirim di tetapkan`, { duration: 4000 });
  };

  useEffect(() => {
    getProvince();
  }, [getProvince]);

  useEffect(() => {
    setSubTotal(products.reduce((prev, cur) => prev + cur.price, 0));
  }, [products]);

  const initialValues = {
    recipientName: "",
    phoneNumber: "",
    notes: "",
    province: "",
    city: "",
  };

  const handleSubmit = async (values, { setErrors, ...props }) => {
    try {
      setIsLoading(true);
      toast.loading("mengirim data...");
      const body = {
        data: {
          ...values,
          total: subTotal + deliveryCost.fee,
          address: deliveryCost.destination,
        },
      };
      const options = {
        headers: { Authorization: `Bearer ${user.jwt}` },
      };
      await makeRequest.post("/api/orders", body, options);
      setIsLoading(false);
      dispatch(clearCart());
      setSuccessPayment(true);
      toast.dismiss();
    } catch (error) {
      setIsLoading(false);
      toast.dismiss();
      console.log(error);
      toast.error(
        error?.response?.data?.error?.message || "Internal server error"
      );
    }
  };

  if (successPayment) {
    return <PaymentSucces />;
  }

  return (
    <div className="bg-gray-100 pt-10 min-h-screen">
      <Formik
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, setValues, values }) => {
          return (
            <Form>
              <div className="grid lg:grid-cols-2 container mx-auto gap-16">
                <div className="">
                  <h1 className="text-lg font-medium text-gray-900 mb-3">
                    Detail Pengiriman
                  </h1>
                  <div className="grid grid-cols-2 gap-5">
                    {!provinceValue ? (
                      <Province
                        province={province}
                        nextHandler={(value) => {
                          toast.success(`${value.province} berhasil di pilih`, {
                            duration: 1000,
                          });
                          setValues({ province: value.province });
                          setProvinceValue(value.province_id);
                          setTimeout(() => {
                            toast.loading(`mengambil data kota...`);
                            getCity(value.province_id);
                          }, 1000);
                        }}
                      />
                    ) : (
                      <TextInput
                        className="col-span-2"
                        name="province"
                        disabled={true}
                        icon={
                          <CheckCircle
                            sx={{ fontSize: 16 }}
                            className="text-green-500 top-1/2 -translate-y-1/2 right-4 absolute"
                          />
                        }
                      />
                    )}
                    {/* {values.province ? ( */}
                    {!cityValue ? (
                      <City
                        city={city}
                        nextHandler={(value) => {
                          toast.success(
                            `${value.city_name} berhasil di pilih`,
                            { duration: 1000 }
                          );
                          setValues({ ...values, city: value.city_name });
                          setCityValue(value.city_id);
                          setTimeout(() => {
                            toast.loading("menghitung ongkos kirim...");
                            getCost(value.city_id);
                          }, 1000);
                        }}
                      />
                    ) : (
                      <TextInput
                        className="col-span-2"
                        name="city"
                        disabled={true}
                        icon={
                          <CheckCircle
                            sx={{ fontSize: 16 }}
                            className="text-green-500 top-1/2 -translate-y-1/2 right-4 absolute"
                          />
                        }
                      />
                    )}
                    {/* ) : null} */}
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
                        <div className="text-right">
                          <p className="text-lg font-medium">
                            {rupiahFormater(deliveryCost.fee)}
                          </p>
                          {deliveryCost.fee ? (
                            <span className="text-gray-700 font-medium">
                              {deliveryCost.destination}
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <div className="flex justify-between mt-3 border-t pt-3">
                        <p className="text-xl">Total</p>
                        <p className="text-xl font-medium">
                          {rupiahFormater(subTotal + deliveryCost.fee)}
                        </p>
                      </div>
                      <button
                        disabled={
                          isLoading ||
                          isSubmitting ||
                          Object.keys(errors).length
                        }
                        type={"submit"}
                        className="bg-gray-900 text-white text-sm h-12 font-medium w-full rounded mt-5 disabled:opacity-30"
                      >
                        Pilih Pembayaran
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
