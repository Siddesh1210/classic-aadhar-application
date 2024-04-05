import React from "react";
import "../assets/css/UserInputForm.css";

const UserInputForm = () => {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center my-3">
        <div className="col-md-5 d-flex justify-content-center">
          <form className="form">
            <h5 className="text-center fw-bold welcome-text fs-4">
              Welcome to Classic Aadhar Application
            </h5>
            <div className="flex-column">
              <label>Name</label>
            </div>
            <div className="inputForm">
              <input
                type="text"
                className="input"
                placeholder="Enter your Name"
              />
            </div>
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
              <label>Address </label>
            </div>
            <div className="inputForm">
              <input
                type="text"
                className="input"
                placeholder="Enter your Address"
              />
            </div>

            <div className="flex-column">
              <label>Aadhar Card </label>
            </div>
            <div className="inputForm">
              <input
                type="number"
                className="input"
                placeholder="Enter your Aadhar Number"
              />
            </div>

            <div className="flex-column">
              <label>Date of Birth </label>
            </div>
            <div className="inputForm">
              <input
                type="date"
                className="input"
                //   placeholder="Enter your Email"
              />
            </div>

            <button className="button-submit">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserInputForm;
