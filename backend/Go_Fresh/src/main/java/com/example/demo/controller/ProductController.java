package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Product;
import com.example.demo.service.ProductService;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductService productService;
    


 // GET /products
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    
 // GET /products/category/5
    @GetMapping("/categories/{catId}/products")
    public List<Product> getProductsByCategory(@PathVariable int catId) {
        return productService.getProductsByCategory(catId);
    }
    
    // GET /products/10
    @GetMapping("/{productId}")
    public Product getProductById(@PathVariable int productId) {
        return productService.getProductById(productId);
    }
    
    
}
