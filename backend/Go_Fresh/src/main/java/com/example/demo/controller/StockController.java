package com.example.demo.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Stock;
import com.example.demo.service.StockService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StockController {

    @Autowired
    private StockService stockService;

    // ✅ ADD STOCK
    @PostMapping("/stocks")
    public Stock addStock(
            @RequestParam int productId,
            @RequestParam int vendorId,
            @RequestParam double price,
            @RequestParam int quantity) {

        return stockService.addStock(productId, vendorId, price, quantity);
    }

    // ✅ UPDATE STOCK
    @PutMapping("/stocks/{stockId}")
    public Stock updateStock(
            @PathVariable int stockId,
            @RequestParam double price,
            @RequestParam int quantity) {

        return stockService.updateStock(stockId, price, quantity);
    }
    
    
    // ✅ FILTER STOCKS
    @GetMapping("/filter")
    public ResponseEntity<List<Stock>> filterStocks(
            @RequestParam int categoryId,
            @RequestParam int areaId) {

        return ResponseEntity.ok(
            stockService.getStocksByCategoryAndArea(categoryId, areaId)
        );
    }
    
    
//    @GetMapping("/stocks")
//    public List<Stock> getStocks(
//        @RequestParam(required = false) Integer productId,
//        @RequestParam(required = false) Integer vendorId,
//        @RequestParam(required = false) Double minPrice,
//        @RequestParam(required = false) Double maxPrice,
//        @RequestParam(required = false) Boolean inStock
//    ) {
//        return stockService.getFilteredStocks(
//            productId, vendorId, minPrice, maxPrice, inStock
//        );
//    }
    
    
    
}