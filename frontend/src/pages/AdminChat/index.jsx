import React, { useState } from "react";
import AdminChatList from "./AdminChatList";
import AdminSidebar from "../AdminDashboard/AdminSidebar";
import Chat from "./Chat";
import Testing from "../Testing/Testing";

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
    <>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flex: "1", height: "100%" }}>
          <Testing />
        </div>

        <div style={{ flex: "1", height: "100%", marginRight: "10px" }}>
          <AdminChatList onChatSelect={handleChatSelect} />
        </div>
        <div style={{ flex: "2", height: "100%" }}>
          {selectedChatId && (
            <Chat chatId={selectedChatId} username={username} sender={sender} />
          )}
        </div>
      </div>
    </>
  );
};

export default AdminChat;
