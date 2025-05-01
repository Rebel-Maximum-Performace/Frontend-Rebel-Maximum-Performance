import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

export default function UserChat({ userId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  console.log(socket, 'socket');

  useEffect(() => {
    socket.emit('user-join', userId);
    socket.on('new-message', (chat) => setMessages(chat.messages));
    return () => socket.disconnect();
  }, [userId]);

  const sendMessage = () => {
    if (input.trim()) {
      console.log('userId', userId);
      socket.emit('send-message', { userId, text: input });
      setInput('');
    }
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="messages h-64 overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 my-1 rounded ${
              msg.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'
            }`}
          >
            <p>{msg.text}</p>
            <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
        {isTyping && <div className="text-gray-500">Admin is typing...</div>}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          socket.emit('typing', userId);
        }}
        className="border p-2 w-full mt-2"
      />
      <button onClick={sendMessage} className="bg-blue-500 text-white p-2 mt-2">
        Send
      </button>
    </div>
  );
}
