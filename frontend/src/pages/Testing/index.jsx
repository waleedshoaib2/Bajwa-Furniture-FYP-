import React from "react";
import Sidebar from "./Sidebar";
import Main from "../AdminDashboard/Graph";

const Testdashboard = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: "1", padding: "20px" }}>
        <Main />
      </div>
    </div>
  );
};

export default Testdashboard;
