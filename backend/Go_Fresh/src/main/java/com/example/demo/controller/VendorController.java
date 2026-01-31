package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Area;
import com.example.demo.model.User;
import com.example.demo.model.Vendor;
import com.example.demo.service.AreaService;
import com.example.demo.service.UserService;
import com.example.demo.service.VendorService;

@RestController
public class VendorController {

    @Autowired
    VendorService vendorService;

    @Autowired
    UserService userService;

    @Autowired
    AreaService areaService;

    
 // ✅ Vendor Cards
    @GetMapping("/allvendors")
    public List<Vendor> getAllVendors() {
        return vendorService.getAllVendors();
    }

    // ✅ Vendor Page
    @GetMapping("/getvendor")
    public Optional<Vendor> getVendor(@RequestParam int vendorId) {
        return vendorService.getVendorById(vendorId);
    }

    // ✅ After Login
    @GetMapping("/vendor/user/{userId}")
    public Vendor getVendorByUserId(@PathVariable int userId) {
        return vendorService.getVendorByUserId(userId);
    }

    // ✅ Save Vendor
    @PostMapping("/savevendor")
    public Vendor saveVendor(@RequestBody Vendor vendor) {
        return vendorService.saveVendor(vendor);
    }

    // ✅ Update Vendor
    @PutMapping("/vendor/{vendorId}")
    public Vendor updateVendor(
            @PathVariable int vendorId,
            @RequestParam int areaId,
            @RequestBody Vendor vendor) {

        return vendorService.updateVendor(vendorId, vendor, areaId);
    }

    // ✅ Delete Vendor
    @DeleteMapping("/deletevendor/{vendorId}")
    public void deleteVendor(@PathVariable int vendorId) {
        vendorService.deleteVendor(vendorId);
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
//    // http://localhost:8080/allvendors
//    @GetMapping("/allvendors")
//    public List<Vendor> getAll() {
//        return vendorService.getAll();
//    }
//
//    
// // ✅ UPDATE VENDOR PROFILE
//    @PutMapping("/{vendorId}")
//    public Vendor updateVendor(
//            @PathVariable int vendorId,
//            @RequestParam int areaId,
//            @RequestBody Vendor vendor) {
//
//        return vendorService.updateVendor(vendorId, vendor, areaId);
//    }
//    
//    
//    
//    // http://localhost:8080/getvendor?vendorId=1
//    @GetMapping("/getvendor")
//    public Optional<Vendor> getOne(@RequestParam("vendorId") int id) {
//        return vendorService.getOne(id);
//    }
//    
    
    

//    // http://localhost:8080/savevendor
//    @PostMapping("/savevendor")
//    public Vendor save(@RequestBody Vendor vendor) {
//        return vendorService.save(vendor);
//    }
//    
//    
//    
//    
//    
//    
//
//    // http://localhost:8080/deletevendor/1
//    @DeleteMapping("/deletevendor/{vendorId}")
//    public void delete(@PathVariable("vendorId") int id) {
//        vendorService.delete(id);
//    }

    

}
