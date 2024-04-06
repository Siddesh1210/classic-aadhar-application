import React, { useState } from "react";
import "../assets/css/UserInputForm.css";
import SuccessCard from "./SuccessCard";
import UserForm from "./UserForm";

const DisplayForm = () => {
  const [success, setSuccess] = useState(false)
  //use to close success form and render userInput form again
  function openForm(openForm) {
    setSuccess(openForm);
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center my-3">
        <div className="col-md-5 d-flex justify-content-center">
          {success ? (
            <SuccessCard openForm={openForm} />
          ) : (
            <UserForm openForm={openForm}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayForm;
