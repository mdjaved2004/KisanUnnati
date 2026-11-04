package com.KisanUnnatiBackend.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Logoutcontroller {
	
	
	
	@GetMapping("/logOut")
	public String logOut(HttpSession session) {
	    session.invalidate();
	    return "redirect:/login";
	}

	
	
	
}
