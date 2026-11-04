import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Landingpage.css";

export default function HomePage() {
  const images = [
    "https://images.pexels.com/photos/51947/tuscany-grape-field-nature-51947.jpeg",
    "https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg",
    "https://images.pexels.com/photos/235925/pexels-photo-235925.jpeg",
    "https://images.pexels.com/photos/247616/pexels-photo-247616.jpeg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  // Slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div>
      
      {/* Hero Section with Slideshow */}
      <div
        className="hero"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      >
        <div className="overlay"></div>
        <div className="content">
          <div className="buttons">
            <button className="btn" onClick={()=>navigate('/findJob')}>Find Job</button>
            <button className="btn" onClick={()=>navigate('/wheather')}>Weather Alert</button>
            <button className="btn" onClick={()=>navigate('/cropdisease')}>Search Crop Diesases</button>
          </div>
          <p className="scroll-text">Scroll Down To Get More Information</p>
        </div>
      </div>
    </div>
  );
}
