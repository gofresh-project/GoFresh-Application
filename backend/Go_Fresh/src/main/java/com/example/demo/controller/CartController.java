package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.CartItem;
import com.example.demo.service.CartService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    @Autowired
    private CartService cartService;

    // ✅ ADD TO CART
    @PostMapping("/cart/add")
    public CartItem addToCart(
            @RequestParam int userId,
            @RequestParam int productId,
            @RequestParam int vendorId,
            @RequestParam int quantity) {

        return cartService.addToCart(userId, productId, vendorId, quantity);
    }

    // ✅ GET CART
    @GetMapping("/cart/{userId}")
    public List<CartItem> getCart(@PathVariable int userId) {
        return cartService.getCartItems(userId);
    }
}
