import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import InputGroup from "../../components/Form/InputGroup";
import { signinSchema } from "../../lib/schema";
import { login } from "../../redux/auth/authSlice";

export default function Signin() {
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    const loginParam = {
      ...values,
      setSubmitting: (isSubmitting) => setSubmitting(isSubmitting),
    };
    dispatch(login(loginParam));
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={signinSchema}
      >
        {({ isSubmitting, isValid }) => {
          return (
            <Form>
              <InputGroup
                label={"Email"}
                placeholder="example@gmail.com"
                name="email"
              />
              <InputGroup
                label={"Password"}
                placeholder="password"
                name="password"
                type="password"
              />
              <Button
                disabled={isSubmitting || !isValid}
                type={"submit"}
                text={"Sign In"}
                className="w-full text-sm mt-5 disabled:opacity-30"
              />
            </Form>
          );
        }}
      </Formik>
      <Link
        to={"/signup"}
        className="text-gray-500 text-xs underline mt-3 inline-block"
      >
        Signup here!
      </Link>
    </div>
  );
}
