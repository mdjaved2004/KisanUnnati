package com.KisanUnnatiBackend.dto;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class AddCategoryDTO {
	
 @Size(min=2, max =30, message = "Category must be between 2 and 30 characters")
 @Pattern(regexp = "[A-Za-z0-9 ()]+$", message = "Enter a valid Category name")
 private String category;
 
}
