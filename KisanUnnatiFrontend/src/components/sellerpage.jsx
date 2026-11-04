// import React, { useState } from 'react';
// import './SellerPage.css';
// import { useNavigate} from 'react-router-dom';

// // --- SVG Icon Components ---
// const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="upload-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
// const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="input-icon" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>;
// const PriceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="input-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M8.433 7.418c.158-.103.346-.196.567-.267v1.698a2.5 2.5 0 00-1.134 0v-1.432zM11.567 7.151c.22.071.409.164.567.267v1.432a2.5 2.5 0 00-1.134 0V7.151zM10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.5 4.5 0 00-1.831 6.416v.492a1 1 0 102 0v-.517a4.5 4.5 0 001.83-6.393V5z" /></svg>;
// const LeafIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="input-icon" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M15.146 2.146a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-10 10a.5.5 0 01-.168.11l-5 2a.5.5 0 01-.65-.65l2-5a.5.5 0 01.11-.168l10-10zM16 5l-2-2-8.5 8.5.5.5 2 2L16 5z" clipRule="evenodd" /></svg>;
// const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="input-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-.774a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>;
// const AddressIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="input-icon" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>;
// const QuantityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="input-icon" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 8a3 3 0 016 0v1h1a2 2 0 012 2v5a2 2 0 01-2 2H3a2 2 0 01-2-2v-5a2 2 0 012-2h1V8zm3 0V7a2 2 0 10-4 0v1h4zm-3 3a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" /></svg>;



// const SellerPage = ({ onBack, onAddCrop }) => {
//     const navigate = useNavigate();
// if(localStorage.username){
//     console.log("user is logged in already .....");
// }
// else{
//     navigate("/login");
// }
//     const [formData, setFormData] = useState({ cropName: '', sellerName: '', price: '', quantity: '', contactNumber: '', address: '', description: '', cropImage: null });
//     const [errors, setErrors] = useState({});
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [imagePreview, setImagePreview] = useState(null);

//     const handleChange = (e) => {
//         const { id, value } = e.target;
//         setFormData({ ...formData, [id]: value });
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setFormData({ ...formData, cropImage: file });
//             setImagePreview(URL.createObjectURL(file));
//         }
//     };

//     const validateForm = () => {
//         let formErrors = {};
//         if (!formData.cropName) formErrors.cropName = "Crop name is required.";
//         if (!formData.sellerName) formErrors.sellerName = "Your name is required.";
//         if (!formData.price) formErrors.price = "Price is required.";
//         if (!formData.quantity) formErrors.quantity = "Quantity is required.";
//         if (!formData.contactNumber) formErrors.contactNumber = "Contact number is required.";
//         if (!formData.address) formErrors.address = "Address is required.";
//         if (!formData.cropImage) formErrors.cropImage = "An image of the crop is required.";
//         return formErrors;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const formErrors = validateForm();
//         setErrors(formErrors);

//         if (Object.keys(formErrors).length === 0) {
//             setIsSubmitting(true);
            
//             console.log("Submitting data:", { ...formData, imagePreview });
//             // In a real app, you'd upload formData.cropImage and get a URL
//             // For now, we use the local preview URL
//             onAddCrop({ ...formData, imagePreview });
//         }
//     };

