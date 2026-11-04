package com.KisanUnnatiBackend.dto;

import java.util.List;

public class PredictionDTO {
    private String clazz;
    private double confidence;
    private String risk;
    private String organic_treatment;
    private String chemical_treatment;
    private String estimated_loss;
    private List<String> resources;

    // Getters & Setters
    public String getClazz() { return clazz; }
    public void setClazz(String clazz) { this.clazz = clazz; }

    public double getConfidence() { return confidence; }
    public void setConfidence(double confidence) { this.confidence = confidence; }

    public String getRisk() { return risk; }
    public void setRisk(String risk) { this.risk = risk; }

    public String getOrganic_treatment() { return organic_treatment; }
    public void setOrganic_treatment(String organic_treatment) { this.organic_treatment = organic_treatment; }

    public String getChemical_treatment() { return chemical_treatment; }
    public void setChemical_treatment(String chemical_treatment) { this.chemical_treatment = chemical_treatment; }

    public String getEstimated_loss() { return estimated_loss; }
    public void setEstimated_loss(String estimated_loss) { this.estimated_loss = estimated_loss; }

    public List<String> getResources() { return resources; }
    public void setResources(List<String> resources) { this.resources = resources; }
}
