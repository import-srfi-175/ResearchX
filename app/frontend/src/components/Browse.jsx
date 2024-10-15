import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import '../styles/Browse.css';

export default function Browse() {
  const [papers, setPapers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch papers from the API based on search criteria
  const fetchPapers = async (author = null, title = null, category = null) => {
    setLoading(true);
    setError(null);

    try {
      const query = new URLSearchParams();
      if (author) query.append('author', author);
      if (title) query.append('title', title);
      if (category && category !== '') query.append('category', category); // Add category to the query

      const response = await fetch(`http://localhost:8000/findpaper?${query.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch papers');
      }
      const data = await response.json();
      setPapers(data.papers);  // Assuming the response is structured like { "papers": [...] }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch papers on component mount and when searchQuery or selectedCategory changes
  useEffect(() => {
    fetchPapers(null, searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory]);

  if (loading) return <p>Loading papers...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="browse-page">
      <div className="browse-container">
        <h1>Browse Research Papers</h1>

        {/* Search bar and category selection */}
        <div className="filter-section">
          <input
            type="text"
            placeholder="Search by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Physics">Physics</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Economics">Economics</option>
            <option value="Electrical Engineering">Electrical Engineering and Systems Science</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Quantitative Biology">Quantitative Biology</option>
            <option value="Quantitative Finance">Quantitative Finance</option>
            <option value="Statistics">Statistics</option>
          </select>
        </div>

        {/* Display filtered papers */}
        <div className="papers-list">
          {papers.length > 0 ? (
            papers.map((paper) => (
              <div key={paper.id} className="paper-card">
                <h2>
                  <Link to={`/paper/${paper.id}`}>{paper.title}</Link>
                </h2>
                <p><strong>Category:</strong> {paper.category}</p>
                <p><strong>Authors:</strong> {paper.authors}</p>
                <p>{paper.description}</p>
                <div className="paper-links">
                  <a
                    href={`http://localhost:8000/${paper.document_url}`}
                    download
                    className="button-28"
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
