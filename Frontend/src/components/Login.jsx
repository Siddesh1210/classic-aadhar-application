import React, { useState } from "react";
import "../assets/css/UserInputForm.css";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: null,
    password: null,
  });

  const [displayText, setDisplayText] = useState(null);
  const [displayTopError, setDisplayTopError] = useState(null);

  async function loginHandler(e) {
    e.preventDefault();
    const errors = {};
    //Validating both input at frontend
    if (!userData.email.trim()) {
      errors.email = "Please enter your email";
      setError({ ...errors, email: errors.email });
    } else if (!validateEmail(userData.email)) {
      errors.email = "Please enter a valid email address";
      setError({ ...errors, email: errors.email });
    }

    if (!userData.password.trim()) {
      errors.password = "Please enter your password";
      setError({ ...errors, password: errors.password });
    } else if (userData.password.length < 3) {
      errors.password = "Password must be at least 3 characters long";
      setError({ ...errors, password: errors.password });
    }

    // if No errors and error object is empty, proceed with login logic
    if (Object.keys(errors).length === 0) {
      const response = await fetch("http://localhost:8000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const result = await response.json();
      setDisplayText(result.message);
    //   alert(result.message);
      if (result.isOk) setDisplayTopError(true);
      else setDisplayTopError(false);
    //   console.log(result);
    }
  }

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center my-3">
        <div className="col-md-5 d-flex justify-content-center">
          <form className="form">
            <h5 className="text-center fw-bold welcome-text fs-4">
              Welcome Back
            </h5>
            <p className={`text-center fs-5 ${displayTopError?`text-success`:`text-danger`}`}>
              {displayText}
            </p>
            <div className="flex-column">
              <label>Email </label>
            </div>
            <div className="inputForm">
              <input
                type="email"
                className="input"
                placeholder="Enter your Email"
                value={userData.email}
                onChange={(e) => {
                  setUserData({ ...userData, email: e.target.value });
                  setError({ ...error, email: null });
                  setDisplayText(null);
                  setDisplayTopError(null);
                }}
              />
            </div>
            {error.email != null ? (
              <p className="text-danger">{error.email}</p>
            ) : null}

            <div className="flex-column">
              <label>Password </label>
            </div>
            <div className="inputForm">
              <input
                type="password"
                className="input"
                placeholder="Enter your password"
                value={userData.password}
                onChange={(e) => {
                  setUserData({ ...userData, password: e.target.value });
                  setError({ ...error, password: null });
                  setDisplayText(null);
                  setDisplayTopError(null);
                }}
              />
            </div>
            {error.password != null ? (
              <p className="text-danger">{error.password}</p>
            ) : null}

            <button className="button-submit" onClick={loginHandler}>
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
