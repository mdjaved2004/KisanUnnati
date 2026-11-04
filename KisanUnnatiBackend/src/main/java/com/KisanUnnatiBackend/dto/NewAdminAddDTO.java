package com.KisanUnnatiBackend.dto;


import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
public class NewAdminAddDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "Admin name is required")
    @Size(min = 3, max = 40, message = "Admin name must be between 3 and 40 characters")
    private String name;

    @NotBlank(message = "Admin email is required")
    @Email(message = "Invalid email format")
    @Size(min = 6, max = 35, message = "Email must be between 6 and 35 characters")
    @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,63}$",
    		 message = "Enter a valid email address")
    private String email;


    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 35, message = "Password must be between 6 and 35 characters")
    private String password;
    
    
    
    @Min(value = 1, message = "Position must be at least 1")
    @Max(value = 5, message = "Position must not be greater than 5")
    private int position;
}

