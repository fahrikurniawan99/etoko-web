import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { login, setError, solveError } from "../../redux/auth/authSlice";

export default function SignIn() {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const { isLoading, isError, user, errorMessage } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (Object.keys(form).length < 2) {
      dispatch(setError("Data belum valid."));
    } else {
      dispatch(solveError());
    }

    return () => {};
  }, [form]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    Object.values(form).forEach((value) => {
      if (value === "") {
        return dispatch(setError("Data belum valid."));
      }
    });
    dispatch(solveError());
    await dispatch(login(form));
  };

  return (
    <div className="text-gray-900">
      <h1 className="font-medium text-2xl">Welcome back!</h1>
      <p className="text-gray-500 text-sm">
        Welcome back! Please enter your details.
      </p>
      <div className="my-8">
        <form>
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block tracking-tight text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleChange}
              value={form.email ?? ""}
              className="border outline-none border-gray-300 w-full py-2 px-3 rounded-md placeholder:tracking-tight"
              placeholder="Email"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block tracking-tight text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={form.password ?? ""}
              className="border outline-none border-gray-300 w-full py-2 px-3 rounded-md placeholder:tracking-tight"
              placeholder="Password"
            />
          </div>
        </form>
        <button
          type="button"
          onClick={handelSubmit}
          disabled={isLoading || isError}
          className="w-full bg-gray-900 text-white text-sm py-3 rounded-md mt-4 duration-300 transition-all hover:opacity-80 disabled:opacity-60"
        >
          Sign In
        </button>
        <p className="text-sm text-gray-500 text-center mt-4">
          Not have an account ?
          <Link
            to={"/signup"}
            className="text-gray-900 font-medium ml-1 hover:opacity-80 transition-all duration-300"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
