// AdminNavbar.js
import React from "react";
import { FaCog, FaBell, FaUserCircle, FaSearch } from "react-icons/fa";
import "./AdminSidebar.css";

const AdminNavbar = () => {
  return (
    <div className="admin-header">
      <div className="admin-header-left">
        <div className="admin-logo">
          {/* Your logo goes here */}
          <img src="/path/to/your/logo.png" alt="Logo" />
        </div>
        <div className="admin-search">
          <input type="text" placeholder="Search..." />
          <button className="search-button">
            <FaSearch />
          </button>
        </div>
      </div>
      <div className="admin-header-right">
        <div className="admin-icons">
          <FaCog />
          <FaBell />
          <FaUserCircle />
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
