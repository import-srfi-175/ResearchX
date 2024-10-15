import React from 'react';
import { Search, BookOpen, Users } from "lucide-react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../styles/Hero.css';
import YK from '../images/yk.png';
import AJ from '../images/ja.png';
import PK from '../images/pk.png';
import MK from '../images/mk.png';

export default function HeroSection() {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div>
      <div className="hero-section grey-bg">
        <h1>Empowering Researchers to Publish and Discover</h1>
        <p>A modern platform for sharing and exploring cutting-edge scientific research.</p>
        <button className="btn-get-started" onClick={() => navigate('/browse')}>Get Started</button>
        <button className="btn-learn-more" onClick={() => navigate('/aboutus')}>Learn More</button>
      </div>
      <div className="hero-section white-bg left-aligned margin-imp">
        <h1>About Project arXiv</h1>
        <p>
          Project arXiv is a community-centric platform designed to make scientific research more accessible and collaborative. Our goal is to provide researchers with powerful tools to publish, discover, and engage with cutting-edge work across various disciplines.
        </p>
      </div>
      <div className="hero-section grey-bg left-aligned margin-imp">
        <h1>Key Features</h1>
        <div className="features">
          <div className="feature-item">
            <Search size={50}/>
            <h3>Comprehensive Search</h3>
            <p>Powerful search functionality to find relevant research quickly and easily.</p>
          </div>
          <div className="feature-item">
            <BookOpen size={50}/>
            <h3>Easy Submission</h3>
            <p>Streamlined process for submitting and publishing your research papers.</p>
          </div>
          <div className="feature-item">
            <Users size={50}/>
            <h3>Collaboration Tools</h3>
            <p>Connect with other researchers and collaborate on projects seamlessly.</p>
          </div>
        </div>
      </div>
      <div className="hero-section white-bg left-aligned margin-imp">
        <h1>Our Team</h1>
        <div className="team-members">
          <div className="team-member">
            <img src={YK} alt="Yash Kambli" />
            <p>Yash Kambli</p>
          </div>
          <div className="team-member">
            <img src={PK} alt="Prathamesh Khachane" />
            <p>Prathamesh Khachane</p>
          </div>
          <div className="team-member">
            <img src={AJ} alt="Atharva Jagtap" />
            <p>Atharva Jagtap</p>
          </div>
          <div className="team-member">
            <img src={MK} alt="Mohit Kasliwal" />
            <p>Mohit Kasliwal</p>
          </div>
        </div>
      </div>
    </div>
  );
}
