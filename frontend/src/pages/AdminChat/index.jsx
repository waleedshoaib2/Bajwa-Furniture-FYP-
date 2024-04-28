import React, { useState } from "react";
import AdminChatList from "./AdminChatList";
import AdminSidebar from "../AdminDashboard/AdminSidebar";
import Chat from "./Chat";

const AdminChat = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);

  const handleChatSelect = (chatId) => {
    setSelectedChatId(chatId);
  };

  return (
    <div style={{ display: "flex", margin: "0px" }}>
      <div style={{ flex: "0 0 250px" }}>
        <AdminSidebar />
      </div>
      <div style={{ flex: "1" }}>
        <AdminChatList onChatSelect={handleChatSelect} />
      </div>
      <div style={{ flex: "2" }}>
        {selectedChatId && <Chat chatId={selectedChatId} />}
      </div>
    </div>
  );
};

export default AdminChat;
