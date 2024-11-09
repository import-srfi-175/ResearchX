import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/Submit.css';

export default function Submit() {
  const { isAuthenticated } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    authors: '',
    description: '',
    document: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // Success state

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
    setSuccess(false); // Reset success message on new submission

    const { title, category, authors, description, document } = formData;
    const formDataToSend = new FormData();
    formDataToSend.append('title', title);
    formDataToSend.append('category', category);
    formDataToSend.append('authors', authors);
    formDataToSend.append('description', description);
    formDataToSend.append('document', document);

    try {
      const authToken = localStorage.getItem('authToken');

      const response = await fetch('https://researchx.onrender.com/submit', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result.message);

      setSuccess(true); // Set success to true on successful submission
      setFormData({ // Reset form fields
        title: '',
        category: '',
        authors: '',
        description: '',
        document: null,
      });

    } catch (error) {
      setError(error.message);
      console.error('Error submitting data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="submit-container">
        {isAuthenticated ? (
          <>
            <h1>Submit Your Research</h1>
            <p className="submit-subheading">Share your work with the arXiv community.</p>

            <form className="submit-form" onSubmit={handleSubmit}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter your research title"
                required
              />

              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
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
              <input
                type="text"
                id="authors"
                name="authors"
                value={formData.authors}
                onChange={handleChange}
                placeholder="Enter authors' names"
                required
              />

              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter a brief description of your research"
                required
              ></textarea>

              <label htmlFor="document">Document</label>
              <input
                type="file"
                id="document"
                name="document"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
              />

              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
              {error && <p className="error-message">{error}</p>}
              {success && <p className="success-message">Submission successful!</p>} {/* Success message */}
            </form>
          </>
        ) : (
          <div className="auth-required-card">
            <h2>Submission Requires Authentication</h2>
            <p>You need to be signed in to submit a research paper. <br></br>Sign up to join arXiv.org today or sign in to continue!</p>
            <div className="auth-links">
              <Link to="/signin" className="button-27">Sign In</Link>
              <Link to="/signup" className="button-28">Sign Up</Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
