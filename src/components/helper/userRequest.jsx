// import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
axios.defaults.withCredentials = true;
// const isLoading = useAuthStore((state) => state.isLoading);
// const setIsLoading = useAuthStore((state) => state.setIsLoading);
// setIsLoading(true);
// console.log(isLoading);
// if (isLoading) {
//   toast.loading("Please wait...");
// }
// let State = true;
export function url() {
  return "https://e-commerce-backend-46rw.onrender.com";
}
export async function reqister(inputs) {
  // toast.loading("Please wait...");
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
    .post(`${url()}/api/v1/user/signup`, inputs)
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
export async function login(inputs) {
 
  const res = await axios.post(`${url()}/api/v1/user`, inputs).catch((err) => {
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
// request new verification otp
// export async function newOTP(email) {
//   const res = await axios
//     .post("http://localhost:3001/api/v1/email_verification", {
//       email: email,
//     })
//     .catch((err) => {
//       toast.error(err.response.data, {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//       console.log(err.response.data);
//     });

//   if (res) {
//     const data = await res;
//     return data;
//   }
// }
