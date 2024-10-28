import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ReactMarkdown from 'react-markdown'; // Import react-markdown
import '../styles/PaperDetail.css'; // Import the new CSS file

const PaperDetail = () => {
  const { id } = useParams(); // Get the paper ID from the URL
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState(''); // State for the summary
  const [loadingSummary, setLoadingSummary] = useState(false); // State for loading animation

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const response = await fetch(`http://localhost:8000/paper/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch paper');
        }
        const data = await response.json();
        setPaper(data.paper); // Assuming data contains a 'paper' object
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaper();
  }, [id]);

  const generateSummary = async () => {
    if (!paper || !paper.document_url) {
      setError('No document URL available to summarize.');
      return;
    }

    setLoadingSummary(true); // Show loading animation
    setSummary(''); // Clear previous summary if any

    try {
      const response = await fetch('http://localhost:8000/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pdf_file: paper.document_url, // Sending the document URL to the endpoint
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate summary');
      }

      const data = await response.json();
      setSummary(data.response); // Assuming the response has the summary in 'response'
    } catch (error) {
      setError(error.message);
    } finally {
      setLoadingSummary(false); // Hide loading animation
    }
  };

  if (loading) return <p>Loading paper details...</p>;
  if (error) return <p className="error-message">{error}</p>;
  
  return (
    <div className="paper-detail-page">
      <div className="paper-detail-container">
        {paper && (
          <div className="paper-detail-card">
            <h1 className="paper-title">{paper.title}</h1>
            <p><strong>Category:</strong> {paper.category}</p>
            <p><strong>Authors:</strong> {paper.authors}</p>
            <p><strong>Description:</strong> {paper.description}</p>
            <p><strong>Submitted on:</strong> {new Date(paper.created_at).toLocaleDateString()}</p>
            <div className="paper-links">
              <a
                href={`http://localhost:8000/${paper.document_url}`}
                download
                className="download-button"
              >
                View Paper
              </a>
            </div>
            <button onClick={generateSummary} className="generate-button">
              Generate Summary
            </button>
            {loadingSummary ? (
              <div className="loading-animation">
                <p>Generating Summary...</p>
                <div className="spinner"></div>
              </div>
            ) : (
              summary && (
                <div className="summary-container">
                  <h2>Summary</h2>
                  <ReactMarkdown>{summary}</ReactMarkdown> {/* Render Markdown content */}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaperDetail;
