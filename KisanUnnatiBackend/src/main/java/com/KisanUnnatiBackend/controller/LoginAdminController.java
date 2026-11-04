package com.KisanUnnatiBackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.KisanUnnatiBackend.dto.LoginAdminDTO;
import com.KisanUnnatiBackend.dto.NewAdminAddDTO;
import com.KisanUnnatiBackend.entity.UserContactdetailsEntity;
import com.KisanUnnatiBackend.entity.UserRegisterLoginEntity;
import com.KisanUnnatiBackend.service.UserRegisterLoginService;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
public class LoginAdminController {
//	@Autowired
//	private LoginAdminService loginAdminService;
	
	@Autowired
	private  UserRegisterLoginService userRegisterService;
	
	@GetMapping(path= {"/","/index","/login"})
	public String index() {
       return "login";
	}
	
	@GetMapping("/new_admin_form")
	public String addnewAdmin() {
	    return "admin/new_admin_add_form"; 
	}

	@GetMapping("webName")
	public String webName() {
	    return "dashboard"; 
	}
	
	
	@PostMapping("/login")
    public String login(@Valid @ModelAttribute LoginAdminDTO loginAdminDTO,
    		BindingResult bindingResult, Model model,  HttpSession session) {
		
		/* System.out.println(1); */
		System.out.println(1);
		 List<String> errorList=new ArrayList<>();
		if(bindingResult.hasErrors()) {
			System.out.println(2);
			 List<ObjectError> list=bindingResult.getAllErrors();
			 for(ObjectError error:list) {
				 System.out.println(error.getDefaultMessage());
				 errorList.add(error.getDefaultMessage());
			 }
			 model.addAttribute("errorList",errorList);
			 return "login";
		}else {
			System.out.println(3);
			Optional<UserRegisterLoginEntity> optional=userRegisterService.loginAdmin(loginAdminDTO.getEmail(), loginAdminDTO.getPassword());
			UserRegisterLoginEntity adminLoginInfo=optional.get();
			UserContactdetailsEntity adminContactInfo=adminLoginInfo.getUserContactId();
			 
			 if(adminLoginInfo.getPosition()<=2) {
				 if(adminLoginInfo.getEmail() != null && adminLoginInfo.getName() != null && adminLoginInfo.getPosition() != 0) {
					 session.setAttribute("adminId", adminLoginInfo.getUserId());
					 session.setAttribute("adminName", adminLoginInfo.getName());
					 session.setAttribute("adminEmail", adminLoginInfo.getEmail());
					 session.setAttribute("adminPosition", adminLoginInfo.getPosition());
					 session.setAttribute("adminState", adminContactInfo.getStateName());
					 session.setAttribute("adminDistrict", adminContactInfo.getDistrict());
					 session.setAttribute("adminCity", adminContactInfo.getCity());
					 session.setAttribute("adminAddress", adminContactInfo.getAddress());
					 return "dashboard";
				 }else {
					 errorList.add("You are Enter wrong email and password");
					 model.addAttribute("errorList", errorList);
				 }	 
			 }else {
				 errorList.add("You are Not aligible this application");
				 model.addAttribute("errorList", errorList);
			 }
			 
			
			
		}
	     return "login"; // index.jsp
    }
	
	@PostMapping("/adminAdd")
	public String adminAdd(@Valid @ModelAttribute NewAdminAddDTO newAdminAddDTO,
    		BindingResult bindingResult, Model model,  HttpSession session) {
		 	List<String> errorList=new ArrayList<>();
			if(bindingResult.hasErrors()) {
				 List<ObjectError> list=bindingResult.getAllErrors();
				 for(ObjectError error:list) {
					 System.out.println(error.getDefaultMessage());
					 errorList.add(error.getDefaultMessage());
				 }
				 model.addAttribute("errorList",errorList);
			}else {
				Integer adminId= (Integer) session.getAttribute("adminId");
				if(adminId!=null) {
					Integer adminPosition=(Integer)session.getAttribute("adminPosition");
					System.out.println("adminId = "+adminId);
					System.out.println("adminPosition =  "+adminPosition);
					System.out.println("newAdminAddDTO.getPosition()="+ newAdminAddDTO.getPosition());
					if(adminPosition!=null && adminPosition<=2 && adminPosition<=newAdminAddDTO.getPosition()) {
						try {
							boolean result=userRegisterService.newAdminAdd(adminId,newAdminAddDTO);
							if(result==true) {
								System.out.println("4");
								model.addAttribute("message", "Succesfull add new admin");
							}else {
								model.addAttribute("errorMessage", "You are Enter wrong information, try again");
							}		
						}catch (Exception e) {
							model.addAttribute("errorMessage", "You are Enter wrong information, try again");
						}
						
					}else {
	
						model.addAttribute("errorMessage", "You are not aligible to add admin position"+newAdminAddDTO.getPosition()+"");	
					}
				}else {
					model.addAttribute("errorMessage", "you are login first");	
				}
			}
		
		return "dashboard"; // This should resolve to addnewAdmin.jsp via view resolver
	}
	
	
}
