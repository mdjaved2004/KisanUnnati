package com.KisanUnnatiBackend.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.KisanUnnatiBackend.dto.BuyingCropInformationDto;
import com.KisanUnnatiBackend.service.BuyingCropInformationService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class BuyingCropInformationController {
	
	private final BuyingCropInformationService buyingCropInformationService;
	
	 @PostMapping(value="/buyingCropsInfo", produces = "application/json")
	 public ResponseEntity<?> buyingCropsInfo(@Valid @RequestBody BuyingCropInformationDto buyingCropInformationDto,BindingResult bindingResult,
	            HttpSession session) {
		String userName=null, userEmail=null, userState=null, userDistrict=null, userCity=null, userAddress=null;
		
		userName=(String) session.getAttribute("userName");
		userEmail=(String)session.getAttribute("userEmail");
		userState=(String)session.getAttribute("userState");
		userDistrict=(String)session.getAttribute("userDistrict");
		userCity=(String)session.getAttribute("userCity");
		userAddress=(String)session.getAttribute("userAddress");
		if(userName==null || userEmail==null || userState==null || userDistrict==null || userCity==null || userAddress==null) {
			return ResponseEntity.ok(Map.of(
	                "message", "you are not loging, click to login"
					));    
		}else {
			Map<String, Object> buyingCropInformation = buyingCropInformationService.buyingCropInformation(userState, userDistrict, userCity);
			
			return ResponseEntity.ok(Map.of(
					"message", "User registered successfully",
					"buyingCropInfo", buyingCropInformation
					));
		}
		
	 }
	
}
