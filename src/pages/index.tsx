import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleStart = () => {
    if (username.trim()) {
      router.push(`/chat?username=${encodeURIComponent(username)}`);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Enter your username</h1>
      <input
        className="border rounded px-4 py-2 w-full"
        placeholder="Your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
        onClick={handleStart}
      >
        Join Chat
      </button>
    </div>
  );
}
