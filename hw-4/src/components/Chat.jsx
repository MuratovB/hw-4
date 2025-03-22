import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import socket from "../websocket";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      if (messageData.type === "history") {
        setMessages(messageData.data);
      } else if (messageData.type === "message") {
        setMessages((prevMessages) => [...prevMessages, messageData]);
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput />
    </div>
  );
};

export default Chat;