import React from 'react';
import Navbar from './Navbar'; // Import Navbar
import '../styles/Submit.css'; // Link to a CSS file for styling

export default function Submit() {
  return (
    <>
      <Navbar /> {/* Add Navbar at the top */}
      <div className="submit-container">
        <h1>Submit Your Research</h1>
        <p className="submit-subheading">Share your work with the arXiv community.</p>

        <form className="submit-form">
          {/* Title Input */}
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" placeholder="Enter your research title" required />

          {/* Category Dropdown */}
          <label htmlFor="category">Category</label>
          <select id="category" name="category" required>
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
          <input type="text" id="authors" name="authors" placeholder="Enter authors' names" required />

          {/* Description Box */}
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" placeholder="Enter a brief description of your research" required></textarea>

          {/* Document Upload */}
          <label htmlFor="document">Document</label>
          <input type="file" id="document" name="document" accept=".pdf,.doc,.docx" required />

          {/* Submit Button */}
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </>
  );
}
