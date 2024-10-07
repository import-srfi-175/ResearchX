import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Browse.css';

export default function Browse() {
  const [papers, setPapers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch papers from the API
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await fetch('http://localhost:8000/recent');
        if (!response.ok) {
          throw new Error('Failed to fetch papers');
        }
        const data = await response.json();
        setPapers(data);
        setFilteredPapers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  // Filter papers based on search query and category
  useEffect(() => {
    let filtered = papers;

    if (searchQuery) {
      filtered = filtered.filter((paper) =>
        paper.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((paper) => paper.category === selectedCategory);
    }

    setFilteredPapers(filtered);
  }, [searchQuery, selectedCategory, papers]);

  if (loading) return <p>Loading papers...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="browse-page">
      <Navbar />

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
          {filteredPapers.length > 0 ? (
            filteredPapers.map((paper) => (
              <div key={paper.id} className="paper-card">
                <h2>{paper.title}</h2>
                <p><strong>Category:</strong> {paper.category}</p>
                <p><strong>Authors:</strong> {paper.authors}</p>
                <p>{paper.description}</p>
                <div className="paper-links">
                  <a
                    href={`http://localhost:8000/${paper.document_url}`}
                    download
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
