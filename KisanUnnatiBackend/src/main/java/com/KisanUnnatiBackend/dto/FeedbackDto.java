package com.KisanUnnatiBackend.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class FeedbackDto {	
	@NotBlank(message = "Feedback cannot be empty")
	@Size(min = 5, max = 500, message = "Feedback must be between 5 and 500 characters")
	private String feedback;
	
	@Min(value = 1, message = "Rating must be at least 1")
	@Max(value = 5, message = "Rating cannot be more than 5")
	private int rating;
}
