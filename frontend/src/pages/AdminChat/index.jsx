import React, { useState } from "react";
import AdminChatList from "./AdminChatList";
import AdminSidebar from "../AdminDashboard/AdminSidebar";
import Chat from "./Chat";
import Sidebar from "../Testing/Sidebar";

const AdminChat = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [username, setUsername] = useState(null);
  const [sender, setSender] = useState(null);

  const handleChatSelect = (chatId, username, sender) => {
    setSelectedChatId(chatId);
    setUsername(username);
    setSender(sender);
  };

  return (
    <div style={{ display: "flex", margin: "0px" }}>
      <Sidebar />

      <div style={{ flex: "1" }}>
        <AdminChatList onChatSelect={handleChatSelect} />
      </div>
      <div style={{ flex: "2" }}>
        {selectedChatId && (
          <Chat chatId={selectedChatId} username={username} sender={sender} />
        )}
      </div>
    </div>
  );
};

export default AdminChat;
