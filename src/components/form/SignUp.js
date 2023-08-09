import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { reqister } from "../helper/userRequest";
import { toast } from "react-toastify";
import { useAuthStore } from "./../../store/store";
import "./style.css";
function SignUp() {
  const history = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    date: "",
    password: "",
    passwordConfirm: "",
  });
  const handleInputChange = (event) => {
    setInputs((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Submit the form data to the server
    // using an HTTP request

    // Trim
    let fullname = inputs.name;
    let email = inputs.email;
    let date = inputs.date;
    let passwordConfirm = inputs.passwordConfirm;
    let password = inputs.password;
    // Trim
    /* eslint-disable no-useless-escape */
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    // Regular expressions for validation
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    //date
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    let valid = true;
    if (!email) {
      errorHandle("Please input email");
      valid = false;
    } else if (!fullname) {
      errorHandle("Please input fullname");
      valid = false;
    } else if (!date) {
      console.log(date);
      errorHandle("Enter your date of bath");
      valid = false;
    } else if (!password) {
      errorHandle("Enter your password");
      valid = false;
    } else if (password !== passwordConfirm) {
      errorHandle("The password is not the same with the Confirm-Password");
      valid = false;
    }

    if (!dateRegex.test(date)) {
      errorHandle("What you entered is not a date");
    } else if (!/^[a-zA-Z ]*$/.test(fullname)) {
      errorHandle("Invalid fullname entered");
      valid = false;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      errorHandle("Invalid email entered");
      valid = false;
    } else if (password.length < 8) {
      errorHandle("Password is too short!");
      valid = false;
    } else if (
      !specialChars.test(password) ||
      !lowercaseRegex.test(password) ||
      !uppercaseRegex.test(password)
    ) {
      errorHandle("Password must have special character, Lowercase, Uppercase");
      valid = false;
    }

    if (valid) {
      //console.log(inputs);
      let ans = await reqister(inputs);
      let Status = String(ans?.status);
      console.log(Status);
      if (Status === "200") {
        setUser(ans.data);
        history("/verification");
      }
      // clear the data stored in a FormData
    }
  };
  const errorHandle = (err) => {
    toast.error(err, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <form onSubmit={handleFormSubmit} className="sign-up-form">
      <h2 className="title">Sign up</h2>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input
          placeholder="Username"
          onChange={handleInputChange}
          value={inputs.name}
          type="text"
          name="name"
          required
        />
      </div>
      <div className="input-field">
        <i className="fas fa-envelope"></i>
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
        <i class="fas fa-calendar"></i>
        <input
          onChange={handleInputChange}
          value={inputs.date}
          type="date"
          class="date"
          name="date"
          required
        />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          onChange={handleInputChange}
          value={inputs.password}
          type="password"
          class="password"
          name="password"
          placeholder="Enter your password"
          required
        />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          onChange={handleInputChange}
          value={inputs.passwordConfirm}
          type="password"
          class="password"
          name="passwordConfirm"
          placeholder="Confirm your password"
          required
        />
      </div>

      <input type="submit" className="btn" value="Sign up" />
      <p className="social-text">Or Sign up with social platforms</p>
      <div className="social-media">
        <a href="https://au.indeed.com/" className="social-icon">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://au.indeed.com/" className="social-icon">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://au.indeed.com/" className="social-icon">
          <i className="fab fa-google"></i>
        </a>
        <a href="https://au.indeed.com/" className="social-icon">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>
    </form>
  );
}

export default SignUp;
