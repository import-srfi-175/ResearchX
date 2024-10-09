import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Navbar from './Navbar'; // Import Navbar
import { AuthContext } from '../contexts/AuthContext'; // Import AuthContext
import '../styles/Submit.css'; // Link to a CSS file for styling

export default function Submit() {
  const { isAuthenticated } = useContext(AuthContext); // Get authentication status
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    authors: '',
    description: '',
    document: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, document: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { title, category, authors, description, document } = formData;

    const formDataToSend = new FormData();
    formDataToSend.append('title', title);
    formDataToSend.append('category', category);
    formDataToSend.append('authors', authors);
    formDataToSend.append('description', description);
    formDataToSend.append('document', document);

    try {
      const authToken = localStorage.getItem('authToken'); // Retrieve the token directly from localStorage

      const response = await fetch('http://localhost:8000/submit', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`, // Add the JWT token here
        },
        body: formDataToSend, // Send FormData directly
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result.message); // Handle successful submission

    } catch (error) {
      setError(error.message);
      console.error('Error submitting data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="submit-container">
        {isAuthenticated ? (
          <>
            <h1>Submit Your Research</h1>
            <p className="submit-subheading">Share your work with the arXiv community.</p>

            <form className="submit-form" onSubmit={handleSubmit}>
              <label htmlFor="title">Title</label>
              <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} placeholder="Enter your research title" required />

              <label htmlFor="category">Category</label>
              <select id="category" name="category" value={formData.category} onChange={handleChange} required>
                <option value="">Select a category</option>
                <option value="Physics">Physics</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Economics">Economics</option>
                <option value="Electrical Engineering">Electrical Engineering and Systems Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Quantitative Biology">Quantitative Biology</option>
                <option value="Quantitative Finance">Quantitative Finance</option>
                <option value="Statistics">Statistics</option>
              </select>

              <label htmlFor="authors">Authors</label>
              <input type="text" id="authors" name="authors" value={formData.authors} onChange={handleChange} placeholder="Enter authors' names" required />

              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Enter a brief description of your research" required></textarea>

              <label htmlFor="document">Document</label>
              <input type="file" id="document" name="document" accept=".pdf,.doc,.docx" onChange={handleFileChange} required />

              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
              {error && <p className="error-message">{error}</p>}
            </form>
          </>
        ) : (
          <div className="auth-required-card">
            <h2>Submission Requires Authentication</h2>
            <p>You need to be signed in to submit a research paper. <br></br>Sign up to join arXiv.org today or sign in to continue!</p>
            <div className="auth-links">
              <Link to="/signin" className="auth-button">Sign In</Link>
              <Link to="/signup" className="auth-button">Sign Up</Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
