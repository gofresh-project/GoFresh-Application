package com.example.demo.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.AddStockRequest;
import com.example.demo.model.Stock;
import com.example.demo.service.StockService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StockController {

    @Autowired
    private StockService stockService;

    @PostMapping("/stocks")
    public Stock addStock(@RequestBody AddStockRequest request) {

        return stockService.addStock(
            request.getProductId(),
            request.getVendorId(),
            request.getPrice(),
            request.getQuantity()
        );
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
    
    
 // ✅ GET STOCKS BY VENDOR ID
    @GetMapping("/stocks/vendor/{vendorId}")
    public List<Stock> getStocksByVendorId(@PathVariable int vendorId) {
        return stockService.getStocksByVendorId(vendorId);
    }
    
    
 // GET STOCK BY ID (for edit form)
    @GetMapping("/stocks/{stockId}")
    public Stock getStockById(@PathVariable int stockId) {
        return stockService.getStockById(stockId);
    }

    // DELETE STOCK
    @DeleteMapping("/stocks/{stockId}")
    public void deleteStock(@PathVariable int stockId) {
        stockService.deleteStock(stockId);
    }
    
    
}