import React, { useState } from "react";
import "./GovernmentSchemes.css";

const schemesData = [
  {
    id: 1,
    name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    shortDesc: "₹6,000 annual income support to small and marginal farmers.",
    description:
      "The PM-KISAN scheme provides financial help to all small and marginal farmers in India. Every eligible farmer family receives ₹6,000 per year in three equal installments of ₹2,000 each. The amount is directly transferred to the farmer’s bank account. This helps farmers meet agricultural and household expenses without taking loans.",
    eligibility:
      "All small and marginal farmers who own cultivable land. Not applicable to institutional landholders or taxpayers with high income.",
    documents: [
      "Aadhaar Card",
      "Land Ownership Proof",
      "Bank Account Details",
      "Identity Proof",
    ],
    link: "https://pmkisan.gov.in/",
    startDate: "1 February 2019",
    endDate: "Ongoing",
  },
  {
    id: 2,
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    shortDesc: "Insurance scheme for crop loss due to natural disasters.",
    description:
      "PMFBY protects farmers against crop loss caused by natural calamities, pests, or diseases. Farmers pay a minimal premium (2% for Kharif, 1.5% for Rabi crops). The government covers the remaining premium, ensuring farmers are financially secure even after crop damage.",
    eligibility: "All farmers cultivating notified crops in notified areas.",
    documents: [
      "Aadhaar Card",
      "Land Record",
      "Bank Account",
      "Crop Sowing Certificate",
    ],
    link: "https://pmfby.gov.in/",
    startDate: "18 February 2016",
    endDate: "Ongoing",
  },
  {
    id: 3,
    name: "Soil Health Card Scheme",
    shortDesc: "Know your soil and increase productivity.",
    description:
      "This scheme helps farmers understand their soil condition by providing a Soil Health Card. The card mentions nutrient status and suggestions for fertilizers, ensuring efficient soil management and better crop yield.",
    eligibility: "All farmers across India can apply.",
    documents: ["Aadhaar Card", "Land Record / Ownership Proof"],
    link: "https://soilhealth.dac.gov.in/",
    startDate: "19 February 2015",
    endDate: "Ongoing",
  },
  {
    id: 4,
    name: "Kisan Credit Card (KCC)",
    shortDesc: "Quick and easy loan access for farmers at low interest rates.",
    description:
      "The Kisan Credit Card provides short-term credit to farmers for crop production, machinery, fertilizers, and other farming needs. The interest rate is around 4% per annum, making it affordable. It also covers post-harvest expenses.",
    eligibility: "All farmers involved in agricultural or allied activities.",
    documents: ["Aadhaar Card", "Land Record", "Bank Passbook", "PAN Card"],
    link: "https://www.myscheme.gov.in/schemes/kcc",
    startDate: "1998",
    endDate: "Ongoing",
  },
  {
    id: 5,
    name: "PM Kusum Yojana",
    shortDesc: "Encourages solar energy for irrigation and income generation.",
    description:
      "PM Kusum helps farmers install solar pumps and panels on their land. Farmers can use solar energy for irrigation and sell extra power to the grid, earning additional income while promoting green energy.",
    eligibility:
      "Farmers, cooperatives, and panchayats owning cultivable or barren land.",
    documents: ["Aadhaar Card", "Land Record", "Bank Account", "Electricity Bill"],
    link: "https://pmkusum.mnre.gov.in/",
    startDate: "8 March 2019",
    endDate: "Ongoing",
  },
];

const GovernmentSchemes = () => {
  const [selectedScheme, setSelectedScheme] = useState(null);

  return (
    <section className="schemes-section mt-[200px]">
      <div className="schemes-header">
        <h2>🌱 Government Schemes for Farmers</h2>
        <p>
          Discover the latest government programs that help farmers with
          financial support, insurance, and sustainable growth.
        </p>
      </div>

      <div className="schemes-grid">
        {schemesData.map((scheme) => (
          <div
            key={scheme.id}
            className="scheme-card"
            onClick={() => setSelectedScheme(scheme)}
          >
            <h3>{scheme.name}</h3>
            <p className="scheme-short">{scheme.shortDesc}</p>
            <p className="scheme-mini">
              <strong>Eligibility:</strong> {scheme.eligibility}
            </p>
            <p className="scheme-mini">
              <strong>Duration:</strong> {scheme.startDate} →{" "}
              {scheme.endDate}
            </p>
            <button className="view-btn">View Details</button>
          </div>
        ))}
      </div>

      {selectedScheme && (
        <div className="modal-overlay" onClick={() => setSelectedScheme(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedScheme.name}</h2>
            <p className="scheme-desc">{selectedScheme.description}</p>

            <div className="scheme-details">
              <p>
                <strong>Eligibility:</strong> {selectedScheme.eligibility}
              </p>
              <p>
                <strong>Documents Required:</strong>{" "}
                {selectedScheme.documents.join(", ")}
              </p>
              <p>
                <strong>Start Date:</strong> {selectedScheme.startDate}
              </p>
              <p>
                <strong>End Date:</strong> {selectedScheme.endDate}
              </p>
              <p>
                <strong>Official Link:</strong>{" "}
                <a
                  href={selectedScheme.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit Website
                </a>
              </p>
            </div>

            <button
              className="close-btn"
              onClick={() => setSelectedScheme(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default GovernmentSchemes;
