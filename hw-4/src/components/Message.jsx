import React from "react";

const Message = ({ message }) => {
  return (
    <div className={`flex p-3`}>
      <div className={`max-w-xs p-3 rounded-lg shadow-lg bg-blue-500 text-white`}>
        <p>{message.data}</p>
      </div>
    </div>
  );
};

export default Message;