//     return (
//         <section className="seller-page-section">
//             <div className="container">
//                 <div className="seller-form-container">
//                     <div className="seller-form-header">
//                         <h2>List Your Crop</h2>
//                         <p>Fill out the form below to add your crop to your listings.</p>
//                     </div>
//                     <form className="seller-form" onSubmit={handleSubmit} noValidate>
//                         {/* Form fields remain the same as previous version */}
//                         <div className="form-grid">
//                             <div className="form-group full-width">
//                                 <label>Crop Image</label>
//                                 <div className={`image-upload-wrapper ${errors.cropImage ? 'error' : ''}`}>
//                                     <input type="file" id="cropImage" accept="image/*" onChange={handleImageChange} />
//                                     <label htmlFor="cropImage" className="image-upload-label">
//                                         {imagePreview ? <img src={imagePreview} alt="Crop preview" className="image-preview" /> : (
//                                             <div className="upload-placeholder">
//                                                 <UploadIcon />
//                                                 <span>Click to upload an image</span>
//                                                 <small>PNG, JPG up to 5MB</small>
//                                             </div>
//                                         )}
//                                     </label>
//                                 </div>
//                                 {errors.cropImage && <span className="error-text">{errors.cropImage}</span>}
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="cropName">Crop Name</label>
//                                 <div className="input-wrapper"><LeafIcon /><input type="text" id="cropName" value={formData.cropName} onChange={handleChange} className={errors.cropName ? 'error' : ''} placeholder="e.g., Organic Wheat" /></div>
//                                 {errors.cropName && <span className="error-text">{errors.cropName}</span>}
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="sellerName">Your Name</label>
//                                 <div className="input-wrapper"><UserIcon /><input type="text" id="sellerName" value={formData.sellerName} onChange={handleChange} className={errors.sellerName ? 'error' : ''} placeholder="e.g., Ram Kumar" /></div>
//                                 {errors.sellerName && <span className="error-text">{errors.sellerName}</span>}
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="price">Price (per kg)</label>
//                                 <div className="input-wrapper"><PriceIcon /><input type="number" id="price" value={formData.price} onChange={handleChange} className={errors.price ? 'error' : ''} placeholder="e.g., 25" /></div>
//                                 {errors.price && <span className="error-text">{errors.price}</span>}
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="quantity">Available Quantity (in kg)</label>
//                                 <div className="input-wrapper"><QuantityIcon /><input type="number" id="quantity" value={formData.quantity} onChange={handleChange} className={errors.quantity ? 'error' : ''} placeholder="e.g., 500" /></div>
//                                 {errors.quantity && <span className="error-text">{errors.quantity}</span>}
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="contactNumber">Contact Number</label>
//                                 <div className="input-wrapper"><PhoneIcon /><input type="tel" id="contactNumber" value={formData.contactNumber} onChange={handleChange} className={errors.contactNumber ? 'error' : ''} placeholder="e.g., 9876543210" /></div>
//                                 {errors.contactNumber && <span className="error-text">{errors.contactNumber}</span>}
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="address">Address / Village</label>
//                                 <div className="input-wrapper"><AddressIcon /><input type="text" id="address" value={formData.address} onChange={handleChange} className={errors.address ? 'error' : ''} placeholder="e.g., Indore, M.P." /></div>
//                                 {errors.address && <span className="error-text">{errors.address}</span>}
//                             </div>
//                             <div className="form-group full-width">
//                                 <label htmlFor="description">Description (Optional)</label>
//                                 <textarea id="description" rows="4" value={formData.description} onChange={handleChange} placeholder="Describe your crop..."></textarea>
//                             </div>
//                         </div>
//                         <div className="form-actions">
//                             <button type="button" className="btn btn-discard" onClick={onBack}>Cancel</button>
//                             <button type="submit" className="btn btn-submit" disabled={isSubmitting}>
//                                 {isSubmitting ? 'Submitting...' : 'List My Crop'}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default SellerPage;






import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SellerPage.css"; // keep your previous CSS file

const SellerPage = () => {
  const navigate = useNavigate();

  // --- State for user and crop data ---
  const [userData, setUserData] = useState({
    userName: "",
    userPhone: "",
    userAddress: "",
    userCity: "",
    userDistrict: "",
    userState: "",
  });

  const [cropData, setCropData] = useState({
    cropName: "",
    cropDescription: "",
    cropQuantity: "",
    cropPrice: "",
    cropCategory: "",
    image_input: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // --- Load user info on mount ---
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (!storedUser) {
      alert("Please login before selling crops.");
      navigate("/login");
      return;
    }

    setUserData({
      userName: storedUser.userName || "",
      userPhone: storedUser.userPhone || "",
      userAddress: storedUser.userAddress || "",
      userCity: storedUser.userCity || "",
      userDistrict: storedUser.userDistrict || "",
      userState: storedUser.userState || "",
      userEmail: storedUser.userEmail || "",
    });
  }, [navigate]);

  // --- Handle crop form changes ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCropData((prev) => ({ ...prev, [name]: value }));
  };

  // --- Handle file upload ---
  const handleFileChange = (e) => {
    setCropData((prev) => ({ ...prev, image_input: e.target.files[0] }));
  };

  // --- Submit form ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.userName) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    // const formData = new FormData();
    // Object.entries(cropData).forEach(([key, value]) => formData.append(key, value));
    // Object.entries(userData).forEach(([key, value]) => formData.append(key, value));

    const formData = new FormData();

