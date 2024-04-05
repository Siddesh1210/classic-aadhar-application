import React from "react";
import Navbar from "./components/Navbar";
import UserInputForm from "./components/UserInputForm";
import { createBrowserRouter,Outlet } from "react-router-dom";
import Login from "./components/Login";

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
        element: <UserInputForm />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default appLayout;
