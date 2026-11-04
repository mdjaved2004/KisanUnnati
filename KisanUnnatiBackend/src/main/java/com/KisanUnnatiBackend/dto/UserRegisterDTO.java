package com.KisanUnnatiBackend.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class UserRegisterDTO {
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email")
    @Size(max = 100, message = "Email must be less than 100 characters")
    private String email;
    
    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^[6-9][0-9]{9}$", message = "Enter a valid 10-digit mobile number")
    private String mobileNumber;
    
    
    @NotBlank(message = "State is required")
    @Pattern(
    		regexp = "^(Andhra Pradesh|Arunachal Pradesh|Assam|Bihar|Chhattisgarh|Goa|Gujarat|Haryana|Himachal Pradesh|Jharkhand|Karnataka|Kerala|Madhya Pradesh|Maharashtra|Manipur|Meghalaya|Mizoram|Nagaland|Odisha|Punjab|Rajasthan|Sikkim|Tamil Nadu|Telangana|Tripura|Uttar Pradesh|Uttarakhand|West Bengal|Andaman and Nicobar Islands|Chandigarh|Dadra and Nagar Haveli and Daman and Diu|Delhi|Jammu and Kashmir|Ladakh|Lakshadweep|Puducherry)$",
    		message = "Invalid State selected"
    		)
    private String state;
    
    @NotBlank(message = "District is required")
    @Size(min = 2, max = 50, message = "District must be between 2 and 50 characters")
    @Pattern(regexp = "^[a-zA-Z ]+$", message = "District can contain only letters and spaces")
    private String district;

    @NotBlank(message = "City/Village is required")
    @Size(min = 2, max = 50, message = "City/Village must be between 2 and 50 characters")
    @Pattern(regexp = "^[a-zA-Z ]+$", message = "City/Village can contain only letters and spaces")
    private String cityVillage;

    @NotBlank(message = "Address is required")
    @Size(min = 5, max = 150, message = "Address must be between 5 and 150 characters")
    private String fullAddress;
    
    @NotBlank(message = "User Name is required")
    @Size(min = 3, max = 30, message = "User Name must be between 3 and 30 characters")
    @Pattern(regexp = "^[a-zA-Z0-9_@]+$", message = "User Name can contain only letters, numbers, and underscores")
    private String userName;


    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 20, message = "Password must be between 6 and 20 characters")
    private String password;

    @NotBlank(message = "Confirm Password is required")
    private String confirmPassword;
}
