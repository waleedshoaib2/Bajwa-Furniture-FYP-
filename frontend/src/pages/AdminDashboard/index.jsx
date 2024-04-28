import React from "react";
import AdminSidebar from "./AdminSidebar";
import Main from "./Graph";
import AdminHeader from "./AdminNavbar";
import "./AdminHeader.css";
const AdminDashboard = () => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "0 0 250px" }}>
        <AdminSidebar />
      </div>
      <div style={{ flex: "1" }}>
        <Main />
      </div>
    </div>
  );
};

export default AdminDashboard;
