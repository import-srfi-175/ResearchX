import React from 'react';
import Navbar from './Navbar'; 
import Footer from './Footer'; 
import '../styles/AboutUs.css'; 

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <div className="aboutus-container">
        <h1>About Us</h1>
        <p>Welcome to the Project arXiv Platform!</p>
        <p>
          Our platform is designed to revolutionize how researchers publish, collaborate,
          and discover groundbreaking work. We aim to foster collaboration, enhance 
          the peer review process, and make research more accessible to all.
        </p>
        <p>
          Whether you're a seasoned researcher or just starting out, our platform provides
          all the tools you need to collaborate and succeed.
        </p>
      </div>
      <Footer />
    </>
  );
}
