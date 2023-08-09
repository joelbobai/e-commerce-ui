import React, { useState, useEffect } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import log from "./img/log.svg";
import reg from "./img/register.svg";
import { useAuthStore } from "./../../store/store";
import { url } from "../helper/userRequest";
import "./style.css";
import axios from "axios";
axios.defaults.withCredentials = true;

function Form() {
  let authToken = useAuthStore((state) => {
    return state.auth.authToken;
  });
  axios.defaults.headers.post["Authorization"] = `Bearer ${authToken}`;
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  // User Login
  // const [login, setLogin] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  let isLoggedIn = useAuthStore((state) => {
    return state.auth.isLoggedIn;
  });
  // User Login

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };
  console.log(isLoggedIn);

  // downwards is to keep the user LOGIN
  useEffect(() => {
    const sendRequest = async () => {
      const res = await axios
        .get(
          `${url()}/api/v1/user/private_data`
          // , {
          //   headers: {
          //     Authorization: `Bearer ${authToken}`,
          //   },
          //  withCredentials: true,
          // }
        )
        .catch((err) => {
          setIsLoggedIn(false);
          // console.log(err, err.response.data);
        });

      if (res) {
        const data = await res.data;
        // console.log(data);
        return data;
      }
    };

    sendRequest().then((data) => {
      try {
        setIsLoggedIn(true);
        setUser(data.user);
      } catch (error) {
        setIsLoggedIn(false);
      }
    });
  }, [setIsLoggedIn, setUser]);

  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {!isSignUpMode ? <SignIn /> : <SignUp />}
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button
              onClick={handleSignUpClick}
              className="btn transparent"
              id="sign-up-btn"
            >
              Sign up
            </button>
          </div>
          <img src={log} className="image" alt="loginIcon" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button
              onClick={handleSignInClick}
              className="btn transparent"
              id="sign-in-btn"
            >
              Sign in
            </button>
          </div>
          <img src={reg} className="image" alt="regIcon" />
        </div>
      </div>
    </div>
  );
}

export default Form;
