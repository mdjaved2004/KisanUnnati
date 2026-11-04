package com.KisanUnnatiBackend.service;

import java.time.LocalDate;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.KisanUnnatiBackend.dto.GetAllCategoryOfCropsDTO;
import com.KisanUnnatiBackend.entity.AddCategoryEntity;
import com.KisanUnnatiBackend.repo.CategoryAddInfoRepo;


@Service
public class AddCategoryService {

    @Autowired
    private CategoryAddInfoRepo categoryAddInfoRepo;
   
    // add new category
    @Transactional
    public boolean newCategoryAdd(@Valid String categoryOfCrops, int adminId) {
    	boolean valueReturn;
    	boolean exists = categoryAddInfoRepo.existsByCategoryIgnoreCase(categoryOfCrops);
    	if (exists) {
    		valueReturn=false;
        }else {
        	AddCategoryEntity addCategoryEntity = new AddCategoryEntity(); 
        	
        	addCategoryEntity.setCategory(categoryOfCrops);
        	addCategoryEntity.setAdminId(adminId);   
        	addCategoryEntity.setDate(LocalDate.now());
        	valueReturn= categoryAddInfoRepo.save(addCategoryEntity) != null;      	
        }
    	return valueReturn;
    }
    
    public List<GetAllCategoryOfCropsDTO> getAllCategoryOfCrops() {
        return categoryAddInfoRepo.findAllCategories();
    }
}
