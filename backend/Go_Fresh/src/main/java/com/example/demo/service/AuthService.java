package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.exception.UserNotFoundException;
import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    
    
    @Autowired
    private RoleRepository roleRepository;

    public User login(LoginRequest request) {

        User user = userRepository
            .findByEmailOrUsername(request.getEmailOrUsername());
        return user;
            /*.orElseThrow(() ->
                new RuntimeException("Invalid username or email")
            );*/

        // 1️⃣ Password check (plain)
            /*if(user != null) {
		       
            } */

        // 2️⃣ Role check (VERY IMPORTANT)
        //String dbRole = user.getRole().getRoleName();

        /*if (!dbRole.equalsIgnoreCase(request.getRole())) {
            throw new RuntimeException("Role mismatch");
        }*/

        /*return new LoginResponse(
            "Login successful",
            dbRole
        );*/
    }
    
    

//    // ================= REGISTER =================
//    public User register(User user) {
//
//        // 1️⃣ Get roleId from incoming user
//        int roleId = user.getRole().getRoleId();
//
//        // 2️⃣ Fetch role from DB
//        Role role = roleRepository.findById(roleId)
//                .orElseThrow(() -> new RuntimeException("Role not found"));
//
//        // 3️⃣ Set managed role entity
//        user.setRole(role);
//
//        // 4️⃣ Save user
//        return userRepository.save(user);
//    }
    
    
    public User saveUser(User u) {
    	return userRepository.save(u);
    }
}
