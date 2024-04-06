import React from "react";
import Navbar from "./components/Navbar";
import DisplayForm from "./components/DisplayForm";
import { createBrowserRouter,Outlet } from "react-router-dom";
import Login from "./components/Login";
import AllUser from "./components/AllUser";

const App = () => {
  return (
    <>
      <Navbar />
      <Outlet/>
    </>
  );
};

const appLayout = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <DisplayForm />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/allusers",
        element: <AllUser />,
      },
    ],
  },
]);

export default appLayout;
