import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./AdminChat.css";
import AdminSidebar from "../AdminDashboard/AdminSidebar";
import { FaUser } from "react-icons/fa";

const AdminChat = () => {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

      try {
        const response = await axios.get(
          "http://localhost:4000/chat/chats",
          config
        );
        setChats(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err);
        if (err.response && err.response.status === 401) {
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchChats();
  }, [navigate, userInfo.token]);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.post(
        "http://localhost:4000/chat/chats",
        {},
        config
      );
      console.log("Chat created:", response.data);
    } catch (err) {
      setError(err);
      console.error("Chat creation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-chat-container">
      <AdminSidebar />
      <section className="message-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="chat-area">
                <div className="chatlist">
                  <ul className="chat-list">
                    {chats.map((chat) => (
                      <li key={chat._id} className="chat-item">
                        <Link to={`/chats/${chat._id}`} className="chat-link">
                          <div>
                            <div className="flex-shrink-0">
                              <FaUser />
                              <h3>{chat.user.name}</h3>
                              <span className="active"></span>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <p>
                                Last Message:{" "}
                                {
                                  chat.messages[chat.messages.length - 1]
                                    .content
                                }
                              </p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminChat;
