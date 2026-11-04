package com.KisanUnnatiBackend.service;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.KisanUnnatiBackend.dto.CropSellerListingDTO;
import com.KisanUnnatiBackend.entity.CropSellerListingEntity;
import com.KisanUnnatiBackend.entity.UserContactdetailsEntity;
import com.KisanUnnatiBackend.entity.UserRegisterLoginEntity;
import com.KisanUnnatiBackend.repo.*;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CropSellerListingService {

	@Autowired
    private UserRegisterLoginRepo userRegisterRepo;
	
	@Autowired
    private  CropSellerListingRepository cropListingRepository;

	@Transactional
    public String addSellingCrop(CropSellerListingDTO cropDTO, MultipartFile multipartFile, HttpSession session) throws Exception {
    	String sellerEmail=null,message=null;
    	sellerEmail=cropDTO.getSellerEmail();
    	
    	if(sellerEmail!=null) {
    		Optional<UserRegisterLoginEntity> optionalUser = userRegisterRepo.findByEmail(sellerEmail);
            if (optionalUser.isPresent()) {
            	UserContactdetailsEntity contactEntity = optionalUser.get().getUserContactId();
       
            	String fileName = multipartFile.getOriginalFilename(); 	
            	String dateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd-HH-mm-ss"));
            	fileName = dateTime + "_" + fileName;
            	System.out.println(fileName);
            	
            	CropSellerListingEntity cropSellerListingEntity = new CropSellerListingEntity(); 
            	cropSellerListingEntity.setCropName(cropDTO.getCropName());
            	cropSellerListingEntity.setCropCategory(cropDTO.getCropCategory());
            	cropSellerListingEntity.setPrice(cropDTO.getPrice());
            	cropSellerListingEntity.setQuantity(cropDTO.getQuantity());
            	cropSellerListingEntity.setTotalQuantity(cropDTO.getQuantity());
            	cropSellerListingEntity.setDescription(cropDTO.getDescription());
            	cropSellerListingEntity.setImagePath(fileName);
            	cropSellerListingEntity.setDate(LocalDate.now());
           	    cropSellerListingEntity.setContactdetailsEntity(contactEntity);
            
  	 
            	byte[] bytes = multipartFile.getBytes();
         	    String rootPath = System.getProperty("user.dir");
         	    String path =rootPath+File.separator+"src" + File.separator + "main" + File.separator +
                         "webapp" + File.separator + "assets" + File.separator +"CropSellerListingImage"+File.separator + fileName;
         	    FileOutputStream fileOutputStream = new FileOutputStream(path);
         	    BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(fileOutputStream);
         		
         	    bufferedOutputStream.write(bytes);
         	    bufferedOutputStream.close();
         		fileOutputStream.close();

         	   CropSellerListingEntity save = cropListingRepository.save(cropSellerListingEntity);    	           	
            } else {
            	message= "seller email is invalid";
            }
    	}else {
    		message ="seller email is invalid";
    	}
 	  return message;        
    }

    public List<CropSellerListingEntity> getAllCrops() {
        return cropListingRepository.findAll();
    }
}
