import axios from "axios";
import { toast } from "react-toastify";
import { url } from "./userRequest";
// request new verification otp
export async function newOTP(email) {
  toast.info("Please wait...", {
    position: "top-left",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  const res = await axios
    .post(`${url()}/api/v1/email_verification`, {
      email: email,
    })
    .catch((err) => {
      toast.error(err.response.data, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(err.response.data);
    });

  if (res) {
    const data = await res;
    return data;
  }
}
