package com.KisanUnnatiBackend.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.KisanUnnatiBackend.dto.CropSellerListingDTO;
import com.KisanUnnatiBackend.service.CropSellerListingService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/crops")
@RequiredArgsConstructor
public class CropSellerListingController {

    private final CropSellerListingService cropSellerListing;

    @InitBinder
    public void initBinding(WebDataBinder webDataBinder) {
        webDataBinder.setDisallowedFields("image_input");
    }

    // Add a new crop
    @PostMapping(value = "/addNewCropForSelling", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addCrop(@Validated @ModelAttribute CropSellerListingDTO cropDTO,
            BindingResult bindingResult,
            @RequestParam("image_input") MultipartFile imageFile,
            HttpSession session) {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getAllErrors()
                    .stream()
                    .map(err -> err.getDefaultMessage())
                    .toList();
            return ResponseEntity.badRequest().body(Map.of("errors", errors));
        }

//        CropSellerListingEntity savedCrop = 
        		try {
					String message=cropSellerListing.addSellingCrop(cropDTO, imageFile, session);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
        return ResponseEntity.ok("message");
    }

    // Get all crops
//    @GetMapping("/all")
//    public ResponseEntity<?> getAllCrops() {
//        List<CropSellerListingEntity> crops = cropSellerListing.getAllCrops();
//        return ResponseEntity.ok(crops);
//    }
}
