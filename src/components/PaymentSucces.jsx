import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function PaymentSucces() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <img
          src="/delivery-bike.png"
          alt="delivery-bike"
          className="w-[300px]"
        />
        <h1 className="text-4xl font-bold tracking-tight">Order Complete</h1>
        <Button
          text={"view your order history"}
          className={"mt-5"}
          onClick={() => navigate("/orders")}
        />
      </div>
    </div>
  );
}
