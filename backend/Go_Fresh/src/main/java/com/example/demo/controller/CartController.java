package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.CartItem;
import com.example.demo.service.CartService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {
    
    @Autowired
    private CartService cartService;
    
    // ========== GET ENDPOINTS ==========
    
    // Get user's cart items
    @GetMapping
    public ResponseEntity<?> getCart(@RequestParam int userId) {
        try {
            List<CartItem> cartItems = cartService.getCartItems(userId);
            return ResponseEntity.ok(cartItems);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Cart not found");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }
    
    // Get cart item count
    @GetMapping("/count")
    public ResponseEntity<?> getCartItemCount(@RequestParam int userId) {
        try {
            int count = cartService.getCartItemCount(userId);
            Map<String, Integer> response = new HashMap<>();
            response.put("count", count);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to get cart count");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }
    
    // Get cart total
    @GetMapping("/total")
    public ResponseEntity<?> getCartTotal(@RequestParam int userId) {
        try {
            double total = cartService.getCartTotal(userId);
            Map<String, Double> response = new HashMap<>();
            response.put("total", total);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to get cart total");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }
    
    // ========== POST ENDPOINTS ==========
    
    // Add item to cart
    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody Map<String, Object> request) {
        try {
            // Extract parameters
            Integer userId = (Integer) request.get("userId");
            Integer productId = (Integer) request.get("productId");
            Integer vendorId = (Integer) request.get("vendorId");
            Integer quantity = (Integer) request.get("quantity");
            
            // Validate required fields
            if (userId == null || productId == null || vendorId == null) {
                throw new RuntimeException("Missing required fields: userId, productId, vendorId");
            }
            
            if (quantity == null) {
                quantity = 1; // Default quantity
            }
            
            // Add to cart
            CartItem cartItem = cartService.addToCart(userId, productId, vendorId, quantity);
            
            // Build response
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Item added to cart successfully");
            response.put("cartItem", cartItem);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to add item to cart");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
    
    // ========== PUT ENDPOINTS ==========
    
    // Update quantity
    @PutMapping("/{cartItemId}/quantity")
    public ResponseEntity<?> updateQuantity(
            @PathVariable int cartItemId,
            @RequestBody Map<String, Object> request) {
        try {
            Integer userId = (Integer) request.get("userId");
            Integer quantity = (Integer) request.get("quantity");
            
            if (userId == null || quantity == null) {
                throw new RuntimeException("Missing required fields: userId, quantity");
            }
            
            CartItem cartItem = cartService.updateQuantity(userId, cartItemId, quantity);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Quantity updated successfully");
            response.put("cartItem", cartItem);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to update quantity");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
    
    // ========== DELETE ENDPOINTS ==========
    
    // Remove item from cart
    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<?> removeFromCart(
            @PathVariable int cartItemId,
            @RequestParam int userId) {
        try {
            cartService.removeFromCart(userId, cartItemId);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Item removed from cart successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to remove item");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }
    
    // Clear cart
    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCart(@RequestParam int userId) {
        try {
            cartService.clearCart(userId);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Cart cleared successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to clear cart");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
}