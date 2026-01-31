package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Area;
import com.example.demo.model.User;
import com.example.demo.model.Vendor;
import com.example.demo.repository.AreaRepository;
import com.example.demo.repository.VendorRepository;

@Service
public class VendorService {

    @Autowired
    VendorRepository vRepo;
    
    @Autowired
    private AreaRepository areaRepository;

    // ✅ Vendor Cards
    public List<Vendor> getAllVendors() {
        return vRepo.findAll();
    }

    // ✅ Vendor Page
    public Optional<Vendor> getVendorById(int vendorId) {
        return vRepo.findById(vendorId);
    }

    // ✅ After Login
    public Vendor getVendorByUserId(int userId) {
        return vRepo.findByUser_UserId(userId)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
    }

    // ✅ Save Vendor
    public Vendor saveVendor(Vendor vendor) {
        return vRepo.save(vendor);
    }

    // ✅ Update Vendor Profile
    public Vendor updateVendor(int vendorId, Vendor vendor, int areaId) {

        Vendor existing = vRepo.findById(vendorId)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));

        Area area = areaRepository.findById(areaId)
                .orElseThrow(() -> new RuntimeException("Area not found"));

        existing.setBusinessName(vendor.getBusinessName());
        existing.setBusinessRegNo(vendor.getBusinessRegNo());
        existing.setArea(area);

        return vRepo.save(existing);
    }

    // ✅ Delete Vendor
    public void deleteVendor(int vendorId) {
    	vRepo.deleteById(vendorId);
    }
    
    
}
