package com.KisanUnnatiBackend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.KisanUnnatiBackend.repo.CropSellerListingRepository;


@Service
public class BuyingCropInformationService{
	
	
	@Autowired
	private  CropSellerListingRepository cropSellerListingRepository;
	
	@Transactional
    public Map<String, Object> buyingCropInformation(String state, String district, String city){
	    Map<String, Object> responseMap = new HashMap<>();
	    responseMap.put("BuyingCropInfoBycity",buyingCropCityVice(state,district,city,0,15));
	    responseMap.put("buyingCropDistrictVice",buyingCropDistrictVice(state,district,city,0,15));
	    responseMap.put("buyingCropStateVice",buyingCropStateVice(state,district,city,0,15));
	    return responseMap;	
	}
	
	
	public List<Object[]> buyingCropCityVice(String state, String district, String city, int start, int end) {
		System.out.println(".............city..............");
		PageRequest limitValue = PageRequest.of(start, end);
		List<Object[]> buyingCropCityVice = cropSellerListingRepository.buyingCropCityVice(city,district,state, limitValue);
		if(buyingCropCityVice!=null) {
			for (Object[] row : buyingCropCityVice) {
				System.out.println("---- New Row ----");
				for (int i = 0; i < row.length; i++) {
					System.out.println("Column " + i + ": " + row[i]);
				}
			}
		}
		return buyingCropCityVice;	
	}
	
	public List<Object[]> buyingCropDistrictVice(String state, String district, String city, int start, int end) {
		System.out.println(".............district..............");
		PageRequest limitValue = PageRequest.of(start, end);
		List<Object[]> buyingCropDistrictVice = cropSellerListingRepository.buyingCropCityVice(city,district,state, limitValue);
		if(buyingCropDistrictVice!=null) {
			for (Object[] row : buyingCropDistrictVice) {
			    System.out.println("---- New Row ----");
			    for (int i = 0; i < row.length; i++) {
			        System.out.println("Column " + i + ": " + row[i]);
			    }
			}
		}
		return buyingCropDistrictVice;
			
	}
	
	
	
	
	
	
	public List<Object[]> buyingCropStateVice (String state, String district, String city, int start, int end) {
		System.out.println(".............state..............");
		PageRequest limitValue = PageRequest.of(start, end);
		List<Object[]> buyingCropStateVice = cropSellerListingRepository.buyingCropStateVice(city,district,state, limitValue);
		if(buyingCropStateVice!=null) {
			for (Object[] row : buyingCropStateVice) {
			    System.out.println("---- New Row ----");
			    for (int i = 0; i < row.length; i++) {
			        System.out.println("Column " + i + ": " + row[i]);
			    }
			}
		}
		return buyingCropStateVice;
		
	}
	
	
	
	
	
}
