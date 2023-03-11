import React from "react";
import { Link } from "react-router-dom";
import Signup from "./Signup";

export default function SignUpPage() {
  return (
    <div className="flex h-screen justify-center items-center w-full">
      <div className="max-w-[300px] w-full px-2 lg:px-0">
        <div className="text-center mb-5">
          <Link
            to={"/"}
            className="italic font-bold text-gray-800 text-2xl"
            style={{ letterSpacing: -1.4 }}
          >
            E-Toko
          </Link>
          <p className="tracking-tight text-gray-500 text-sm">
            Create to your account
          </p>
        </div>
        <Signup />
      </div>
    </div>
  );
}
