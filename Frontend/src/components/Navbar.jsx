import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";

const Navbar = () => {
    const [show,setShow]=useState(false);
    const navigate=useNavigate();
    useEffect(()=>{
        const auth=localStorage.getItem('access_token');
        if(auth)
        {
            setShow(true);
        }
    })

    function logoutHandler()
    {
        localStorage.clear();
        setShow(false);
    }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand fs-4" to="/">
            Classic Aadhar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fs-5">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {
                show?
                <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/allusers">
                  Requests
                </Link>
              </li>:null
              }
              <li className="nav-item">
                {
                    show?
                    <Link className="nav-link active" to="/login" onClick={logoutHandler}>
                      Logout
                    </Link>:
                    <Link className="nav-link active" to="/login">
                      Login
                    </Link>
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
