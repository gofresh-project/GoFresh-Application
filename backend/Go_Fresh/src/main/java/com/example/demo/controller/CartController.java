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
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend access
public class CartController {
 
 @Autowired
 private CartService cartService;
 
 // Get cart items for user
 @GetMapping
 public ResponseEntity<?> getCart(@RequestParam int userId) {
     try {
         List<CartItem> cartItems = cartService.getCartItems(userId);
         
         if (cartItems.isEmpty()) {
             Map<String, String> response = new HashMap<>();
             response.put("message", "Cart is empty");
             return ResponseEntity.ok(response);
         }
         
         return ResponseEntity.ok(cartItems);
     } catch (Exception e) {
         Map<String, String> errorResponse = new HashMap<>();
         errorResponse.put("error", e.getMessage());
         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
     }
 }
 
 // Add item to cart
 @PostMapping("/add")
 public ResponseEntity<?> addToCart(@RequestBody Map<String, Object> request) {
     try {
         int userId = Integer.parseInt(request.get("userId").toString());
         int productId = Integer.parseInt(request.get("productId").toString());
         int vendorId = Integer.parseInt(request.get("vendorId").toString());
         int quantity = Integer.parseInt(request.get("quantity").toString());
         
         CartItem cartItem = cartService.addToCart(userId, productId, vendorId, quantity);
         
         Map<String, Object> response = new HashMap<>();
         response.put("message", "Item added to cart successfully");
         response.put("cartItem", cartItem);
         
         return ResponseEntity.ok(response);
     } catch (NumberFormatException e) {
         Map<String, String> errorResponse = new HashMap<>();
         errorResponse.put("error", "Invalid input format");
         return ResponseEntity.badRequest().body(errorResponse);
     } catch (Exception e) {
         Map<String, String> errorResponse = new HashMap<>();
         errorResponse.put("error", e.getMessage());
         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
     }
 }
 
 // Update cart item quantity
 @PutMapping("/{cartItemId}/quantity")
 public ResponseEntity<?> updateQuantity(
         @PathVariable int cartItemId,
         @RequestBody Map<String, Object> request) {
     try {
         int userId = Integer.parseInt(request.get("userId").toString());
         int quantity = Integer.parseInt(request.get("quantity").toString());
         
         CartItem cartItem = cartService.updateCartItemQuantity(userId, cartItemId, quantity);
         
         Map<String, Object> response = new HashMap<>();
         response.put("message", "Quantity updated successfully");
         response.put("cartItem", cartItem);
         
         return ResponseEntity.ok(response);
     } catch (NumberFormatException e) {
         Map<String, String> errorResponse = new HashMap<>();
         errorResponse.put("error", "Invalid input format");
         return ResponseEntity.badRequest().body(errorResponse);
     } catch (Exception e) {
         Map<String, String> errorResponse = new HashMap<>();
         errorResponse.put("error", e.getMessage());
         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
     }
 }
 
 // Remove item from cart
 @DeleteMapping("/{cartItemId}")
 public ResponseEntity<?> removeFromCart(
         @PathVariable int cartItemId,
         @RequestParam int userId) {
     try {
         boolean removed = cartService.removeFromCart(userId, cartItemId);
         
         Map<String, Object> response = new HashMap<>();
         if (removed) {
             response.put("message", "Item removed from cart");
             return ResponseEntity.ok(response);
         } else {
             response.put("error", "Item not found in cart");
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
         }
     } catch (Exception e) {
         Map<String, String> errorResponse = new HashMap<>();
         errorResponse.put("error", e.getMessage());
         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
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
         Map<String, String> errorResponse = new HashMap<>();
         errorResponse.put("error", e.getMessage());
         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
     }
 }
 
 // Get cart total
 @GetMapping("/total")
 public ResponseEntity<?> getCartTotal(@RequestParam int userId) {
     try {
         double total = cartService.getCartTotal(userId);
         
         Map<String, Object> response = new HashMap<>();
         response.put("userId", userId);
         response.put("total", total);
         
         return ResponseEntity.ok(response);
     } catch (Exception e) {
         Map<String, String> errorResponse = new HashMap<>();
         errorResponse.put("error", e.getMessage());
         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
     }
 }
}
