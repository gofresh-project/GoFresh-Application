package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;

@Service
public class ProductService {

	
	@Autowired
    private ProductRepository productRepository;
	
	public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getProductsByCategory(int catId) {
        return productRepository.findByCategoryCatId(catId);
    }
	
    public Product getProductById(int productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }
    
    
//    public Product updateProduct(int productId, Product product) {
//
//        // 1. Fetch existing product
//        Product existingProduct = productRepository.findById(productId)
//                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));
//
//        // 2. Update fields (ONLY what you allow)
//        existingProduct.setName(product.getName());
//        existingProduct.setPrice(product.getPrice());
//        existingProduct.setDescription(product.getDescription());
//        existingProduct.setImageUrl(product.getImageUrl());
//        existingProduct.setStock(product.getStock());
//        existingProduct.setCategory(product.getCategory());
//
//        // 3. Save updated product
//        return productRepository.save(existingProduct);
//    }
    
    
	
}
