package com.KisanUnnatiBackend.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


import com.KisanUnnatiBackend.dto.AddNewCropInfoDTO;
import com.KisanUnnatiBackend.dto.GetAllCategoryOfCropsDTO;
//import com.KisanUnnatiBackend.entity.GetAllStateEntity;
import com.KisanUnnatiBackend.service.AddCategoryService;
import com.KisanUnnatiBackend.service.AddNewCropInfoService;
import com.KisanUnnatiBackend.service.StateName;
//import com.KisanUnnatiBackend.service.GetAllStateservice;

@Controller
public class AddNewCropInfoController {
	 
	@Autowired
	private AddCategoryService addCategoryService;
	
	@Autowired
	private AddNewCropInfoService addNewCropInfoService;
	
	@GetMapping("cropInformationManagement")
	public String cropManagement(Model model) {
	    return "cropInformationManagement/cropInformationManagement"; 
	}
	
		
	@GetMapping("/addNewCropsInfoForm")
    public String addNewCropsform(Model model){
        List<GetAllCategoryOfCropsDTO> allCategoryOfCrops = addCategoryService.getAllCategoryOfCrops();
        model.addAttribute("categoryList", allCategoryOfCrops);
        model.addAttribute("stateAll", StateName.getAllStates());
        return "cropInformationManagement/addNewCropsInfoForm";
    }
 
	
	
	
	@InitBinder
	public void initBinding(WebDataBinder webDataBinder) {
		webDataBinder.setDisallowedFields("image_input");
		
	}
	
	@PostMapping("/addNewCropInfo")
	public String addNewCropInsert(@Valid @ModelAttribute AddNewCropInfoDTO addNewCropDTO,BindingResult bindingResult,
	                               RedirectAttributes redirectAttributes,@RequestParam("image_input") MultipartFile imageFile,
	                               @RequestParam("file_input") MultipartFile textFile, HttpSession session, Model model) {
    	 List<String> errorList=new ArrayList<>();
 		if(bindingResult.hasErrors()) {
 			System.out.println(2);
 			 List<ObjectError> list=bindingResult.getAllErrors();
 			 for(ObjectError error:list) {
 				 System.out.println(error.getDefaultMessage());
 				 errorList.add(error.getDefaultMessage());
 			 }
 			 model.addAttribute("errorList",errorList);
 			 return "cropInformationManagement/addNewCrops";
 		}else {
 			try {
 				boolean added=addNewCropInfoService.insertAddNewCrop(addNewCropDTO, imageFile,textFile, session);
 				 if (added) {
 		            model.addAttribute("message", "Crop Information added successfully");
 		        } else {
 		        	String fileNameText=textFile.getOriginalFilename();	    
 		        	if(fileNameText.substring(fileNameText.lastIndexOf(".") + 1).equalsIgnoreCase("txt")) {
 		        		model.addAttribute("errorMessage", "Crop Information not added ,Something wrong try again");
 		        	}else {
 		        		model.addAttribute("errorMessage", "Crop Information not added, Only text file accepted");
 		        	}
 		        }
 			}catch (Exception e) {
				e.printStackTrace();
			}
 			
 			
 		}
    	
 		return "cropInformationManagement/cropInformationManagement";
    }
	

}
