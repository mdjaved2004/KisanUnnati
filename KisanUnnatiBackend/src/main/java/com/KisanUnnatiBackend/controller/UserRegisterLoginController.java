package com.KisanUnnatiBackend.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.http.ResponseEntity;

import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;

import org.springframework.web.bind.annotation.*;

import com.KisanUnnatiBackend.dto.SendOtpDto;
import com.KisanUnnatiBackend.dto.UserLoginDTO;
import com.KisanUnnatiBackend.dto.UserRegisterDTO;
import com.KisanUnnatiBackend.entity.UserContactdetailsEntity;
import com.KisanUnnatiBackend.entity.UserRegisterLoginEntity;
import com.KisanUnnatiBackend.service.UserRegisterLoginService;
import com.otherClass.Send_mail;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserRegisterLoginController {

    private final UserRegisterLoginService userRegisterService;
    
    
    @PostMapping(value = "/register", produces = "application/json")
    public ResponseEntity<?> sendOtp(@Valid @RequestBody UserRegisterDTO userRegisterDTO, BindingResult bindingResult,
            HttpSession session) {
       
    	List<String> errorList = new ArrayList<>();
        // Validation errors
        if (bindingResult.hasErrors()) {
            for (ObjectError error : bindingResult.getAllErrors()) {
                errorList.add(error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(Map.of("errors", errorList));
        }

        try {
            //Password match check
            if (!userRegisterDTO.getPassword().equals(userRegisterDTO.getConfirmPassword())) {
                return ResponseEntity.badRequest()
                        .body(Map.of("errors", "Password and confirmPassword do not match"));
            }else {
            	boolean result= userRegisterService.registerUserCheck(userRegisterDTO.getEmail());
            	if(result==true) {
            		return ResponseEntity.badRequest()
                            .body(Map.of("errors", "You are already register,click to login"));
            	}else {
	            	int otp = (int) (Math.random() * 900000) + 100000;
	            	String otp1=otp+"";
	            	Send_mail send_mail = new Send_mail();
	                send_mail.mail_information(userRegisterDTO.getName(), userRegisterDTO.getEmail(), otp);
	            	
	                session.setAttribute("userName", userRegisterDTO.getName());
	                session.setAttribute("userEmail", userRegisterDTO.getEmail());
	                session.setAttribute("userState", userRegisterDTO.getState());
	                session.setAttribute("userDistrict", userRegisterDTO.getDistrict());
	                session.setAttribute("userCity", userRegisterDTO.getCityVillage());
	                session.setAttribute("userAddress", userRegisterDTO.getFullAddress());
	                session.setAttribute("userPhone", userRegisterDTO.getMobileNumber());
	                session.setAttribute("userPassword", userRegisterDTO.getPassword());
	                session.setAttribute("userUserName", userRegisterDTO.getPassword());
	                session.setAttribute("userOtp",otp1 );
	
	                Map<String, Object> sessionUserMap = getSessionUserMap(session);
	                sessionUserMap.put("userOtp", otp1);
	                return ResponseEntity.ok(Map.of(
	                        "user", sessionUserMap
	                   ));
	             }
            }

        } catch (RuntimeException e) {
            errorList.add(e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("errors", errorList));
        }
    	
    }
    
    
       
    @PostMapping("/sendOtp")
    public ResponseEntity<?> verifyOtp(@RequestBody SendOtpDto otpDTO, HttpSession session) {
    	
    	List<String> errorList = new ArrayList<>();
    	
    	String sessionOtp = (String) session.getAttribute("userOtp");
        UserRegisterDTO userRegisterDTO = new UserRegisterDTO();
        
        userRegisterDTO.setName((String) session.getAttribute("userName"));
        userRegisterDTO.setEmail((String) session.getAttribute("userEmail"));
        userRegisterDTO.setPassword((String) session.getAttribute("userPassword"));
        userRegisterDTO.setConfirmPassword((String) session.getAttribute("userPassword"));
        userRegisterDTO.setState((String) session.getAttribute("userState"));
        userRegisterDTO.setDistrict((String) session.getAttribute("userDistrict"));
        userRegisterDTO.setCityVillage((String) session.getAttribute("userCity"));
        userRegisterDTO.setFullAddress((String) session.getAttribute("userAddress"));
        userRegisterDTO.setMobileNumber((String) session.getAttribute("userPhone"));
        userRegisterDTO.setUserName((String) session.getAttribute("userUserName"));
        
        
        System.out.println("=======================2========");
        if (!sessionOtp.equals(otpDTO.getOtp())) {
            return ResponseEntity.ok(Map.of(
                    "errors", "You entered wrong OTP, try again"
            ));
        }
        // Call service layer
        try {
        	Map<String, Object> information = userRegisterService.registerUser(userRegisterDTO);
        	session.removeAttribute("userUserName");
        	session.removeAttribute("userPassword");
        }catch(Exception e){
        	return ResponseEntity.ok(Map.of(
                    "errors", "this email already exixst, click to login"
            ));
        }

        // Remove OTP from session
        session.removeAttribute("userOtp");
        System.out.println("===1====================1========");
        return ResponseEntity.ok(Map.of(
                "message", "User registered successfully"
        ));
    }


    
    
    
    
    
    


    // ------------------- LOGIN -------------------
    @PostMapping(value = "/login", produces = "application/json") 
    public ResponseEntity<?> login(@Valid @RequestBody UserLoginDTO userLoginDTO, BindingResult bindingResult, HttpSession session) {
        List<String> errorList = new ArrayList<>();
        //Handle validation errors
        if (bindingResult.hasErrors()) {
        	System.out.println("bhn hjdjnjs================");
            for (ObjectError error : bindingResult.getAllErrors()) {
                errorList.add(error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(Map.of("errors", errorList));
        }

        try {
            Map<String, Object> information = userRegisterService.loginUser(userLoginDTO.getEmail(), userLoginDTO.getPassword());

            UserRegisterLoginEntity user = (UserRegisterLoginEntity) information.get("user");
            if (user != null) {
                UserContactdetailsEntity userContactId = user.getUserContactId();

                //Set session attributes
                session.setAttribute("userName", user.getName());
                session.setAttribute("userEmail", user.getEmail());
                session.setAttribute("userContactId", userContactId.getUserContactId());
                session.setAttribute("userState", userContactId.getStateName());
                session.setAttribute("userDistrict", userContactId.getDistrict());
                session.setAttribute("userCity", userContactId.getCity());
                session.setAttribute("userAddress", userContactId.getAddress());
                session.setAttribute("userPhone", userContactId.getMobileNumber());

                Map<String, Object> sessionUserMap = getSessionUserMap(session);
                return ResponseEntity.ok(Map.of(
                        "message", "Login successful",
                        "user", sessionUserMap,
                        "buyingCropInfo", information.get("buyingCropInfo"),
                        "cropInformation", information.get("cropInformation"),
                        "feedback",information.get("feedback")
                ));
            } else {
                return ResponseEntity.badRequest().body(Map.of(
                        "errors", "Something went wrong, try again"
                ));
            }

        } catch (RuntimeException e) {
            errorList.add(e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("errors", errorList));
        }
    }
 
    private Map<String, Object> getSessionUserMap(HttpSession session) {
        Map<String, Object> userMap = new HashMap<>();
        userMap.put("userName", session.getAttribute("userName"));
        userMap.put("userEmail", session.getAttribute("userEmail"));
        userMap.put("userState", session.getAttribute("userState"));
        userMap.put("userDistrict", session.getAttribute("userDistrict"));
        userMap.put("userCity", session.getAttribute("userCity"));
        userMap.put("userAddress", session.getAttribute("userAddress"));
        userMap.put("userPhone", session.getAttribute("userPhone"));
        return userMap;
    }   
    

}
