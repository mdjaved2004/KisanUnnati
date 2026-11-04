// import React, { useState, useMemo } from 'react';
// import './BuyCrops.css';

// // --- SVG Icon Components ---
// const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="filter-icon" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>;
// const CategoryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="filter-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>;
// const SortIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="filter-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" /></svg>;
// const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="info-icon" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>;
// const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="info-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>;
// const StarIcon = ({ isFilled }) => <svg xmlns="http://www.w3.org/2000/svg" className={`rating-star ${isFilled ? 'filled' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;

// // --- Expanded Data with Full Seller Details ---
// // const cropsData = [
// //     { id: 1, name: 'Organic Wheat', price: 25, unit: 'kg', quantity: 500, seller: { name: 'Ram Kumar', address: '123 Krishi Marg, Indore', phone: '9876543210' }, location: 'Indore, M.P.', category: 'grains', rating: 4.5, imageUrl: 'https://images.pexels.com/photos/54084/wheat-grain-agriculture-seed-54084.jpeg' },
// //     { id: 2, name: 'Fresh Soybeans', price: 40, unit: 'kg', quantity: 300, seller: { name: 'Sita Devi', address: '456 Anaj Mandi, Ujjain', phone: '9876543211' }, location: 'Ujjain, M.P.', category: 'pulses', rating: 4.8, imageUrl: 'https://images.pexels.com/photos/33501330/pexels-photo-33501330.jpeg' },
// //     { id: 3, name: 'Golden Corn', price: 20, unit: 'kg', quantity: 1000, seller: { name: 'Gopal Verma', address: '789 Farmhouse Lane, Bhopal', phone: '9876543212' }, location: 'Bhopal, M.P.', category: 'grains', rating: 4.2, imageUrl: 'https://images.pexels.com/photos/547264/pexels-photo-547264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
// //     { id: 4, name: 'Basmati Rice', price: 60, unit: 'kg', quantity: 800, seller: { name: 'Anita Sharma', address: '101 Rice Mill Rd, Dewas', phone: '9876543213' }, location: 'Dewas, M.P.', category: 'grains', rating: 4.9, imageUrl: 'https://images.pexels.com/photos/15879426/pexels-photo-15879426.jpeg' },
// //     { id: 7, name: 'Fresh Tomatoes', price: 30, unit: 'kg', quantity: 250, seller: { name: 'Sunita Bai', address: '212 Sabzi Bazaar, Bhopal', phone: '9876543214' }, location: 'Bhopal, M.P.', category: 'vegetables', rating: 4.4, imageUrl: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg' },
// //     { id: 8, name: 'Sweet Apples', price: 120, unit: 'kg', quantity: 150, seller: { name: 'Rajesh Tiwari', address: '333 Fruit Market, Indore', phone: '9876543215' }, location: 'Indore, M.P.', category: 'fruits', rating: 5.0, imageUrl: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
// // ];





// // Suppose your backend response is stored in `response`
// const backendData = response.data.buyingCropInfo;

// const baseImageUrl = "http://localhost:8080/assets/CropSellerListingImage/"; // adjust if needed

// const cropsData = backendData.map((item) => ({
//   id: item[0],
//   name: item[1],
//   price: item[5],
//   unit: "kg",
//   quantity: item[6],
//   seller: {
//     name: item[15],
//     address: item[10],
//     phone: item[13],
//   },
//   location: `${item[12]}, ${item[14]}`, // district, state
//   category: "grains", // optional static category
//   rating: 4.5, // optional default rating
//   imageUrl: `${baseImageUrl}${item[4]}`, // prepend image path
// }));

// console.log(cropsData);


// // --- Crop Details Modal Component ---
// const CropDetailsModal = ({ crop, onClose }) => {
//     if (!crop) return null;

//     return (
//         <div className="modal-overlay" onClick={onClose}>
//             <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//                 <button className="modal-close-btn" onClick={onClose}>&times;</button>
//                 <div className="modal-body">
//                     <div className="modal-image-container">
//                         <img src={crop.imageUrl} alt={crop.name} className="modal-image" />
//                     </div>
//                     <div className="modal-details-container">
//                         <h2 className="modal-title">{crop.name}</h2>
//                         <div className="modal-price-quantity">
//                             <div className="modal-price">₹{crop.price}<span>/{crop.unit}</span></div>
//                             <div className="modal-quantity"><strong>{crop.quantity} {crop.unit}</strong> available</div>
//                         </div>
//                         <div className="modal-seller-info">
//                             <h3 className="seller-title">Seller Information</h3>
//                             <p className="seller-detail"><strong>Name:</strong> {crop.seller.name}</p>
//                             <p className="seller-detail"><strong>Address:</strong> {crop.seller.address}, {crop.location}</p>
//                             <a href={`tel:${crop.seller.phone}`} className="contact-seller-btn">
//                                 <PhoneIcon /> Contact Seller ({crop.seller.phone})
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // --- Crop Card Component ---
// const CropCard = ({ crop, onCardClick }) => {
//     const renderStars = (rating) => {
//         return Array.from({ length: 5 }, (_, i) => (
//             <StarIcon key={i} isFilled={i < Math.round(rating)} />
//         ));
//     };

