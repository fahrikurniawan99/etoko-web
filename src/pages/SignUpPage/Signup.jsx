import { Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import InputGroup from "../../components/Form/InputGroup";
import { signupSchema } from "../../lib/schema";
import { signupHandler } from "./service";

export default function Signup() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    delete values.passwordConfirm;
    const signupParam = {
      values,
      setSubmitting: (isSubmitting) => setSubmitting(isSubmitting),
    };
    signupHandler(signupParam);
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={signupSchema}
      >
        {({ isSubmitting, isValid }) => {
          return (
            <Form>
              <InputGroup
                label={"Username"}
                placeholder="john123"
                name="username"
              />
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
              <InputGroup
                label={"Password confirmation"}
                placeholder="password"
                name="passwordConfirm"
                type="password"
              />
              <Button
                disabled={isSubmitting || !isValid}
                type={"submit"}
                text={"Sign Up"}
                className="w-full text-sm mt-5 disabled:opacity-30"
              />
            </Form>
          );
        }}
      </Formik>
      <Link
        to={"/signin"}
        className="text-gray-500 text-xs underline mt-3 inline-block"
      >
        Signin here!
      </Link>
    </div>
  );
}
