import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
import '../styles/PDFChat.css';

const PDFChat = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pdfUrl = params.get('pdfUrl');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = { text: input, sender: 'User' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput('');
      setLoading(true);

      // Sending the user message and PDF URL to the backend
      try {
        const response = await fetch('https://researchx.onrender.com/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: input,
            pdf_file: pdfUrl.split('/').pop(), // Extracting only the filename
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch bot response');
        }

        const data = await response.json();
        const botMessage = { text: data.reponse, sender: 'Bot' }; // Correctly access 'response'
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error:', error);
        const errorMessage = { text: 'Error: Unable to get response', sender: 'Bot' };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="pdf-chat-container card">
      <h2>View PDF</h2>
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          width="100%"
          height="500px"
          title="PDF Document"
          frameBorder="0"
        />
      )}
      <div className="chat-section">
        <h3>Chat</h3>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              <strong>{msg.sender}: </strong>
              {msg.sender === 'Bot' ? (
                <ReactMarkdown>{msg.text}</ReactMarkdown> // Render bot messages as Markdown
              ) : (
                msg.text
              )}
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your query..."
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PDFChat;
