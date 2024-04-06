import React, { useState } from "react";
import "../assets/css/UserInputForm.css";

const UserForm = ({ openForm }) => {
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    address: null,
    dob: null,
    aadharCard: null,
  });
  const [userError, setUserError] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    address: "",
    dob: "",
    aadharCard: "",
  });
  async function submitHandler(e) {
    e.preventDefault();

    // Validation of form using regular expression
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const aadharRegex = /^\d{12}$/;

    if (!userData.name.trim() || userData.name.length < 3) {
      errors.name = "Name must be at least 3 characters long";
      setErrors({...errors, name: errors.name });
    }
    if (!userData.email.trim() || !emailRegex.test(userData.email)) {
      errors.email = "Enter a valid email address";
      setErrors({...errors, email: errors.email });
    }
    if (!userData.address.trim() || userData.address.length < 3) {
      errors.address = "Address must be at least 3 characters long";
      setErrors({...errors, address: errors.address });
    }
    if (!userData.aadharCard.trim() || !aadharRegex.test(userData.aadharCard)) {
      errors.aadharCard = "Aadhar Card must be exactly 12 digits long";
      setErrors({...errors, aadharCard: errors.aadharCard });
    }
    if (!userData.dob.trim()) {
      errors.dob = "Date of Birth is required";
      setErrors({...errors, dob: errors.dob });
    }

    if (Object.keys(errors).length === 0) {
      const response = await fetch("http://localhost:8000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const result = await response.json();
      console.log(result);
      if (result.isOk) {
        openForm(true);
      } else {
        setUserError(result.message);
      }
    } else {
      setErrors(errors);
    }
  }
  return (
    <form className="form">
      <h5 className="text-center fw-bold welcome-text fs-4">
        Welcome to Classic Aadhar Application
      </h5>
      {userError != null ? (
        <p className="text-center fs-5 text-danger">{userError}</p>
      ) : null}
      <div className="flex-column">
        <label>Name</label>
      </div>
      <div className="inputForm">
        <input
          type="text"
          className="input"
          placeholder="Enter your Name"
          value={userData.name}
          onChange={(e) => {
            setUserData({ ...userData, name: e.target.value });
            setErrors({ ...errors, name: null});
            setUserError(null);
          }}
        />
      </div>
      {errors.name && <div className="error text-danger">{errors.name}</div>}
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
            setErrors({ ...errors, email: null});
            setUserError(null);
          }}
        />
      </div>
      {errors.email && <div className="error text-danger">{errors.email}</div>}

      <div className="flex-column">
        <label>Address </label>
      </div>
      <div className="inputForm">
        <input
          type="text"
          className="input"
          placeholder="Enter your Address"
          value={userData.address}
          onChange={(e) => {
            setUserData({ ...userData, address: e.target.value });
            setErrors({ ...errors, address: null});
            setUserError(null);
          }}
        />
      </div>
      {errors.address && (
        <div className="error text-danger">{errors.address}</div>
      )}

      <div className="flex-column">
        <label>Aadhar Card </label>
      </div>
      <div className="inputForm">
        <input
          type="number"
          className="input"
          placeholder="Enter your Aadhar Number"
          value={userData.aadharCard}
          onChange={(e) => {
            setUserData({ ...userData, aadharCard: e.target.value });
            setErrors({ ...errors, aadharCard: null});
            setUserError(null);
          }}
        />
      </div>
      {errors.aadharCard && (
        <div className="error text-danger">{errors.aadharCard}</div>
      )}
      <div className="flex-column">
        <label>Date of Birth </label>
      </div>
      <div className="inputForm">
        <input
          type="date"
          className="input"
          value={userData.dob}
          onChange={(e) => {
            setUserData({ ...userData, dob: e.target.value });
            setErrors({ ...errors, dob: null});
            setUserError(null);
          }}
        />
      </div>
      {errors.dob && <div className="error text-danger">{errors.dob}</div>}

      <button className="button-submit" onClick={submitHandler}>
        Submit
      </button>
    </form>
  );
};

export default UserForm;
