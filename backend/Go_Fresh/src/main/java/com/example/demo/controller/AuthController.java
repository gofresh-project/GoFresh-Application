package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.model.User;
import com.example.demo.service.AuthService;




@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

	
	
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public User login(
            @RequestBody LoginRequest request) {
    	System.out.println(request.getEmailOrUsername());

        System.out.println("LOGIN API HIT"); // ✅ Put it here

        return authService.login(request);
        
    }
    
//    @PostMapping("/register")
//    public User register(@RequestBody User user) {
//        return authService.register(user);
//    }
    
    
    @PostMapping("/register")
    public User saveUser(@RequestBody User u) {
    	return authService.saveUser(u);
    }
    
    
}
