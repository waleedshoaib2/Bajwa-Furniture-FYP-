import React from "react";
import AdminSidebar from "./AdminSidebar";
import Main from "./Graph";
import AdminHeader from "./AdminNavbar";
import "./AdminHeader.css";
const AdminDashboard = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "250px 1fr",
        gridTemplateRows: "auto 1fr",
      }}
    >
      <div style={{ gridRow: "1 / span 1", gridColumn: "1 / span 2" }}>
        <AdminHeader />
      </div>
      <div style={{ gridRow: "2 / span 1", gridColumn: "1 / span 1" }}>
        <AdminSidebar />
      </div>
      <div style={{ gridRow: "2 / span 1", gridColumn: "2 / span 1" }}>
        <Main />
      </div>
    </div>
  );
};

export default AdminDashboard;
