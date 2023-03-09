import * as yup from "yup";

export const checkoutSchema = yup.object({
  recipientName: yup
    .string()
    .required("kolom harus di isi")
    .min(3, "minimal karakter 3")
    .max(15, "maksimal karakter 15"),
  phoneNumber: yup
    .string()
    .required("kolom harus di isi")
    .min(10, "minimal karakter 10")
    .max(13, "maksimal karakter 13"),
});
