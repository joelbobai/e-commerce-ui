import React, { useState, useEffect } from "react";
import Email from "./Email.ico";
import { Link } from "react-router-dom";
import { newOTP } from "../helper/userEmailverificztion";
import { useAuthStore } from "../../store/store";
import { toast } from "react-toastify";
import "./verification.css";
function Verification() {
  const [counter, setCounter] = useState(25);
  const [isRunning, setIsRunning] = useState(true);
  let user = useAuthStore((state) => {
    return state.auth.user;
  });
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setCounter(26);
    setIsRunning((isRunning) => !isRunning);
    // using an HTTP request
    let ans = await newOTP(user.email);
    let Status = String(ans.status);
    console.log(Status);
    if (Status === "200") {
      toast.success("Mail Sent", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    let intervalId = null;

    if (isRunning) {
      document.getElementById("resend").style.display = "none";
      document.getElementById("diV").style.display = "block";
      intervalId = setInterval(() => {
        setCounter((prevCounter) => {
          const newCounter = prevCounter - 1;

          if (newCounter === 0) {
            setIsRunning(false);
            document.getElementById("resend").style.display = "block";
            document.getElementById("diV").style.display = "none";
          }

          return newCounter;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  return (
    <div className="containerV">
      <div className="verify">
        <center>
          <img width="200" src={Email} alt="email_icon" />
          <center>
            <h2>Account Verification</h2>
            <p className="please">
              Please verify your account using the link sent to your 👇🏽
            </p>
            <b>{user?.email}</b>
            <br />

            <Link to="/" className="buttonV button2V" id="">
              Procced {/* Procced <img width="19" src="images/next.ico" /> */}
            </Link>

            <form onSubmit={handleFormSubmit}>
              <p className="dont">
                Didn't receive the gmail?
                <button type="submit" className="pass" id="resend">
                  resend
                </button>
              </p>
            </form>
            <div id="diV">
              In <b id="number">{counter}</b> second(s)
            </div>
          </center>
        </center>
      </div>
    </div>
  );
}

export default Verification;
