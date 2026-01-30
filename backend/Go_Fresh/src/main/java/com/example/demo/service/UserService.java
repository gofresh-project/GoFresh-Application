package com.example.demo.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;



@Service
public class UserService {

	@Autowired
	UserRepository userRepo;

	// Get all users
	public List<User> getAll() {
		return userRepo.findAll();
	}

	// Get user by ID
	public User getOne(int id) {
		User user = null;
		Optional<User> ou = userRepo.findById(id);

		try {
			user = ou.get();
		} catch (NoSuchElementException e) {
			e.printStackTrace();
		}

		return user;
	}


	// Save user (create or update)
	public User save(User user) {
		return userRepo.save(user);
	}

	// Delete user
	public void delete(int id) {
		userRepo.deleteById(id);
	}

	
	
	
	
	
	
	
	
	
	
	
//	// Get user by username
//	public User getByUsername(String username) {
//		User user = null;
//		Optional<User> ou = userRepo.findByUsername(username);
//
//		try {
//			user = ou.get();
//		} catch (NoSuchElementException e) {
//			e.printStackTrace();
//		}
//
//		return user;
//	}
//
//	// Get user by email
//	public User getByEmail(String email) {
//		User user = null;
//		Optional<User> ou = userRepo.findByEmail(email);
//
//		try {
//			user = ou.get();
//		} catch (NoSuchElementException e) {
//			e.printStackTrace();
//		}
//
//		return user;
//	}

	
	
	
	
}
