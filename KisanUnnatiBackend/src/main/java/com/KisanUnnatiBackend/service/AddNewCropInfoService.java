package com.KisanUnnatiBackend.service;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.KisanUnnatiBackend.dto.AddNewCropInfoDTO;
import com.KisanUnnatiBackend.entity.AddCategoryEntity;
import com.KisanUnnatiBackend.entity.AddNewCropInfoEntity;
import com.KisanUnnatiBackend.repo.AddNewCropInfoRepo;

@Service
public class AddNewCropInfoService {

    @Autowired
    private AddNewCropInfoRepo addNewCropInfoRepo;

    @Transactional
    public boolean insertAddNewCrop(@Valid AddNewCropInfoDTO addNewCropDTO, MultipartFile imageFile, MultipartFile textFile, HttpSession session) throws Exception {

        boolean valueCheck = false;
        String rootPath, path, originalImagePath, imageFilePathToSave, originalTextFilePath, textFilePathToSave, state;

        //Get state and admin info
        state = addNewCropDTO.getState();
        
        boolean exists = addNewCropInfoRepo.existsByCropNameAndState(addNewCropDTO.getCropName(), state);
        if (exists) {
            System.out.println("Duplicate crop entry found for " + addNewCropDTO.getCropName());
            return false;
        }else {       
	        int adminId = (Integer) session.getAttribute("adminId");
	
	        //Set base folder path (inside project webapp/assets/CropInformation)
	        rootPath = System.getProperty("user.dir");
	        path = rootPath + File.separator + "src" + File.separator + "main" + File.separator +
	                "webapp" + File.separator + "assets" + File.separator + "CropInformation";
	
	        //Create folders if not exist
	        File stateFolder = new File(path + File.separator + state);
	        if (!stateFolder.exists()) {
	            boolean created = stateFolder.mkdirs();
	            if (created) {
	                new File(stateFolder, "CropInfoFiles").mkdirs();
	                new File(stateFolder, "ImageOfCrops").mkdirs();
	            }
	        }
	
	        //Unique filenames for image and text
	        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd-HH-mm-ss"));
	        originalImagePath = timestamp + "_" + imageFile.getOriginalFilename();
	        originalTextFilePath = timestamp + "_" + textFile.getOriginalFilename();
	
	        //Full file saving paths
	        imageFilePathToSave = path + File.separator + state + File.separator + "ImageOfCrops" + File.separator + originalImagePath;
	        textFilePathToSave = path + File.separator + state + File.separator + "CropInfoFiles" + File.separator + originalTextFilePath;
	
	        //Convert DTO → Entity
	       AddNewCropInfoEntity entity = new AddNewCropInfoEntity();
	       entity.setCropName(addNewCropDTO.getCropName());
	       entity.setDate(LocalDate.now());
	       entity.setAdminId(adminId);
	       entity.setImageLink(originalImagePath);
	       entity.setImageAddAdminId(adminId);
	       entity.setFileLink(originalTextFilePath);
	       entity.setFileAddAdminId(adminId);
	       entity.setState(state);
	       entity.setDisplay(true);
	
	        //Set category
	        AddCategoryEntity category = new AddCategoryEntity();
	        category.setCategoryId(addNewCropDTO.getCategoryId());
	        entity.setCategoryId(category);
	
	        //Set additional entity info
	
	        //Validate file type (txt or pdf)
	        String fileNameText = textFile.getOriginalFilename();
	        int i = fileNameText.lastIndexOf('.');
	        String extension = null;
	        if (i > 0) {
	            extension = fileNameText.substring(i + 1);
	        }
	
	        if (extension != null && (extension.equalsIgnoreCase("txt") || extension.equalsIgnoreCase("pdf"))) {
	
	            //Save image file
	            try (BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(imageFilePathToSave))) {
	                bos.write(imageFile.getBytes());
	            }
	
	            //Save text or pdf file
	            if (extension.equalsIgnoreCase("txt")) {
	                try (BufferedReader reader = new BufferedReader(new InputStreamReader(textFile.getInputStream(), StandardCharsets.UTF_8));
	                     BufferedWriter writer = new BufferedWriter(new FileWriter(textFilePathToSave))) {
	                    String line;
	                    while ((line = reader.readLine()) != null) {
	                        writer.write(line);
	                        writer.newLine();
	                    }
	                }
	            } else if (extension.equalsIgnoreCase("pdf")) {
	                try (BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(textFilePathToSave))) {
	                    bos.write(textFile.getBytes());
	                }
	            }
	            valueCheck = addNewCropInfoRepo.save(entity) != null;
	        } else {
	            valueCheck = false;
	        }
	
	        return valueCheck;
	    }
    }

}
