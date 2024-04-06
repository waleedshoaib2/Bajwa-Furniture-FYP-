import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json", // Set to JSON
          },
        };
        const response = await axios.get(
          `http://localhost:4000/user/all-users`,
          config
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // ... Your existing implementation to send newsletter to all users
  };

  const handleSendEmail = async (user_email) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `http://localhost:4000/api/newsletter/email`,
        { user_email },
        config
      );

      // Handle success message
      console.log("Email sent successfully to user:", user_email);
    } catch (error) {
      // Handle error
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="admin-list">
      {loading && <div className="admin-list__container">Loading...</div>}
      {error && (
        <div className="admin-list__container">Error: {error.message}</div>
      )}

      <table className="admin-list__container" style={{ marginLeft: "20px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="admin-add-button"
                    onClick={() => handleSendEmail(user.email)}
                  >
                    Send Email
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Newsletter;
