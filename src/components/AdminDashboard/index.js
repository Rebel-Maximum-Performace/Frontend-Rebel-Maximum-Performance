import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

export default function AdminDashboard() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    socket.emit('admin-join');
    socket.on('active-chats', setChats);
    socket.on('new-chat', (chat) => setChats((prev) => [...prev, chat]));
    socket.on('user-typing', () => setIsTyping(true));
    return () => socket.disconnect();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-1/3 border-r p-4">
        <h2 className="text-xl font-bold">Active Chats</h2>
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            className="p-2 hover:bg-gray-100 cursor-pointer"
          >
            User: {chat.userId}
          </div>
        ))}
      </div>
      <div className="w-2/3 p-4">
        {selectedChat ? (
          <div>
            <div className="messages h-96 overflow-y-auto">
              {selectedChat.messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 my-1 rounded ${
                    msg.sender === 'admin' ? 'bg-green-100' : 'bg-gray-100'
                  }`}
                >
                  <p>{msg.text}</p>
                  <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                </div>
              ))}
              {isTyping && (
                <div className="text-gray-500">User is typing...</div>
              )}
            </div>
            <input
              type="text"
              onChange={(e) => {
                socket.emit('typing', selectedChat.userId);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  socket.emit('admin-message', {
                    userId: selectedChat.userId,
                    text: e.target.value,
                  });
                  e.target.value = '';
                }
              }}
              className="border p-2 w-full mt-2"
            />
          </div>
        ) : (
          <p>Select a chat</p>
        )}
      </div>
    </div>
  );
}
