package com.KisanUnnatiBackend.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.KisanUnnatiBackend.entity.UserContactdetailsEntity;

@Repository
public interface UserContactdetailsRepo extends JpaRepository<UserContactdetailsEntity, Integer> {

    Optional<UserContactdetailsEntity> findByUserRegisterLoginEntity_UserId(int userId);
}