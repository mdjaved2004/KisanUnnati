package com.KisanUnnatiBackend.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.KisanUnnatiBackend.dto.NewAdminAddDTO;
import com.KisanUnnatiBackend.dto.UserRegisterDTO;
import com.KisanUnnatiBackend.entity.UserContactdetailsEntity;
import com.KisanUnnatiBackend.entity.UserRegisterLoginEntity;
import com.KisanUnnatiBackend.repo.AddNewCropInfoRepo;
import com.KisanUnnatiBackend.repo.CropSellerListingRepository;
import com.KisanUnnatiBackend.repo.UserRegisterLoginRepo;

@Service
public class UserRegisterLoginService {
	
	@Autowired
    private UserRegisterLoginRepo userRegisterRepo;
	
	@Autowired
	private AddNewCropInfoRepo addNewCropInfoRepo;
	
	@Autowired
	private  CropSellerListingRepository cropSellerListingRepository;
	 
	@Autowired
	private  FeedbackService feedbackService;
	
	@Transactional
	public boolean registerUserCheck(String email) {  	
	    //Check duplicate email
	    if (userRegisterRepo.existsByEmail(email)) {
	    	return true;
	    }
		return false;
	}
	@Transactional
	public Map<String, Object> registerUser(UserRegisterDTO dto) {
		String state=null, district=null, cityVillage=null;
	    Map<String, Object> responseMap = new HashMap<>();
	    
	    state=dto.getState();
    	district=dto.getDistrict();
    	cityVillage=dto.getCityVillage();
    	
	    //Check duplicate email
	    if (userRegisterRepo.existsByEmail(dto.getEmail())) {
	        throw new RuntimeException("Email already exists");
	    }

	    //Create main user entity
	    UserRegisterLoginEntity userRegEntity = new UserRegisterLoginEntity();
	    userRegEntity.setName(dto.getName());
	    userRegEntity.setEmail(dto.getEmail());
	    userRegEntity.setPassword(dto.getPassword()); 
	    userRegEntity.setJoiningDate(LocalDate.now());
	    userRegEntity.setPosition(3); // default

	    //Create contact details entity
	    UserContactdetailsEntity contact = new UserContactdetailsEntity();
	    contact.setMobileNumber(dto.getMobileNumber());
	    contact.setStateName(state);
	    contact.setDistrict(district);
	    contact.setCity(cityVillage);
	    contact.setAddress(dto.getFullAddress());

	    //Map both entities
	    contact.setUserRegisterLoginEntity(userRegEntity);
	    userRegEntity.setUserContactId(contact);

	    //Save user
	    UserRegisterLoginEntity savedUser = userRegisterRepo.save(userRegEntity);

	    //Add user to response map
	    responseMap.put("user", savedUser);
	    
	    // add list to buying information
    	responseMap.put("buyingCropInfo", buyingCropInformation(state, district, cityVillage));
    	
    	// add list to crop information
    	responseMap.put("cropInformation", cropInformation(state));
    	
    	// add list to feedback
    	responseMap.put("feedback", feedbackService.getFeedBack());
	    return responseMap;
	}
	
	
	
	
	
	
 // Login with email AND password check
	   public Map<String, Object> loginUser(String email, String password) {
		   String state=null, district=null, cityVillage=null;
		   Map<String, Object> responseMap = new HashMap<>();
		   
		   Optional<UserRegisterLoginEntity> optionalUser =userRegisterRepo.findByEmailAndPassword(email, password);

	        if (optionalUser.isPresent()) {
	        	UserRegisterLoginEntity userLoginInfo=optionalUser.get();
	        	UserContactdetailsEntity usercontactInfo=userLoginInfo.getUserContactId();
	        	state=usercontactInfo.getStateName();
	        	district=usercontactInfo.getDistrict();
	        	cityVillage=usercontactInfo.getCity();
	        	
	        	responseMap.put("user", userLoginInfo);
	        	
	    	    // add list to buying information
	        	responseMap.put("buyingCropInfo", buyingCropInformation(state, district, cityVillage));
	    	    
	        	// add list to crop information
	        	responseMap.put("cropInformation", cropInformation(state));
	        	
	        	// add list to feedback
	        	responseMap.put("feedback", feedbackService.getFeedBack());
	        	return responseMap;
	        } else {
	            throw new RuntimeException("Invalid email or password");
	        }
	    }
	   
	   
	   
	   public Optional<UserRegisterLoginEntity> loginAdmin(String email, String password) {
		   Optional<UserRegisterLoginEntity> optionalUser =userRegisterRepo.findByEmailAndPassword(email, password);
		   if (optionalUser.isPresent()) {	        	
	    	    return optionalUser;
	        } else {
	            throw new RuntimeException("Invalid email or password");
	        }
	    }
	   
	   
	   public boolean newAdminAdd(int adminId, NewAdminAddDTO newAdminAddDTO) {
           
		   int rows = userRegisterRepo.updatePositionByEmailAndPassword(newAdminAddDTO.getPosition(), adminId, newAdminAddDTO.getEmail(), newAdminAddDTO.getPassword());
		   return rows > 0;
		  
	   }
	   
	   
	   public List<Object[]> buyingCropInformation(String state, String district, String city){
		   List<Object[]> buyingCropInfo= new ArrayList<>();
		   int lengthBuyingCropInfo=7;
		   Pageable limit = PageRequest.of(0, 4); 
		   
		   buyingCropInfo = cropSellerListingRepository.buyingCropCityVice(city, district, state, limit);
		   	   
		   lengthBuyingCropInfo=7-buyingCropInfo.size();
//		   System.out.println(".............city.............."+ buyingCropInfo.size());
	       limit = PageRequest.of(0, lengthBuyingCropInfo); 
	       	       
	       buyingCropInfo.addAll(cropSellerListingRepository.buyingCropDistrictVice(city, district, state, limit));
//	       System.out.println(".............District.............."+ buyingCropInfo.size());
	       if(buyingCropInfo.size()<7) {
	    	   lengthBuyingCropInfo=7-buyingCropInfo.size();
	    	   limit = PageRequest.of(0, lengthBuyingCropInfo);
	    	   buyingCropInfo.addAll(cropSellerListingRepository.buyingCropStateVice(city, district, state, limit));
//	    	   System.out.println(".............state.............."+ buyingCropInfo.size());
	       }
		   return buyingCropInfo;
	   }
	   
	   public List<Object[]> cropInformation(String state){
		   List<Object[]> cropInformation=addNewCropInfoRepo.findCropsByStateAsObject(state);
		   if(cropInformation==null) {
			   return null;
		   }
		   return cropInformation;
	   }
}
