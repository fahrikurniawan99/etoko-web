import toast from "react-hot-toast";
import makeRequest from "../../lib/axiosInstance";

export const signupHandler = async ({ values, setSubmitting }) => {
  try {
    toast.loading("send data");
    const data = { ...values };
    await makeRequest.post("/api/auth/local/register", data);

    toast.dismiss();
    toast.success("akun created", { duration: 1000 });
    setTimeout(() => {
      toast.loading("redirecting", { duration: 1000 });
    }, 1000);

    setTimeout(() => {
      setSubmitting(false);
      window.location.href = "/signin";
    }, 2000);
  } catch (error) {
    toast.dismiss();
    setSubmitting(false);
    toast.error(error.response.data.error.message || "Internal server error");
  }
};
