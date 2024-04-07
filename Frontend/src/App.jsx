import React from "react";
import { Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import DisplayForm from "./components/DisplayForm";
import Login from "./components/Login";
import AllUser from "./components/AllUser";
import PrivateComponent from "./components/PrivateComponent";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        
        <Route element={<PrivateComponent />}>
          <Route path="/allusers" element={<AllUser />} />
        </Route>
        <Route path="/" element={<DisplayForm />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
