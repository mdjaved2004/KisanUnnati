package com.KisanUnnatiBackend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.KisanUnnatiBackend.dto.GetAllCategoryOfCropsDTO;
import com.KisanUnnatiBackend.entity.AddCategoryEntity;

@Repository
public interface CategoryAddInfoRepo extends JpaRepository<AddCategoryEntity, Integer> {

    @Query("SELECT new com.KisanUnnatiBackend.dto.GetAllCategoryOfCropsDTO(a.id, a.category, a.display) FROM AddCategoryEntity a")
    List<GetAllCategoryOfCropsDTO> findAllCategories();
    
    boolean existsByCategoryIgnoreCase(String category);
}

