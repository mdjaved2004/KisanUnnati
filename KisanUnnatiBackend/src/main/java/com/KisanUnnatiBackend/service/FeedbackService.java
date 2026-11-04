package com.KisanUnnatiBackend.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.KisanUnnatiBackend.dto.FeedbackDto;
import com.KisanUnnatiBackend.entity.FeedbackEntity;
import com.KisanUnnatiBackend.entity.UserContactdetailsEntity;
import com.KisanUnnatiBackend.repo.FeedbackRepo;
import com.KisanUnnatiBackend.repo.UserContactdetailsRepo;

@Service
public class FeedbackService {

	@Autowired
	private UserContactdetailsRepo userContactdetailsRepo; // JPA repository
	
	@Autowired
	private FeedbackRepo feedbackRepo;
	
	@Transactional
	public boolean saveFeedback(FeedbackDto feedbackdto, HttpSession session) {
		String userEmail=null;
		boolean result=false;
		int userContactId=0;
		if(session!=null) {
			userEmail=(String) session.getAttribute("userEmail");
			userContactId=(Integer)session.getAttribute("userContactId");
			if(userEmail!=null && userContactId!=0) {
				boolean alreadyGivenFeedbackCheck=feedbackRepo.existsByContactdetailsEntityUserContactId(userContactId);
				if(alreadyGivenFeedbackCheck==false) {
					UserContactdetailsEntity userContactdetailsEntity =
							userContactdetailsRepo.findById(userContactId)
							.orElseThrow(() -> new RuntimeException("User not found"));
					
					FeedbackEntity feedbackEntity = new FeedbackEntity();
					feedbackEntity.setDate(LocalDate.now());
					feedbackEntity.setFeedback(feedbackdto.getFeedback());
					feedbackEntity.setRating(feedbackdto.getRating());
					feedbackEntity.setContactdetailsEntity(userContactdetailsEntity);
					result=feedbackRepo.save(feedbackEntity)!=null;
					
				}else {
					 int updatedRows = feedbackRepo.updateFeedbackByUserContactId(feedbackdto.getFeedback(),feedbackdto.getRating(),
							 LocalDate.now(),userContactId
				        );
					 result = updatedRows > 0;
				}
			}
		}
		return result;
		
	}
	 @Transactional
	 public List<Object[]> getFeedBack(){
		   List<Object[]> cropInformation=new ArrayList<>();
		   Pageable pageable = PageRequest.of(0, 10);
		   cropInformation.addAll(feedbackRepo.getFeedbackByStateAndRating(5, pageable));
		   
		   pageable = PageRequest.of(0, 5);
		   cropInformation.addAll(feedbackRepo.getFeedbackByStateAndRating(4, pageable));
		   
		   pageable = PageRequest.of(0, 3);
		   cropInformation.addAll(feedbackRepo.getFeedbackByStateAndRating(3, pageable));
		   return cropInformation;
	   }

}
