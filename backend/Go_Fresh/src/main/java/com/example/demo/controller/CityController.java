package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.City;
import com.example.demo.service.CityService;

@RestController
public class CityController {

    @Autowired
    CityService cityService;

    // http://localhost:8080/allcities
    @GetMapping("/allcities")
    public List<City> getAll() {
        return cityService.getAll();
    }

    // http://localhost:8080/getcity?cid=1
    @GetMapping("/getcity")
    public City getOne(@RequestParam("cid") int id) {
        return cityService.getOne(id);
    }

    // http://localhost:8080/savecity
    @PostMapping("/savecity")
    public City save(@RequestBody City city) {
        return cityService.save(city);
    }

    // http://localhost:8080/deletecity/1
    @DeleteMapping("/deletecity/{cid}")
    public void delete(@PathVariable("cid") int id) {
        cityService.delete(id);
    }

    // http://localhost:8080/findcitybyname?name=Pune
    @GetMapping("/findcitybyname")
    public City findByName(@RequestParam String name) {
        return cityService.getByCityName(name);
    }
}
