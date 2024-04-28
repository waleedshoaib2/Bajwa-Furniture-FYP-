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
      <AdminSidebar />
      <AdminChatList onChatSelect={handleChatSelect} />
      {selectedChatId && <Chat chatId={selectedChatId} />}
    </div>
  );
};

export default AdminChat;
