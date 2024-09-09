import React, { useState } from 'react';
import Navbar from './Navbar'; // Import Navbar
import '../styles/Submit.css'; // Link to a CSS file for styling

export default function Submit() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    authors: '',
    description: '',
  });
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setDocument(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('authors', formData.authors);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('document', document);

    try {
      const response = await fetch('http://localhost:8000/submit', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);
      // Handle successful submission (e.g., redirect or display success message)

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="submit-container">
        <h1>Submit Your Research</h1>
        <p className="submit-subheading">Share your work with the arXiv community.</p>

        <form className="submit-form" onSubmit={handleSubmit}>
          {/* Title Input */}
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} placeholder="Enter your research title" required />

          {/* Category Dropdown */}
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select a category</option>
            <option value="computer-science">Computer Science</option>
            <option value="economics">Economics</option>
            <option value="electrical-engineering">Electrical Engineering and Systems Science</option>
            <option value="mathematics">Mathematics</option>
            <option value="physics">Physics</option>
            <option value="quantitative-biology">Quantitative Biology</option>
            <option value="quantitative-finance">Quantitative Finance</option>
            <option value="statistics">Statistics</option>
          </select>

          {/* Authors Input */}
          <label htmlFor="authors">Authors</label>
          <input type="text" id="authors" name="authors" value={formData.authors} onChange={handleChange} placeholder="Enter authors' names" required />

          {/* Description Box */}
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Enter a brief description of your research" required></textarea>

          {/* Document Upload */}
          <label htmlFor="document">Document</label>
          <input type="file" id="document" name="document" accept=".pdf,.doc,.docx" onChange={handleFileChange} required />

          {/* Submit Button */}
          <button type="submit" className="submit-button" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </>
  );
}
