package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Area;
import com.example.demo.service.AreaService;

@RestController
public class AreaController {

    @Autowired
    AreaService areaService;

    // http://localhost:8080/allareas
    @GetMapping("/allareas")
    public List<Area> getAll() {
        return areaService.getAll();
    }

    // http://localhost:8080/getarea?aid=1
    @GetMapping("/getarea")
    public Area getOne(@RequestParam("aid") int id) {
        return areaService.getOne(id);
    }

    // http://localhost:8080/savearea
    @PostMapping("/savearea")
    public Area save(@RequestBody Area area) {
        return areaService.save(area);
    }

    // http://localhost:8080/deletearea/1
    @DeleteMapping("/deletearea/{aid}")
    public void delete(@PathVariable("aid") int id) {
        areaService.delete(id);
    }

    // Example: http://localhost:8080/findareabycity?cid=1
    @GetMapping("/findareabycity")
    public List<Area> findByCity(@RequestParam int cid) {
        return areaService.getByCityId(cid);
    }
}
