import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'; // Import Navbar
import '../styles/Recent.css';

export default function Recent() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await fetch('http://localhost:8000/recent'); // Ensure this endpoint returns paper data
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setPapers(result.reverse()); // Reverse the array to show new papers on top
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  return (
    <>
      <Navbar />
      <div className="recent-container">
        <h1>Recent Research Papers</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        <div className="papers-list">
          {papers.map(paper => (
            <div key={paper.id} className="paper-item">
              <h2>{paper.title}</h2>
              <p><strong>Category:</strong> {paper.category}</p>
              <p><strong>Authors:</strong> {paper.authors}</p>
              <p>{paper.description}</p>
              <div className="paper-links">
                <a href={`http://localhost:8000/${paper.document_url}`} target="_blank" rel="noopener noreferrer">
                  View Document
                </a>
                <a href={`http://localhost:8000/${paper.document_url}`} download className="download-button">
                  Download PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
