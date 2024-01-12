import MainLayout from "../../Components/MainLayout";
import React from "react";
import Hero from "../container/hero";
import { Outlet } from "react-router-dom";

const Homepage = () => {
  return (
    <MainLayout>
      <Hero />
      <Outlet />
    </MainLayout>
  );
};

export default Homepage;
