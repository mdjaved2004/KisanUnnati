package com.KisanUnnatiBackend.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.KisanUnnatiBackend.entity.UserRegisterLoginEntity;



@Repository
public interface UserRegisterLoginRepo extends JpaRepository<UserRegisterLoginEntity, Integer> {
   
	boolean existsByEmail(String email); // check duplicate email
    
    Optional<UserRegisterLoginEntity> findByEmailAndPassword(String email, String password);
    
    Optional<UserRegisterLoginEntity> findByEmail(String email);
 
    @Modifying
    @Transactional
    @Query("UPDATE UserRegisterLoginEntity u SET u.position = :position, u.updatePositionAdminId = :adminId WHERE u.email = :email AND u.password = :password")
    int updatePositionByEmailAndPassword(@Param("position") int position,
                                 @Param("adminId") int adminId,
                                 @Param("email") String email,
                                 @Param("password") String password);
}

