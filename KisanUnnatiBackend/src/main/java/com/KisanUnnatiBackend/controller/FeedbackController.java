package com.KisanUnnatiBackend.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import com.KisanUnnatiBackend.dto.FeedbackDto;
import com.KisanUnnatiBackend.entity.FeedbackEntity;
import com.KisanUnnatiBackend.service.FeedbackService;
import com.KisanUnnatiBackend.service.UserRegisterLoginService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

   
    @PostMapping("/feadbackSave")
    public ResponseEntity<?> saveFeedback(@RequestBody FeedbackDto feedbackdto, BindingResult bindingResult,
            HttpSession session) {
    	List<String> errorList = new ArrayList<>();

        // Validation errors
        if (bindingResult.hasErrors()) {
            for (ObjectError error : bindingResult.getAllErrors()) {
                errorList.add(error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(Map.of("errors", errorList));
        }else {
        	boolean result=feedbackService.saveFeedback(feedbackdto, session);
        	if(result) {
        		 return ResponseEntity.ok(Map.of("message", "Sussesfull given feedback"));
        	}else {
        		return ResponseEntity.ok(Map.of("message", "Something went wrong, try again"));
        	}
        }
    }

    
    
    
    
    
    
    
//    @GetMapping("/feadbackGet")
//    public ResponseEntity<?> getLatestFeedback() {
//        FeedbackEntity latest = feedbackService.getLatestFeedback();
//        if (latest == null) {
//            return ResponseEntity.ok("No feedback available");
//        }
//        return ResponseEntity.ok(latest);
//    }
}
