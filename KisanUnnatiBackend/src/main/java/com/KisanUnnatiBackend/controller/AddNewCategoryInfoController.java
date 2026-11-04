package com.KisanUnnatiBackend.controller;

import java.util.List;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.KisanUnnatiBackend.dto.AddCategoryDTO;
import com.KisanUnnatiBackend.dto.GetAllCategoryOfCropsDTO;
import com.KisanUnnatiBackend.service.AddCategoryService;

@Controller
public class AddNewCategoryInfoController {

	
	@Autowired
	private AddCategoryService addCategoryService;
	
	
	@GetMapping("/addCategoryInfoForm")
    public String addCategoryInfoForm(Model model){
        List<GetAllCategoryOfCropsDTO> allCategoryOfCrops = addCategoryService.getAllCategoryOfCrops();
        model.addAttribute("categoryList", allCategoryOfCrops);
        return "cropInformationManagement/addNewCategoryInfoForm";
    }
	
	
	
	@PostMapping("/addNewCategoryInfo")
	public String addNewCategoryInfo(
	        @Valid @ModelAttribute AddCategoryDTO addCategoryDTO,
	        BindingResult bindingResult,
	        Model model,
	        HttpSession session) {
		System.out.println("===============================");

	    List<GetAllCategoryOfCropsDTO> allCategoryOfCrops = addCategoryService.getAllCategoryOfCrops();
	    model.addAttribute("categoryList", allCategoryOfCrops);

	    if (bindingResult.hasErrors()) {
	        return "cropInformationManagement/addNewCategoryInfoForm";
	    }

	    try {
	        int adminId = (Integer) session.getAttribute("adminId");
	        boolean added = addCategoryService.newCategoryAdd(addCategoryDTO.getCategory(), adminId);

	        if (added) {
	            model.addAttribute("message", "Category added successfully");
	        } else {
	            model.addAttribute("errorMessage", "Category already exists or could not be added");
	        }
	    } catch (Exception e) {
	        model.addAttribute("errorMessage", "Error occurred while adding category");
	        e.printStackTrace();
	    }
	    return "cropInformationManagement/cropInformationManagement";
	}
}
