package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Area;
import com.example.demo.model.User;
import com.example.demo.model.Vendor;




@Repository
public interface VendorRepository extends JpaRepository<Vendor, Integer> {

	
//	Optional<Vendor> findByUser(User user);
//
//    List<Vendor> findByArea(Area area);
//
//    List<Vendor> findByRatingGreaterThan(double rating);  //Error Chances Check DataType from Modal Vendor
//
//    Optional<Vendor> findByBusinessRegNo(String businessRegNo); 
	
	
}
