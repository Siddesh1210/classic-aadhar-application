import React from "react";
import '../assets/css/SuccessCard.css';


const SuccessCard = ({openForm}) => {
  return (
    <div className="cookieCard">
      <p className="cookieHeading text-center">Registeration Successful</p>
      <p className="cookieDescription text-center">
        Once your details are verified by admin you will receive UUID on your email
      </p>
      <button className="acceptButton" onClick={()=>{
        openForm(false)
      }}>Close</button>
    </div>
  );
};

export default SuccessCard;
