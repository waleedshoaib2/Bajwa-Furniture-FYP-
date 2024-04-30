import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaChartBar,
  FaBox,
  FaEdit,
  FaEnvelope,
  FaAngleLeft,
  FaAngleRight,
  FaCommentAlt, // New icon for Chat Support
  FaUserFriends, // New icon for Customers
  FaShoppingCart,
  FaSignOutAlt, // New icon for Orders
} from "react-icons/fa";
import "./Testing.css"; // CSS file for styling

const Testing = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "" : "collapsed"}`}>
      <div className="sidebar-header">
        <img
          className="logo-bf"
          height={100}
          src="./lightlogo.svg"
          alt="logo"
        />
        <div className="logo"></div>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isSidebarOpen ? <FaAngleLeft /> : <FaAngleRight />}
        </button>
      </div>
      <ul className="menu-items">
        <li>
          <Link to="/chat-support">
            <FaCommentAlt /> {/* Icon for Chat Support */}
            {isSidebarOpen && <span>Chat Support</span>}
          </Link>
        </li>
        <li>
          <Link to="/categories">
            <FaUsers />
            {isSidebarOpen && <span>Categories</span>}
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <FaShoppingCart /> {/* Icon for Orders */}
            {isSidebarOpen && <span>Orders</span>}
          </Link>
        </li>
        <li>
          <Link to="/customers">
            <FaUserFriends /> {/* Icon for Customers */}
            {isSidebarOpen && <span>Customers</span>}
          </Link>
        </li>
        <li>
          <Link to="/dashboard">
            <FaChartBar />
            {isSidebarOpen && <span>Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link to="/products">
            <FaBox />
            {isSidebarOpen && <span>Products</span>}
          </Link>
        </li>
        <li>
          <Link to="/blogs">
            <FaEdit />
            {isSidebarOpen && <span>Blogs</span>}
          </Link>
        </li>
        <li>
          <Link to="/newsletter">
            <FaEnvelope />
            {isSidebarOpen && <span>Newsletter</span>}
          </Link>
        </li>
        <li>
          <Link to="/newsletter">
            <FaSignOutAlt />
            {isSidebarOpen && <span>Logout</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Testing;
