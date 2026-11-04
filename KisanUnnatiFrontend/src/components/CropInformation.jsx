import React, { useState, useMemo } from 'react';
import './CropInformation.css'; // New CSS file for this component

// --- SVG Icon Components ---
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="info-search-icon" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>;
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="detail-icon" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm-.707 10.607a1 1 0 010-1.414l.707-.707a1 1 0 111.414 1.414l-.707.707a1 1 0 01-1.414 0zM3 11a1 1 0 100-2H2a1 1 0 100 2h1z" clipRule="evenodd" /></svg>;

// --- Comprehensive Crop Data (Ready for Backend) ---
const cropDatabase = [
    { id: 1, name: 'Wheat (Gehu)', sowing: 'Oct-Dec', harvesting: 'Mar-May', climate: 'Cool, dry winters & hot summers', soil: 'Well-drained loamy soil', imageUrl: 'https://images.pexels.com/photos/1756062/pexels-photo-1756062.jpeg' },
    { id: 2, name: 'Soybean', sowing: 'Jun-Jul', harvesting: 'Sep-Oct', climate: 'Warm and moist', soil: 'Sandy loam to clay soil', imageUrl: 'https://images.pexels.com/photos/4518601/pexels-photo-4518601.jpeg' },
    { id: 3, name: 'Cotton (Kapas)', sowing: 'Apr-May', harvesting: 'Oct-Dec', climate: 'Hot and humid', soil: 'Black cotton soil', imageUrl: 'https://images.pexels.com/photos/3158017/pexels-photo-3158017.jpeg   ' },
    { id: 4, name: 'Gram (Chana)', sowing: 'Oct-Nov', harvesting: 'Feb-Mar', climate: 'Cool and dry', soil: 'Light to heavy soil', imageUrl: 'https://images.pexels.com/photos/10111952/pexels-photo-10111952.jpeg  ' },
    { id: 5, name: 'Maize (Makka)', sowing: 'Jun-Jul', harvesting: 'Sep-Oct', climate: 'Warm and sunny', soil: 'Well-drained loamy soil', imageUrl: 'https://images.pexels.com/photos/547264/pexels-photo-547264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 6, name: 'Maize (Makka)', sowing: 'Jun-Jul', harvesting: 'Sep-Oct', climate: 'Warm and sunny', soil: 'Well-drained loamy soil', imageUrl: 'https://images.pexels.com/photos/547264/pexels-photo-547264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
];

const CropInformation = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCrops = useMemo(() => {
        return cropDatabase.filter(crop =>
            crop.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <section className="crop-info-section">
            <div className="container">
                <div className="info-section-header">
                    <h2>Information of Crops</h2>
                    <p>Your complete guide to crop cultivation, from sowing to harvesting.</p>
                    <div className="info-search-wrapper">
                        <SearchIcon />
                        <input
                            type="text"
                            placeholder="Search for a crop (e.g., Wheat, Soybean...)"
                            className="info-search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="crop-info-grid">
                    {filteredCrops.map(crop => (
                        <div key={crop.id} className="info-card">
                            <div className="info-card-image-container">
                                <img src={crop.imageUrl} alt={crop.name} className="info-card-image" />
                            </div>
                            <div className="info-card-content">
                                <h3 className="info-crop-name">{crop.name}</h3>
                                <div className="crop-details">
                                    <div className="detail-item">
                                        <strong>Sowing Time:</strong>
                                        <span>{crop.sowing}</span>
                                    </div>
                                    <div className="detail-item">
                                        <strong>Harvesting Period:</strong>
                                        <span>{crop.harvesting}</span>
                                    </div>
                                    <div className="detail-item">
                                        <SunIcon />
                                        <div>
                                            <strong>Climate:</strong>
                                            <span>{crop.climate}</span>
                                        </div>
                                    </div>
                                    <div className="detail-item">
                                        <strong>Best Soil:</strong>
                                        <span>{crop.soil}</span>
                                    </div>
                                </div>
                                <div className="info-card-actions">
                                    <button className="btn btn-read-more">Read Full Guide</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CropInformation;
