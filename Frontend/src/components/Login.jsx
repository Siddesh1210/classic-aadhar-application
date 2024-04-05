import React from "react";
import "../assets/css/UserInputForm.css";

const Login = () => {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center my-3">
        <div className="col-md-5 d-flex justify-content-center">
          <form className="form">
            <h5 className="text-center fw-bold welcome-text fs-4">
              Welcome Back
            </h5>
            <div className="flex-column">
              <label>Email </label>
            </div>
            <div className="inputForm">
              <input
                type="email"
                className="input"
                placeholder="Enter your Email"
              />
            </div>

            <div className="flex-column">
              <label>Password </label>
            </div>
            <div className="inputForm">
              <input
                type="password"
                className="input"
                placeholder="Enter your password"
              />
            </div>

            <button className="button-submit">Log in</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
