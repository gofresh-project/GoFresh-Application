package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.User;
import com.example.demo.service.UserService;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    // http://localhost:8080/allusers
    @GetMapping("/allusers")
    public List<User> getAll() {
        return userService.getAll();
    }

    // http://localhost:8080/getuser?uid=1
    @GetMapping("/getuser")
    public User getOne(@RequestParam("uid") int id) {
        return userService.getOne(id);
    }

    // http://localhost:8080/saveuser
    @PostMapping("/saveuser")
    public User save(@RequestBody User user) {
        return userService.save(user);
    }

    // http://localhost:8080/deleteuser/1
    @DeleteMapping("/deleteuser/{uid}")
    public void delete(@PathVariable("uid") int id) {
        userService.delete(id);
    }

//    // http://localhost:8080/finduserbyusername?username=john
//    @GetMapping("/finduserbyusername")
//    public User findByUsername(@RequestParam String username) {
//        return userService.getByUsername(username);
//    }
}