//     return (
//         <div className="crop-card" onClick={() => onCardClick(crop)}>
//             <div className="crop-image-container">
//                 <img src={crop.imageUrl} alt={crop.name} className="crop-image" onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/400x300/a0aec0/ffffff?text=${crop.name}`; }}/>
//                 <div className="image-overlay">
//                     <div className="crop-category-badge">{crop.category}</div>
//                 </div>
//             </div>
//             <div className="crop-card-content">
//                 <div className="crop-card-header">
//                     <h3 className="crop-name">{crop.name}</h3>
//                     <div className="crop-price-tag">₹{crop.price}<span>/{crop.unit}</span></div>
//                 </div>
//                 <div className="crop-rating">
//                     {renderStars(crop.rating)}
//                     <span>({crop.rating.toFixed(1)})</span>
//                 </div>
//                 <p className="crop-seller">Sold by: <strong>{crop.seller.name}</strong></p>
//                 <p className="crop-location">
//                     <LocationIcon /> {crop.location}
//                 </p>
//             </div>
//         </div>
//     );
// };

// // --- Main Component ---
// const BuyCrops = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [categoryFilter, setCategoryFilter] = useState('');
//     const [sortBy, setSortBy] = useState('');
//     const [selectedCrop, setSelectedCrop] = useState(null);

//     const processedCrops = useMemo(() => {
//         let filtered = cropsData.filter(crop => {
//             const matchesCategory = categoryFilter ? crop.category === categoryFilter : true;
//             const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) || crop.seller.name.toLowerCase().includes(searchTerm.toLowerCase());
//             return matchesCategory && matchesSearch;
//         });

//         if (sortBy === 'price-asc') {
//             filtered.sort((a, b) => a.price - b.price);
//         } else if (sortBy === 'price-desc') {
//             filtered.sort((a, b) => b.price - a.price);
//         } else if (sortBy === 'rating-desc') {
//             filtered.sort((a, b) => b.rating - a.rating);
//         }

//         return filtered;
//     }, [searchTerm, categoryFilter, sortBy]);

//     return (
//         <>
//             <section className="buy-crops-section">
//                 <div className="container">
//                     <div className="section-header">
//                         <h2 className="section-title">Explore the Marketplace</h2>
//                         <p className="section-description">
//                             Find the freshest produce directly from local farmers. Quality and community in every purchase.
//                         </p>
//                     </div>

//                     <div className="filter-bar">
//                         <div className="filter-input-wrapper">
//                             <SearchIcon />
//                             <input type="text" placeholder="Search crops or sellers..." className="marketplace-control" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
//                         </div>
//                         <div className="filter-input-wrapper">
//                             <CategoryIcon />
//                             <select className="marketplace-control" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
//                                 <option value="">All Categories</option>
//                                 <option value="grains">Grains</option>
//                                 <option value="pulses">Pulses</option>
//                                 <option value="vegetables">Vegetables</option>
//                                 <option value="fruits">Fruits</option>
//                             </select>
//                         </div>
//                         <div className="filter-input-wrapper">
//                             <SortIcon />
//                             <select className="marketplace-control" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//                                 <option value="">Sort By</option>
//                                 <option value="rating-desc">Rating</option>
//                                 <option value="price-asc">Price: Low to High</option>
//                                 <option value="price-desc">Price: High to Low</option>
//                             </select>
//                         </div>
//                     </div>

//                     <div className="crop-grid">
//                         {processedCrops.length > 0 ? (
//                             processedCrops.map(crop => <CropCard key={crop.id} crop={crop} onCardClick={setSelectedCrop} />)
//                         ) : (
//                             <div className="no-results-message">
//                                 <h3>No crops found</h3>
//                                 <p>Try adjusting your search or filter criteria.</p>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </section>
//             <CropDetailsModal crop={selectedCrop} onClose={() => setSelectedCrop(null)} />
//         </>
//     );
// };

// export default BuyCrops;


import React, { useState, useMemo, useEffect } from 'react';
import './BuyCrops.css';

