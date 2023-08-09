import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { login } from "../helper/userRequest";
//import { toast } from "react-toastify";
import { useAuthStore } from "./../../store/store";
import "./style.css";
function SignIn() {
  let isLoggedIn = useAuthStore((state) => {
    return state.auth.isLoggedIn;
  });

  const setAuthToken = useAuthStore((state) => state.setAuthToken);
  // const notify = () => toast.error("Wow so easy!");
  const history = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleInputChange = (event) => {
    setInputs((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // using an HTTP request
    let ans = await login(inputs);
    // console.log();
    let Status = String(ans?.status);
    //console.log(Status);
    console.log(Status);
    if (Status === "200") {
      setAuthToken(ans.data.user.token);
      history("/");
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/app" />;
  } else {
    return (
      <form onSubmit={handleFormSubmit} className="sign-in-form">
        <h2 className="title">Sign in</h2>
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input
            onChange={handleInputChange}
            value={inputs.email}
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="input-field">
          <i className="fas fa-lock"></i>
          <input
            onChange={handleInputChange}
            value={inputs.password}
            type="password"
            name="password"
            class="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <input type="submit" value="Login" className="btn solid" />
        <p className="social-text">Or Sign in with social platforms</p>
        <div className="social-media">
          <a
            href="https://www.jobberman.com/jobs?q=website-developer-joomla"
            className="social-icon"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://www.jobberman.com/jobs?q=website-developer-joomla"
            className="social-icon"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://www.jobberman.com/jobs?q=website-developer-joomla"
            className="social-icon"
          >
            <i className="fab fa-google"></i>
          </a>
          <a
            href="https://www.jobberman.com/jobs?q=website-developer-joomla"
            className="social-icon"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </form>
    );
  }
}

export default SignIn;
