import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Recent.css';
import { Eye } from 'lucide-react'

export default function Recent() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await fetch('https://researchx.onrender.com/recent'); // Ensure this endpoint returns paper data
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
    <div className="recent-container">
      <h1>Recently Submitted Research Papers</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="papers-list">
        {papers.map(paper => (
          <div key={paper.id} className="paper-item">
            <h2>
              <Link to={`/paper/${paper.id}`} className="paper-link">{paper.title}</Link>
            </h2>
            <p><strong>Category:</strong> {paper.category}</p>
            <p><strong>Authors:</strong> {paper.authors}</p>
            <p><strong>Abstract:</strong> {paper.description}</p>
            <div className="paper-links">
              <a href={`https://researchx.onrender.com/${paper.document_url}`} download className="button-28">
                <Eye /> View Paper
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
