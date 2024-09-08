import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/arxiv-logo.png';
import '../styles/Navbar.css';

export default function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/">
                <img src={Logo} width="100px" alt="Logo" />
            </Link>
            <ul className="navbar--items">
                <li><Link to="/browse">Browse</Link></li>
                <li><Link to="/recent">Recent</Link></li>
                <li><Link to="/submit">Submit</Link></li>
                <li><Link to="/aboutus">About Us</Link></li>
            </ul>
            <div className="navbar--auth">
                <Link to="/signin">
                    <button className="button-27" role="button">Sign In</button>
                </Link>
                <Link to="/signup">
                    <button className="button-28" role="button">Sign Up</button>
                </Link>
            </div>
        </nav>
    );
}
