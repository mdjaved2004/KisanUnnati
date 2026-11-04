import React, { useState } from 'react';
import './FarmerFeedback.css'; // New CSS file for this component

// --- SVG Arrow Icons ---
const PrevIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="nav-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>;
const NextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="nav-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;

// --- Backend-Ready Feedback Data ---
const feedbackData = [
    { name: 'Javed Mansoori', location: 'Indore, M.P.', feedback: 'This platform has changed how I sell my crops. The market insights are invaluable!', imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop' },
    { name: 'Prabhav Giriya', location: 'Ujjain, M.P.', feedback: 'The crop information guides are so helpful for planning my season. A fantastic resource for every farmer.', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop' },
    { name: 'Prakhar Shrivastava', location: 'Bhopal, M.P.', feedback: 'Connecting with buyers directly through the marketplace has increased my profits significantly.', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop' },
    { name: 'Nayan Dange', location: 'Dewas, M.P.', feedback: 'The demanding crops feature helped me decide what to plant next season. Truly innovative!', imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop' },
    { name: 'Navneet Geedkar', location: 'Ratlam, M.P.', feedback: 'A modern tool that every farmer in Madhya Pradesh should be using. It simplifies everything.', imageUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1740&auto=format&fit=crop' },
];

const FarmerFeedback = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : feedbackData.length - 1));
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex < feedbackData.length - 1 ? prevIndex + 1 : 0));
    };

    const getCardClass = (index) => {
        if (index === activeIndex) return 'active';
        if (index === (activeIndex - 1 + feedbackData.length) % feedbackData.length) return 'prev';
        if (index === (activeIndex + 1) % feedbackData.length) return 'next';
        return 'inactive';
    };

    return (
        <section className="farmer-feedback-section">
            <div className="container">
                <div className="feedback-header">
                    <h2>Farmer Feedback</h2>
                    <p>Hear what farmers across the region are saying about Kisan Unnati.</p>
                </div>
                <div className="feedback-carousel-wrapper">
                    <div className="feedback-carousel">
                        {feedbackData.map((item, index) => (
                            <div key={index} className={`feedback-card ${getCardClass(index)}`}>
                                <p className="feedback-text">"{item.feedback}"</p>
                                <div className="farmer-info">
                                    <img src={item.imageUrl} alt={item.name} className="farmer-image" />
                                    <div className="farmer-details">
                                        <span className="farmer-name">{item.name}</span>
                                        <span className="farmer-location">{item.location}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="carousel-nav prev-btn" onClick={handlePrev} aria-label="Previous feedback">
                        <PrevIcon />
                    </button>
                    <button className="carousel-nav next-btn" onClick={handleNext} aria-label="Next feedback">
                        <NextIcon />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FarmerFeedback;
