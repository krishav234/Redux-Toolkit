import React from "react";
import Navigation from "./Navigation";
import "./layout.css";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="layout">
       
        <Navigation />
        <Outlet />
        
      </div>
    </>
  );
};

export default Layout;
