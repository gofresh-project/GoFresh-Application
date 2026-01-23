package com.example.demo.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Area;
import com.example.demo.model.City;
import com.example.demo.repository.AreaRepository;
import com.example.demo.repository.CityRepository;

@Service
public class AreaService {

    @Autowired
    AreaRepository areaRepo;

    @Autowired
    CityRepository cityRepo;   // 🔑 REQUIRED

    // Get all areas
    public List<Area> getAll() {
        return areaRepo.findAll();
    }

    // Get area by ID
    public Area getOne(int id) {
        return areaRepo.findById(id).orElse(null);
    }

    // Get area by name
    public Area getByAreaName(String areaName) {
        return areaRepo.findByAreaName(areaName).orElse(null);
    }

    // ✅ FIXED METHOD (Controller remains unchanged)
    public List<Area> getByCityId(int cityId) {

        Optional<City> oc = cityRepo.findById(cityId);

        if (oc.isEmpty()) {
            throw new NoSuchElementException("City not found with id: " + cityId);
        }

        City city = oc.get();
        return areaRepo.findByCity(city);
    }

    // Save area
    public Area save(Area area) {
        return areaRepo.save(area);
    }

    // Delete area
    public void delete(int id) {
        areaRepo.deleteById(id);
    }
}
