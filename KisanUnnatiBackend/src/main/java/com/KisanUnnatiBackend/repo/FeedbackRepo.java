package com.KisanUnnatiBackend.repo;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import com.KisanUnnatiBackend.entity.FeedbackEntity;

@Repository
public interface FeedbackRepo extends JpaRepository<FeedbackEntity, Integer> {
	
	boolean existsByContactdetailsEntityUserContactId(int userContactId);

	@Modifying
    @Transactional
    @Query("UPDATE FeedbackEntity f SET f.feedback = :feedback, f.rating = :rating, f.updatingFeedbackDate = :updateDate " +
           "WHERE f.contactdetailsEntity.userContactId = :userContactId")
    int updateFeedbackByUserContactId(String feedback, int rating, LocalDate updateDate, int userContactId);

	 @Query("SELECT f.feedback, f.rating, f.date, u.name, c.address FROM FeedbackEntity f JOIN f.contactdetailsEntity c JOIN c.userRegisterLoginEntity u " +
	           "WHERE f.rating = :rating")
	  List<Object[]> getFeedbackByStateAndRating(@Param("rating") int rating, Pageable pageable);
}