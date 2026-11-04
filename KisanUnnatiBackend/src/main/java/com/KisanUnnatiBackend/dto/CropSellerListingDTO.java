package com.KisanUnnatiBackend.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class CropSellerListingDTO {
	 	@NotBlank(message = "Crop name is required")
	    @Size(max = 100, message = "Crop name must be less than 100 characters")
	    private String cropName;
        
	 	@NotBlank(message = "CropCategory name is required")
	 	private String cropCategory;
	 	
	    @NotBlank(message = "Seller name is required")
	    @Size(max = 50, message = "Seller name must be less than 50 characters")
	    private String sellerName;

	    @NotBlank(message = "Seller email is required")
	    private String sellerEmail;

	    @NotNull(message = "Price is required")
	    @Positive(message = "Price must be greater than zero")
	    private Double price;

	    @NotNull(message = "Quantity is required")
	    @PositiveOrZero(message = "Quantity must be zero or more")
	    private Double quantity;

	    @NotBlank(message = "Contact number is required")
	    @Pattern(regexp = "^[0-9]{10}$", message = "Contact number must be 10 digits")
	    private String contactNumber;

	    @NotBlank(message = "Address is required")
	    @Size(max = 200, message = "Address must be less than 200 characters")
	    private String address;

	    @Size(max = 500, message = "Description must be less than 500 characters")
	    private String description;

}
