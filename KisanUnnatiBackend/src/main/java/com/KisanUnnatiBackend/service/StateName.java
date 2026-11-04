package com.KisanUnnatiBackend.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class StateName {

    public static List<String> getAllStates() {
        return Arrays.asList(
            "Meghalaya","Haryana","Maharashtra","Goa","Manipur","Puducherry","Telangana","Odisha","Rajasthan","Punjab",
            "Uttarakhand","Andhra Pradesh","Nagaland","Lakshadweep","Himachal Pradesh","Delhi","Uttar Pradesh",
            "Andaman and Nicobar Islands","Arunachal Pradesh","Jharkhand","Karnataka","Assam","Kerala","Jammu and Kashmir",
            "Gujarat","Chandigarh","Dadra and Nagar Haveli and Daman and Diu","Sikkim","Tamil Nadu","Mizoram","Bihar",
            "Tripura","Madhya Pradesh","Chhattisgarh","Ladakh","West Bengal"
        );
    }
}