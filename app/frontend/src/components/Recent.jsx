import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Recent.css';
import { AuthContext } from '../contexts/AuthContext'; // Import the AuthContext
import { Download, Trash } from 'lucide-react'; // Import the icons

export default function Recent() {
  const { userName, isAuthenticated } = useContext(AuthContext); // Get user authentication state
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

  const handleDelete = async (paperId) => {
    if (window.confirm('Are you sure you want to delete this paper?')) {
      try {
        const response = await fetch(`http://localhost:8000/delete/${paperId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Send the JWT token for authorization
          },
        });
        if (!response.ok) {
          throw new Error('Failed to delete the paper');
        }
        setPapers(papers.filter(paper => paper.id !== paperId)); // Remove the deleted paper from state
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <>
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
                <a href={`http://localhost:8000/${paper.document_url}`} download className="button-28">
                  <Download size={16} /> View Paper
                </a>
                {isAuthenticated && ( // Check if the user is authenticated
                  <button className="button-28 delete-button" onClick={() => handleDelete(paper.id)}>
                    <Trash size={16} /> Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
