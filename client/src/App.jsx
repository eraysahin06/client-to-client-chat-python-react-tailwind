import { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8000/ws');
    websocket.onmessage = (event) => {
      setReceivedMessages((prevMessages) => [...prevMessages, event.data]);
    };
    setWs(websocket);
    return () => {
      websocket.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (ws) {
      ws.send(message);
      setMessage('');
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-4 border rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Chat Application</h1>
      <div className="mb-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="w-full mt-2 bg-blue-500 text-white p-2 rounded"
        >
          Send
        </button>
      </div>
      <div className="h-64 overflow-auto border-t pt-2">
        <ul>
          {receivedMessages.map((msg, index) => (
            <li key={index} className="mb-2">
              {msg}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
