import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'; // Assuming you have a Navbar component
import { Link } from 'react-router-dom';
// import '../styles/BrowseArxiv.css';

export default function BrowseArxiv() {
  const [papers, setPapers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch papers from the API based on the search query
  const fetchPapers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8000/fetch_internet?query=${searchQuery}`);
      if (!response.ok) {
        throw new Error('Failed to fetch papers');
      }
      const data = await response.json();
      setPapers(data.papers); // Assuming your backend returns an object with a 'papers' array
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Debounce the search query to prevent frequent API calls
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) fetchPapers(); // Fetch only if there's a search query
    }, 500); // 500ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  if (loading) return <p>Loading papers...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="browse-arxiv-page">
      <div className="browse-arxiv-container">
        <h1>Search and Browse Research Papers from ArXiv</h1>

        {/* Search bar */}
        <div className="filter-section">
          <input
            type="text"
            placeholder="Search by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          />
        </div>

        {/* Display filtered papers */}
        <div className="papers-list">
          {papers.length > 0 ? (
            papers.map((paper, index) => (
              <div key={index} className="paper-card">
                <h2>
                  <Link to={`/paper/${paper.pdf_link}`} target="_blank" rel="noopener noreferrer">
                    {paper.title}
                  </Link>
                </h2>
                <p><strong>Authors:</strong> {paper.authors.join(', ')}</p>
                <p>{paper.summary}</p>
                <div className="paper-links">
                  <a
                    href={paper.pdf_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="download-button"
                  >
                    View Paper
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p>No papers found matching your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
}
