import React from "react";
import Headers from "./Headers";
import Footers from "./Footers";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
const MainLayout = ({ children }) => {
  const userState = useSelector((state) => state.user);
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      {userState.userInfo ? (
        <div
          style={{
            flex: "0 0 20%",
            backgroundColor: "#f0f0f0",
            alignItems: "center",
          }}
        >
          <Sidebar />
        </div>
      ) : (
        <div></div>
      )}

      <div classname="flex-col" style={{ flex: "1", overflow: "auto" }}>
        <Headers />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
