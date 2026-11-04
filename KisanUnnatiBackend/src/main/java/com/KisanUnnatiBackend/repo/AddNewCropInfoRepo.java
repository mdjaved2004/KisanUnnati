package com.KisanUnnatiBackend.repo;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.KisanUnnatiBackend.entity.AddNewCropInfoEntity;

@Repository
public interface AddNewCropInfoRepo extends JpaRepository<AddNewCropInfoEntity, Integer>{

	boolean existsByCropNameAndState(String cropName, String state);
	
	@Query(value = "SELECT crop_id, crop_name, file_link, image_link, state FROM crops_information WHERE state = :state AND display = 1", nativeQuery = true)
	List<Object[]> findCropsByStateAsObject(@Param("state") String state);

}
