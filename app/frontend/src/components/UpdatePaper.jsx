import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/Submit.css'; // Reuse the same CSS file

export default function UpdatePaper() {
  const { isAuthenticated } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchPaper = async () => {
      const response = await fetch(`https://researchx.onrender.com/paper/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setFormData({
          title: data.paper.title,
          category: data.paper.category,
          authors: data.paper.authors,
          description: data.paper.description,
          document: null, // Keep file handling as is
        });
      } else {
        setError(data.message || 'Failed to fetch paper details');
      }
    };

    fetchPaper();
  }, [id]);

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
    setSuccess(false);
  
    const dataToSubmit = new FormData();
    dataToSubmit.append('title', formData.title.trim());
    dataToSubmit.append('category', formData.category.trim());
    dataToSubmit.append('authors', formData.authors.trim());
    dataToSubmit.append('description', formData.description.trim());
  
    if (formData.document) {
      dataToSubmit.append('document', formData.document);
    }
  
    try {
      const authToken = localStorage.getItem('authToken');
  
      const response = await fetch(`https://researchx.onrender.com/modifypaper/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          // 'Content-Type': 'application/json', // Do not set Content-Type when using FormData
        },
        body: dataToSubmit, // Send FormData
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.log('Response Status:', response.status);
        console.log('Response Data:', errorData);
        throw new Error('Error updating data: ' + errorData.detail);
      }
  
      const result = await response.json();
      console.log(result.message);
      setSuccess(true);
      navigate(`/paper/${id}`);
    } catch (error) {
      setError(error.message);
      console.error('Error updating data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="submit-container">
        {isAuthenticated ? (
          <>
            <h1>Update Your Research</h1>
            <p className="submit-subheading">Make changes to your submission.</p>

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
                <option value="Electrical Engineering">Electrical Engineering</option>
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

              <label htmlFor="document">Document (optional)</label>
              <input
                type="file"
                id="document"
                name="document"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />

              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Updating...' : 'Update'}
              </button>
              {error && <p className="error-message">{error}</p>}
              {success && <p className="success-message">Update successful!</p>} {/* Success message */}
            </form>
          </>
        ) : (
          <div className="auth-required-card">
            <h2>Update Requires Authentication</h2>
            <p>You need to be signed in to update a research paper. <br /> Sign up to join arXiv.org today or sign in to continue!</p>
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
