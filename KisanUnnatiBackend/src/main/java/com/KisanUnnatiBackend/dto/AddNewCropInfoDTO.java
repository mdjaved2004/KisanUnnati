package com.KisanUnnatiBackend.dto;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.Data;


@Data
public class AddNewCropInfoDTO {
	
	@NotNull(message = "Category ID is required.")
	@Min(value = 1, message = "Category ID must be greater than 0.")
	private int categoryId;

	@NotBlank(message = "Crop name must not be blank.")
	@Size(max = 50, message = "Crop name must not exceed 50 characters.")
	@Pattern(
	    regexp = "^[A-Za-z0-9 ()]+$",
	    message = "Crop name can only contain letters, numbers, spaces, and parentheses."
	)
	private String cropName;

	@NotBlank(message = "State is required.")
	@Size(min = 2, max = 100, message = "State must be between 2 and 100 characters")
	private String state;

}
