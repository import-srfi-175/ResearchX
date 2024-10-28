import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { AiOutlineSend } from 'react-icons/ai';
import '../styles/PDFChatViewer.css';

const PDFChatViewer = ({ pdfUrl, chatEndpoint }) => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    setMessages([...messages, { text: inputMessage, sender: 'user' }]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await fetch(chatEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage, pdfUrl }),
      });
      const data = await response.json();
      setMessages([...messages, { text: inputMessage, sender: 'user' }, { text: data.response, sender: 'bot' }]);
    } catch (error) {
      setMessages([...messages, { text: inputMessage, sender: 'user' }, { text: 'Error fetching response', sender: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pdf-chat-viewer">
      <div className="pdf-viewer">
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={currentPage} />
        </Document>
        <div className="pagination">
          <button disabled={currentPage <= 1} onClick={() => setCurrentPage(currentPage - 1)}>
            Previous
          </button>
          <p>Page {currentPage} of {numPages}</p>
          <button disabled={currentPage >= numPages} onClick={() => setCurrentPage(currentPage + 1)}>
            Next
          </button>
        </div>
      </div>

      {/* Chat Window */}
      <div className={`chat-window ${chatOpen ? 'open' : ''}`}>
        <div className="chat-header" onClick={() => setChatOpen(!chatOpen)}>
          <p>Chat with PDF</p>
        </div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {loading && <div className="chat-message bot">Generating response...</div>}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask something about the PDF..."
          />
          <button onClick={sendMessage}><AiOutlineSend /></button>
        </div>
      </div>

      {/* Toggle Chat Button */}
      <button className="toggle-chat-button" onClick={() => setChatOpen(!chatOpen)}>
        Chat
      </button>
    </div>
  );
};

export default PDFChatViewer;