// --- SVG Icons ---
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="filter-icon" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
  </svg>
);
const CategoryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="filter-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);
const SortIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="filter-icon" viewBox="0 0 20 20" fill="currentColor">
    <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
  </svg>
);
const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="info-icon" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="info-icon" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);
const StarIcon = ({ isFilled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`rating-star ${isFilled ? 'filled' : ''}`} viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// --- Modal Component ---
const CropDetailsModal = ({ crop, onClose }) => {
  if (!crop) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        <div className="modal-body">
          <div className="modal-image-container">
            <img src={crop.imageUrl} alt={crop.name} className="modal-image" />
          </div>
          <div className="modal-details-container">
            <h2 className="modal-title">{crop.name}</h2>
            <div className="modal-price-quantity">
              <div className="modal-price">₹{crop.price}<span>/{crop.unit}</span></div>
              <div className="modal-quantity"><strong>{crop.quantity} {crop.unit}</strong> available</div>
            </div>
            <div className="modal-seller-info">
              <h3 className="seller-title">Seller Information</h3>
              <p className="seller-detail"><strong>Name:</strong> {crop.seller.name}</p>
              <p className="seller-detail"><strong>Address:</strong> {crop.seller.address}, {crop.location}</p>
              <a href={`tel:${crop.seller.phone}`} className="contact-seller-btn">
                <PhoneIcon /> Contact Seller ({crop.seller.phone})
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Card Component ---
const CropCard = ({ crop, onCardClick }) => {
  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => <StarIcon key={i} isFilled={i < Math.round(rating)} />);

  return (
    <div className="crop-card" onClick={() => onCardClick(crop)}>
      <div className="crop-image-container">
        <img
          src={crop.imageUrl}
          alt={crop.name}
          className="crop-image"
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/a0aec0/ffffff?text=${crop.name}`; }}
        />
        <div className="image-overlay">
          <div className="crop-category-badge">{crop.category}</div>
        </div>
      </div>
      <div className="crop-card-content">
        <div className="crop-card-header">
          <h3 className="crop-name">{crop.name}</h3>
          <div className="crop-price-tag">₹{crop.price}<span>/{crop.unit}</span></div>
        </div>
        <div className="crop-rating">
          {renderStars(crop.rating)}
          <span>({crop.rating.toFixed(1)})</span>
        </div>
        <p className="crop-seller">Sold by: <strong>{crop.seller.name}</strong></p>
        <p className="crop-location"><LocationIcon /> {crop.location}</p>
      </div>
    </div>
  );
};

// --- Main Component ---
const BuyCrops = () => {
  const [cropData, setCropData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [selectedCrop, setSelectedCrop] = useState(null);

  const baseImageUrl = "http://localhost:8080/assets/CropSellerListingImage/";

  // --- Initialize from localStorage & listen for events ---
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("latestCropData") || "[]");
    if (savedData.length) {
      const formatted = savedData.map(item => ({
        id: item[0],
        name: item[1],
        price: Number(item[5] || 0),
        unit: "kg",
        quantity: Number(item[6] || 0),
        seller: {
          name: item[15] || "Unknown",
          address: item[10] || "",
          phone: item[13] || "",
        },
        location: `${item[12] || ""}, ${item[14] || ""}`,
        category: "grains",
        rating: 4.5,
        imageUrl: `${baseImageUrl}${item[4] || ""}`,
      }));
      setCropData(formatted);
    }

    const handleCropUpdate = (event) => {
      const backendData = event.detail?.buyingCropInfo || [];
      const formatted = backendData.map(item => ({
        id: item[0],
        name: item[1],
        price: Number(item[5] || 0),
        unit: "kg",
        quantity: Number(item[6] || 0),
        seller: {
          name: item[15] || "Unknown",
          address: item[10] || "",
          phone: item[13] || "",
        },
        location: `${item[12] || ""}, ${item[14] || ""}`,
        category: "grains",
        rating: 4.5,
        imageUrl: `${baseImageUrl}${item[4] || ""}`,
      }));
      setCropData(formatted);
    };

    window.addEventListener("updateCropData", handleCropUpdate);
    return () => window.removeEventListener("updateCropData", handleCropUpdate);
  }, []);

  // --- Filter & Sort ---
  const processedCrops = useMemo(() => {
    let filtered = cropData.filter(crop => {
      const matchesCategory = categoryFilter ? crop.category === categoryFilter : true;
      const matchesSearch =
        crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crop.seller.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating-desc') filtered.sort((a, b) => b.rating - a.rating);

    return filtered;
  }, [cropData, searchTerm, categoryFilter, sortBy]);

  return (
    <>
      <section className="buy-crops-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Explore the Marketplace</h2>
            <p className="section-description">
              Find the freshest produce directly from local farmers. Quality and community in every purchase.
            </p>
          </div>

          <div className="filter-bar">
            <div className="filter-input-wrapper">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search crops or sellers..."
                className="marketplace-control"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-input-wrapper">
              <CategoryIcon />
              <select
                className="marketplace-control"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="grains">Grains</option>
                <option value="pulses">Pulses</option>
                <option value="vegetables">Vegetables</option>
                <option value="fruits">Fruits</option>
              </select>
            </div>
            <div className="filter-input-wrapper">
              <SortIcon />
              <select
                className="marketplace-control"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="rating-desc">Rating</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="crop-grid">
            {processedCrops.length > 0 ? (
              processedCrops.map(crop => (
                <CropCard key={crop.id} crop={crop} onCardClick={setSelectedCrop} />
              ))
            ) : (
              <div className="no-results-message">
                <h3>No crops found</h3>
                <p>Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <CropDetailsModal crop={selectedCrop} onClose={() => setSelectedCrop(null)} />
    </>
  );
};

export default BuyCrops;
