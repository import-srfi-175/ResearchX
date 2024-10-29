import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // Import AuthContext
import Logo from '../images/arxiv-logo.png';
import '../styles/Navbar.css';

export default function Navbar() {
  const { isAuthenticated, userName, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/">
        <img src={Logo} width="100px" alt="Logo" />
      </Link>
      <ul className="navbar--items">
        <li><Link to="/browse">Browse Papers</Link></li>
        <li><Link to="/recent">Recent Submissions</Link></li>
        <li><Link to="/submit">Submit Now</Link></li>
        <li><Link to="/aboutus">About Us</Link></li>
      </ul>
      <div className="navbar--auth">
        {isAuthenticated ? (
          <div className="welcome-message">
            <span>Welcome, {userName}</span>
            <button onClick={logout} className="button-27">Logout</button>
          </div>
        ) : (
          <>
            <Link to="/signin">
              <button className="button-27" role="button">Sign In</button>
            </Link>
            <Link to="/signup">
              <button className="button-28" role="button">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
