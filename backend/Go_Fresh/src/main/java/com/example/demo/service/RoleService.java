package com.example.demo.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Role;
import com.example.demo.repository.RoleRepository;

@Service
public class RoleService {

    @Autowired
    RoleRepository roleRepo;

    // Get all roles
    public List<Role> getAll() {
        return roleRepo.findAll();
    }

    // Get role by ID
    public Role getOne(int id) {
        Role role = null;
        Optional<Role> or = roleRepo.findById(id);

        try {
            role = or.get();
        } catch (NoSuchElementException e) {
            e.printStackTrace();
        }

        return role;
    }

    // Get role by name
    public Role getByRoleName(String roleName) {
        Role role = null;
        Optional<Role> or = roleRepo.findByRoleName(roleName);

        try {
            role = or.get();
        } catch (NoSuchElementException e) {
            e.printStackTrace();
        }

        return role;
    }

    // Save role
    public Role save(Role role) {
        return roleRepo.save(role);
    }

    // Delete role
    public void delete(int id) {
        roleRepo.deleteById(id);
    }
}
