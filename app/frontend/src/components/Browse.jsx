import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react'
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
      if (category && category !== '') query.append('category', category);

      const response = await fetch(`https://researchx.onrender.com/findpaper?${query.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch papers');
      }
      const data = await response.json();
      setPapers(data.papers);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Save selected category to localStorage
  useEffect(() => {
    if (selectedCategory) {
      localStorage.setItem('lastBrowsedSubject', selectedCategory);
    }
  }, [selectedCategory]);

  // Debounce the search query to prevent frequent API calls
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchPapers(null, searchQuery, selectedCategory);
    }, 500); // 500ms delay

    // Clear timeout if the user starts typing again before the delay completes
    return () => clearTimeout(delayDebounceFn);
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
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query without immediately triggering fetch
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Physics">Physics</option>
            <option value="computer-science">Computer Science</option>
            <option value="economics">Economics</option>
            <option value="electrical">Electrical Engineering and Systems Science</option>
            <option value="mathematics">Mathematics</option>
            <option value="biology">Quantitative Biology</option>
            <option value="finance">Quantitative Finance</option>
            <option value="statistics">Statistics</option>
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
                    href={`https://researchx.onrender.com/${paper.document_url}`}
                    download
                    className="button-28"
                  > <Eye />
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
