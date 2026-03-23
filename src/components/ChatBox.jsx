import { useState } from "react";

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input) return;

    setMessages([...messages, input]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">

      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((msg, i) => (
          <p key={i} className="bg-gray-700 p-2 rounded mb-1 text-gray-900">
            {msg}
          </p>
        ))}
      </div>

      <div className="flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-gray-600 p-2 rounded-l bg-gray-800 text-white"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;