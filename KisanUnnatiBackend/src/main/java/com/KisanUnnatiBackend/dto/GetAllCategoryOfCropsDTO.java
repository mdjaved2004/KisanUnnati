package com.KisanUnnatiBackend.dto;

import lombok.Data;

@Data
public class GetAllCategoryOfCropsDTO {
    private int id;
    private String category;
    private boolean display;

    public GetAllCategoryOfCropsDTO(int id, String category, boolean display) {
        this.id = id;
        this.category = category;
        this.display = display;
    }
}

