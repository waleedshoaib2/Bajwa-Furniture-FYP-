import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUser, FaSearch } from "react-icons/fa"; // Import FaSearch
import "./AdminChat.css";

const AdminChatList = ({ onChatSelect }) => {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredChats = chats.filter((chat) =>
    chat.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="message-area">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="search-bar">
              <div className="search-input">
                <input
                  type="text"
                  placeholder="Search chats..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="chatlist">
              <ul className="chat-list">
                {filteredChats.map((chat) => (
                  <li key={chat._id} className="chat-item">
                    <div>
                      <div onClick={() => onChatSelect(chat._id)}>
                        <div className="flex-shrink-0">
                          <div className="uppercorner">
                            <FaUser />
                            <div className="username">{chat.user.name}</div>
                            <span className="active"></span>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <p>
                            Last Message:{" "}
                            {chat.messages[chat.messages.length - 1].content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminChatList;
