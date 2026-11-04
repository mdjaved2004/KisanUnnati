package com.KisanUnnatiBackend.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
public class LoginAdminDTO {
	
	@NotBlank(message = "Email is required")
	@Email(message = "Please enter a valid email address")
	@Size(min=6, max =35, message = "Email must be between 6 and 35 characters")
	@Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,63}$",
			  message = "Enter a valid email address")
	private String email;

	@Size(min = 6, max = 20, message = "Password must be between 6 and 20 characters")
	@NotBlank(message = "password is required")
	private String password;

}
