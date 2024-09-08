import React from 'react';
import '../styles/Hero.css'; // Ensure you create this CSS file for styling

const Hero = () => {
    return (
        <div className="hero">
            <div className="hero__item hero__item--gray">
                <div className="hero__text">
                    <h2>Revolutionize Your Research</h2>
                    <p>Discover groundbreaking research, collaborate with peers, and publish your work on our cutting-edge platform.</p>
                    <div className="hero__buttons">
                        <button className="button-27">Get Started</button>
                        <button className="button-28">Learn More</button>
                    </div>
                </div>
            </div>
            <div className="hero__item hero__item--gray">
                <div className="hero__text">
                    <h2>Streamlined Peer Review</h2>
                    <p>Our intuitive peer review system makes it easy to collaborate, provide feedback, and improve research quality.</p>
                    <div className="hero__buttons">
                        <button className="button-27">Learn More</button>
                        <button className="button-28">Get Reviewing</button>
                    </div>
                </div>
            </div>
            <div className="hero__item hero__item--gray">
                <div className="hero__text">
                    <h2>Collaborative Research</h2>
                    <p>Easily share your work, receive feedback, and collaborate with researchers around the world.</p>
                    <div className="hero__buttons">
                        <button className="button-27">Join a Project</button>
                        <button className="button-28">Start a Project</button>
                    </div>
                </div>
            </div>
            <div className="hero__item hero__item--gray">
                <div className="hero__text">
                    <h2>Discover Groundbreaking Research</h2>
                    <p>Explore our extensive library of peer-reviewed papers, filter by topic, and stay up-to-date with the latest discoveries.</p>
                    <div className="hero__buttons">
                        <button className="button-27">Browse Papers</button>
                        <button className="button-28">Featured Papers</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
