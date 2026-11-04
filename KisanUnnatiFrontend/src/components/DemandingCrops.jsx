import React from 'react';
import './DemandingCrops.css'; // New CSS file for this component

// --- SVG Icon Components ---
const TrendUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="trend-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="info-icon" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>;

// Placeholder data for high-demand crops
const demandingCropsData = [
    { id: 1, name: 'Soybean', reason: 'High Export Demand', regions: 'Malwa, Nimar', trend: 'up', imageUrl: 'https://images.pexels.com/photos/4518599/pexels-photo-4518599.jpeg' },
    { id: 2, name: 'Tomato', reason: 'Seasonal Shortage', regions: 'Bhopal, Jabalpur', trend: 'up', imageUrl: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 3, name: 'Organic Wheat', reason: 'Increased Health Awareness', regions: 'Indore, Ujjain', trend: 'up', imageUrl: 'https://images.pexels.com/photos/158603/wheat-wheat-field-cereals-field-158603.jpeg' },
    { id: 4, name: 'Garlic', reason: 'High Market Price', regions: 'Mandsaur, Ratlam', trend: 'up', imageUrl: 'https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 5, name: 'Potato', reason: 'High Market Price', regions: 'Mandsaur, Ratlam', trend: 'up', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Patates.jpg' },
    { id: 6, name: 'Onion', reason: 'High Market Price', regions: 'Vidisha, Bhopal', trend: 'up', imageUrl: 'https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 7, name: 'Rice', reason: 'Increased Health Awareness', regions: 'Indore, Ujjain', trend: 'up', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbxwNttRk_7Znf4WIdQMWjIil4OWV6LPHhwQ&s' },
    { id: 8, name: 'Barley', reason: 'Increased Health Awareness', regions: 'Khandwa, Ujjain', trend: 'up', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBkLxjs6iXZ42CwM1A9CYFMGJRYDpqdFlqxQ&s' },
];

const DemandingCrops = () => {
    return (
        <section className="demanding-crops-section">
            <div className="container">
                <div className="section-header">
                    <h2>Trending Crops in High Demand</h2>
                    <p>Stay ahead of the market with real-time insights on the most profitable crops.</p>
                </div>
                <div className="demanding-crops-grid">
                    {demandingCropsData.map(crop => (
                        <div key={crop.id} className="demand-card">
                            <div className="demand-card-image-container">
                                <img src={crop.imageUrl} alt={crop.name} className="demand-card-image" />
                            </div>
                            <div className="demand-card-content">
                                <div className="demand-card-header">
                                    <h3 className="demand-crop-name">{crop.name}</h3>
                                    <div className="demand-reason-badge">{crop.reason}</div>
                                </div>
                                <p className="demand-crop-regions">
                                    <LocationIcon />
                                    Key Regions: <strong>{crop.regions}</strong>
                                </p>
                                <div className="demand-trend-visual">
                                    <TrendUpIcon />
                                    <span>Demand is Trending Up</span>
                                </div>
                                <div className="demand-card-actions">
                                    <button className="btn btn-analytics">View Market Analytics</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DemandingCrops;