formData.append("cropName", cropData.cropName);
formData.append("description", cropData.cropDescription);
formData.append("price", cropData.cropPrice);
formData.append("quantity", cropData.cropQuantity);
formData.append("sellerName", userData.userName);
formData.append("sellerEmail", userData.userEmail);
formData.append("contactNumber", userData.userPhone);
formData.append("address", userData.userAddress);
formData.append("image_input", cropData.image_input);
formData.append("cropCategory", cropData.cropCategory);


    try {
      setIsSubmitting(true);
      const response = await axios.post(
        "http://localhost:8080/api/crops/addNewCropForSelling",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      console.log("Crop submitted successfully:", response.data);
      setSuccess(true);
      setCropData({
        cropName: "",
        cropDescription: "",
        cropQuantity: "",
        cropPrice: "",
        cropCategory: "",
        image_input: null,
      });
    } catch (error) {
      console.error("Error while submitting crop:", error);
      alert("Error submitting crop. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <section className="seller-page-section">
        <div className="seller-form-container success-message">
          <h3>Crop Submitted Successfully!</h3>
          <p>Your crop listing has been added successfully.</p>
          <button
            className="btn-submit"
            onClick={() => {
              setSuccess(false);
              navigate("/buycrops");
            }}
          >
            Go to Buy Crops
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="seller-page-section">
      <div className="seller-form-container">
        <div className="seller-form-header">
          <h2>Sell Your Crop</h2>
          <p>List your crops for buyers to view and purchase</p>
        </div>

        <form className="seller-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Crop Name */}
            <div className="form-group">
              <label>Crop Name</label>
              <input
                type="text"
                name="cropName"
                value={cropData.cropName}
                onChange={handleChange}
                placeholder="Enter crop name"
                required
              />
            </div>

            {/* Crop Category */}
            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                name="cropCategory"
                value={cropData.cropCategory}
                onChange={handleChange}
                placeholder="e.g., grains, fruits, vegetables"
                required
              />
            </div>

            {/* Quantity */}
            <div className="form-group">
              <label>Quantity (kg)</label>
              <input
                type="number"
                name="cropQuantity"
                value={cropData.cropQuantity}
                onChange={handleChange}
                required
              />
            </div>

            {/* Price */}
            <div className="form-group">
              <label>Price (₹ per kg)</label>
              <input
                type="number"
                name="cropPrice"
                value={cropData.cropPrice}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                name="cropDescription"
                value={cropData.cropDescription}
                onChange={handleChange}
                placeholder="Write a short description about your crop..."
                required
              />
            </div>

            {/* Image Upload */}
            <div className="form-group full-width image-upload-wrapper">
              <label htmlFor="image_input" className="image-upload-label">
                {cropData.image_input ? (
                  <img
                    src={URL.createObjectURL(cropData.image_input)}
                    alt="Preview"
                    className="image-preview"
                  />
                ) : (
                  <div className="upload-placeholder">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="upload-icon"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5v-9m0 0l3 3m-3-3l-3 3m9 6v1.125A2.625 2.625 0 0115.375 21H8.625A2.625 2.625 0 016 18.375V17.25"
                      />
                    </svg>
                    <span>Click to Upload Image</span>
                  </div>
                )}
              </label>
              <input
                id="image_input"
                type="file"
                name="image_input"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            {/* Seller Info */}
            <div className="form-group full-width">
              <label>Seller Name</label>
              <input type="text" value={userData.userName} readOnly />
            </div>
            <div className="form-group full-width">
              <label>Seller email</label>
              <input type="text" value={userData.userEmail} readOnly />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input type="text" value={userData.userPhone} readOnly />
            </div>

            <div className="form-group">
              <label>State</label>
              <input type="text" value={userData.userState} readOnly />
            </div>

            <div className="form-group">
              <label>District</label>
              <input type="text" value={userData.userDistrict} readOnly />
            </div>

            <div className="form-group">
              <label>City</label>
              <input type="text" value={userData.userCity} readOnly />
            </div>

            <div className="form-group full-width">
              <label>Address</label>
              <textarea value={userData.userAddress} readOnly />
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-discard"
              onClick={() =>
                setCropData({
                  cropName: "",
                  cropDescription: "",
                  cropQuantity: "",
                  cropPrice: "",
                  cropCategory: "",
                  image_input: null,
                })
              }
            >
              Discard
            </button>

            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SellerPage;
