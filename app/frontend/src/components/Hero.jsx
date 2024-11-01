// Hero.jsx
import { Search, BookOpen, Stars, ThumbsUp, Users } from "lucide-react";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Hero.css';
import YK from '../images/yk.png';
import AJ from '../images/ja.png';
import PK from '../images/pk.png';
import MK from '../images/mk.png';

export default function HeroSection() {
  const navigate = useNavigate();
  const [recentSubjectPapers, setRecentSubjectPapers] = useState([]);
  const [lastBrowsedSubject, setLastBrowsedSubject] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const categoryDisplayMap = {
    "physics": "Physics",
    "computer-science": "Computer Science",
    "economics": "Economics",
    "electrical": "Electrical Engineering and Systems Science",
    "mathematics": "Mathematics",
    "biology": "Quantitative Biology",
    "quantitative-finance": "Quantitative Finance",
    "statistics": "Statistics"
  };

  useEffect(() => {
    const subject = localStorage.getItem('lastBrowsedSubject');
    setLastBrowsedSubject(subject || '');

    if (subject) {
      fetch(`http://localhost:8000/findpaper?category=${subject}`)
        .then(response => response.json())
        .then(data => setRecentSubjectPapers(data.papers || []))
        .catch(console.error);
    }
  }, []);

  const handleNext = () => {
    if (currentIndex < recentSubjectPapers.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div>
      <div className="hero-section grey-bg">
        <h1>Empowering Researchers to Publish and Discover</h1>
        <p>A modern platform for sharing and exploring cutting-edge scientific research.</p>
        <button className="btn-get-started" onClick={() => navigate('/browse')}>Get Started</button>
        <button className="btn-learn-more" onClick={() => navigate('/aboutus')}>Learn More</button>
      </div>

      {lastBrowsedSubject && recentSubjectPapers.length > 0 && (
        <div className="carousel-section white-bg left-aligned">
          <h1>Because you recently searched for papers in {categoryDisplayMap[lastBrowsedSubject] || lastBrowsedSubject}</h1>
          <div className="carousel">
            <div className="carousel-card">
              <h3 onClick={() => navigate(`/paper/${recentSubjectPapers[currentIndex].id}`)}>
                {recentSubjectPapers[currentIndex].title}
              </h3>
              <p><strong>Authors:</strong> {recentSubjectPapers[currentIndex].authors}</p>
              <p><strong>Abstract:</strong> {recentSubjectPapers[currentIndex].description}</p>
              <p><strong>Submitted on:</strong> {new Date(recentSubjectPapers[currentIndex].created_at).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="carousel-controls">
            <button 
              className={`carousel-arrow ${currentIndex === 0 ? 'disabled' : ''}`} 
              onClick={handlePrev} 
              disabled={currentIndex === 0}
            >
              &lt;
            </button>
            <button 
              className={`carousel-arrow ${currentIndex === recentSubjectPapers.length - 1 ? 'disabled' : ''}`} 
              onClick={handleNext} 
              disabled={currentIndex === recentSubjectPapers.length - 1}
            >
              &gt;
            </button>
          </div>
        </div>
      )}

      <div className="hero-section grey-bg margin-imp">
        <h1>About Project arXiv</h1>
        <p>
          Project arXiv is a community-centric platform designed to make scientific research more accessible and collaborative. Our goal is to provide researchers with powerful tools to publish, discover, and engage with cutting-edge work across various disciplines.
        </p>
      </div>

      <div className="hero-section white-bg left-aligned margin-imp">
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
            <ThumbsUp size={50}/>
            <h3>Paper Recommendations</h3>
            <p>Get tailored research suggestions based on your interests and past searches.</p>
          </div>
          <div className="feature-item">
            <Stars size={50}/>
            <h3>Interactive Paper Summaries and Q&A</h3>
            <p>Generate concise summaries of research papers and interact with an AI chatbot to ask specific questions about the content.</p>
          </div>
        </div>
      </div>

      <div className="hero-section grey-bg left-aligned margin-imp">
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
