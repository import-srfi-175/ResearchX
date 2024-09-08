import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css'; // Import the CSS file for styling

function Footer() {
  return (
    <footer className="footer">
      <div className="footer--trademark">
        <p>© 2024 Project arXiv. All rights reserved.</p>
      </div>
      <div className="footer--links">
        <Link to="/terms">Terms of Service</Link>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
    </footer>
  );
}

export default Footer;
