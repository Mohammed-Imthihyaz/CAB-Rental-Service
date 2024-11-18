import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Home = () => {
  return (
    <div>
      <NavBar />
      <Outlet /> {/* Renders the nested routes */}
    </div>
  );
};

export default Home;
