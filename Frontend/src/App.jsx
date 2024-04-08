import React from "react";
import { Routes, Route,useNavigate} from "react-router-dom";
import Navbar from "./components/Navbar";
import DisplayForm from "./components/DisplayForm";
import Login from "./components/Login";
import AllUser from "./components/AllUser";
import PrivateComponent from "./components/PrivateComponent";

const App = () => {
    const navigate=useNavigate();
  return (
    <>
      <Navbar />
      <Routes>
        
        <Route element={<PrivateComponent />}>
          <Route path="/allusers" element={<AllUser />} />
        </Route>
        <Route path="/" element={<DisplayForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<p className="text-center mt-3 fs-5" style={{letterSpacing:"1px"}}>Oops...Page your are looking for does not exist!!! Please return to <span onClick={()=>navigate("/")} style={{color:"blue",cursor:"pointer"}}>Home Page</span></p>}/>
      </Routes>
    </>
  );
};

export default App;
