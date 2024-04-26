import React from "react";
import { Link } from "react-router-dom";
import "./AdminSidebar.css"; // Make sure to create AdminSidebar.css for styling

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <ul>
        <li>
          <Link to="/admin/userlist" className="black-button">
            Users
          </Link>
        </li>
        <li>
          <Link to="/admin/categorylist" className="black-button">
            Category
          </Link>
        </li>
        <li>
          <Link to="/admin/productlist" className="black-button">
            Products
          </Link>
        </li>
        <li>
          <Link to="/admin/orderlist" className="black-button">
            Orders
          </Link>
        </li>
        <li>
          <Link to="/profile" className="black-button">
            Profile
          </Link>
        </li>
        <li>
          <Link to="/admin/newsletter" className="black-button">
            Newsletter
          </Link>
        </li>
        {/* Add more sidebar items as needed */}
      </ul>
    </div>
  );
};

export default AdminSidebar;
