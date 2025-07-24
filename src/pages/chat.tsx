import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useRouter } from 'next/router';

const socket = io('http://localhost:4000');

export default function Chat() {
  const router = useRouter();
  const { username } = router.query;

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ username: string; text: string }[]>([]);

  useEffect(() => {
    if (!username) return;

    socket.emit('get history');

    socket.on('chat message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on('chat history', (history) => {
      setMessages(history.reverse()); // oldest first
    });

    return () => {
      socket.off('chat message');
      socket.off('chat history');
    };
  }, [username]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('chat message', {
        username,
        text: message,
      });
      setMessage('');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {username}</h1>
      <div className="border p-4 h-96 overflow-y-scroll bg-gray-50 rounded mb-4 text-black">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            <span className="font-semibold">{msg.username}:</span>{' '}
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="border rounded px-4 py-2 flex-1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
