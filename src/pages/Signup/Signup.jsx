import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import makeRequest from "../../lib/axiosInstance";

export default function SignUp() {
  const [form, setForm] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (
      Object.keys(form).length < 4 ||
      form?.password !== form?.confirmPassword
    ) {
      setIsError(true);
    } else {
      setIsError(false);
    }

    return () => {};
  }, [form]);

  const signUp = async () => {
    try {
      const { confirmPassword, ...data } = form;
      const res = await makeRequest.post("/api/auth/local/register", data);

      alert("Sign Up successfull.");

      setIsError(false);
      setIsLoading(false);
      setForm({});

      navigate("/signin");
    } catch (error) {
      setIsError(true);
      console.log(error);
      setIsLoading(false);
    }
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (form?.password !== form?.confirmPassword) {
      return setIsError(true);
    }
    Object.values(form).forEach((value) => {
      if (value === "") {
        return setIsError(true);
      }
    });

    signUp();
  };

  return (
    <div className="text-gray-900">
      <h1 className="font-medium text-2xl">Welcome to us</h1>
      <p className="text-gray-500 text-sm">Welcome to us! Let's joining.</p>
      <div className="my-8">
        <form>
          <div className="mt-4">
            <label
              htmlFor="username"
              className="block tracking-tight text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              required
              type="text"
              id="username"
              onChange={handleChange}
              value={form.username ?? ""}
              name="username"
              className="border outline-none border-gray-300 w-full py-2 px-3 rounded-md placeholder:tracking-tight"
              placeholder="Username"
            />
          </div>
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
          <div className="mt-4">
            <label
              htmlFor="confirmPassword"
              className="block tracking-tight text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleChange}
              value={form.confirmPassword ?? ""}
              className="border outline-none border-gray-300 w-full py-2 px-3 rounded-md placeholder:tracking-tight"
              placeholder="Confirm password"
            />
          </div>
        </form>
        <button
          type="button"
          onClick={handelSubmit}
          disabled={isLoading || isError}
          className="w-full bg-gray-900 text-white text-sm py-3 rounded-md mt-4 duration-300 transition-all hover:opacity-80 disabled:opacity-60"
        >
          Sign Up
        </button>
        <p className="text-sm text-gray-500 text-center mt-4">
          Already an account ?
          <Link
            to={"/signin"}
            className="text-gray-900 font-medium ml-1 hover:opacity-80 transition-all duration-300"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
