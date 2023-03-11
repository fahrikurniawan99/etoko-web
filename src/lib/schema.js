import * as yup from "yup";

export const checkoutSchema = yup.object({
  recipientName: yup
    .string()
    .required("required")
    .min(3, "recipient name must be minimum 3 character")
    .max(15, "recipient name must be maksimum 8 character"),
  phoneNumber: yup
    .string()
    .required("required")
    .min(10, "password must be minimum 10 character")
    .max(13, "phone number must be maksimum 13 character"),
  province: yup.string().required(),
  city: yup.string().required(),
});

export const signinSchema = yup.object({
  email: yup.string().email().required("required"),
  password: yup
    .string()
    .required("required")
    .min(8, "password must be minimum 8 character"),
});
export const signupSchema = yup.object({
  username: yup
    .string()
    .required("required")
    .min(3, "password must be minimum 3 character"),
  email: yup.string().email().required("required"),
  password: yup
    .string()
    .required("required")
    .min(8, "password must be minimum 8 character"),
  passwordConfirm: yup
    .string()
    .required("required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
