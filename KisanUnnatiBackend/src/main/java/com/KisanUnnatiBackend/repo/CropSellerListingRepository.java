package com.KisanUnnatiBackend.repo;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.KisanUnnatiBackend.entity.CropSellerListingEntity;

@Repository
public interface CropSellerListingRepository extends JpaRepository<CropSellerListingEntity, Long> {
   
	// 	Get information about purchasing crops city wise.
	@Query(value = "SELECT c.selling_id, c.crop_name, c.date, c.description, c.image_path, c.price, c.quantity, c.selling_completing_date, c.total_quantity, " +
            "u.user_contact_id, u.address, u.city, u.district, u.mobile_number, u.state_name, r.name AS seller_name, r.profile_image, r.email FROM crop_seller_listings c " +
            "JOIN user_contact_details u ON c.user_contact_id = u.user_contact_id JOIN register r ON u.user_id = r.user_id WHERE c.display = 1 AND c.selling_completing_date IS NULL " +
            "AND u.city = :city AND u.district = :district AND u.state_name = :state", nativeQuery = true)
    List<Object[]> buyingCropCityVice(@Param("city") String city, @Param("district") String district, @Param("state") String state, Pageable pageable);
	
// 	Get information about purchasing crops district wise but no current city.
    @Query(value = "SELECT c.selling_id, c.crop_name, c.date, c.description, c.image_path, c.price, c.quantity, c.selling_completing_date, c.total_quantity, " +
            "u.user_contact_id, u.address, u.city, u.district, u.mobile_number, u.state_name, r.name AS seller_name, r.profile_image, r.email FROM crop_seller_listings c " +
            "JOIN user_contact_details u ON c.user_contact_id = u.user_contact_id JOIN register r ON u.user_id = r.user_id WHERE c.display = 1 AND c.selling_completing_date IS NULL " +
            "AND u.city != :city AND u.district = :district AND u.state_name = :state", nativeQuery = true)
    List<Object[]> buyingCropDistrictVice(@Param("city") String city, @Param("district") String district, @Param("state") String state, Pageable pageable);
	
	// 	Get information about purchasing crops state wise but no current city and district.
    @Query(value = "SELECT c.selling_id, c.crop_name, c.date, c.description, c.image_path, c.price, c.quantity, c.selling_completing_date, c.total_quantity, " +
            "u.user_contact_id, u.address, u.city, u.district, u.mobile_number, u.state_name, r.name AS seller_name, r.profile_image, r.email FROM crop_seller_listings c " +
            "JOIN user_contact_details u ON c.user_contact_id = u.user_contact_id JOIN register r ON u.user_id = r.user_id WHERE c.display = 1 AND c.selling_completing_date IS NULL " +
            "AND u.city != :city AND u.district != :district AND u.state_name = :state", nativeQuery = true)
    List<Object[]> buyingCropStateVice(@Param("city") String city, @Param("district") String district, @Param("state") String state, Pageable pageable);
}

