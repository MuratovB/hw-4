import React, { useState } from "react";
import socket from "../websocket";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const sendMessage = () => {
    setError("");

    if (message.length > 255) {
      setError("Сообщение не должно превышать 255 символов.");
      return;
    }

    const allowedChars = /^[a-zA-Zа-яА-ЯёЁ0-9\s.,!?№@#$%^&*()_+=[\]{};:'"\\|<>/~`-]+$/;
    if (!allowedChars.test(message)) {
      setError("Сообщение содержит недопустимые символы.");
      return;
    }

    if (socket.readyState === WebSocket.OPEN && message.trim()) {
      socket.send(JSON.stringify({ type: "message", data: message }));
      setMessage("");
    } else {
      console.error("WebSocket соединение не открыто. Сообщение не отправлено.");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col p-4">
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border rounded p-2 mr-2"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Отправить
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
