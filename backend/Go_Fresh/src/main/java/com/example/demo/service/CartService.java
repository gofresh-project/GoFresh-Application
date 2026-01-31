package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.*;
import com.example.demo.repository.*;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    
    @Autowired private CartRepository cartRepository;
    @Autowired private CartItemRepository cartItemRepository;
    @Autowired private ProductRepository productRepository;
    @Autowired private VendorRepository vendorRepository;
    @Autowired private StockRepository stockRepository;
    @Autowired private UserRepository userRepository;
    
    // ========== CART METHODS ==========
    
    // Get or create cart for user
    public Cart getOrCreateCart(int userId) {
        // Check if user has active cart
        Optional<Cart> existingCart = cartRepository.findActiveCartByUserId(userId);
        
        if (existingCart.isPresent()) {
            return existingCart.get();
        }
        
        // Create new cart
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        
        Cart newCart = new Cart(user);
        return cartRepository.save(newCart);
    }
    
    // Get user's cart
    public Cart getUserCart(int userId) {
        return cartRepository.findActiveCartByUserId(userId)
                .orElseThrow(() -> new RuntimeException("No active cart found for user ID: " + userId));
    }
    
    // ========== CART ITEM METHODS ==========
    
    // Add item to cart
    @Transactional
    public CartItem addToCart(int userId, int productId, int vendorId, int quantity) {
        // Validate quantity
        if (quantity < 1) {
            throw new RuntimeException("Quantity must be at least 1");
        }
        
        // Get or create cart
        Cart cart = getOrCreateCart(userId);
        
        // Get product
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));
        
        // Get vendor
        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new RuntimeException("Vendor not found with ID: " + vendorId));
        
        // Check stock availability
        Stock stock = stockRepository.findByProductIdAndVendorId(productId, vendorId)
                .orElseThrow(() -> new RuntimeException("Stock not found for product and vendor"));
        
        if (stock.getQuantity() <= 0) {
            throw new RuntimeException("Product is out of stock");
        }
        
        // Check if item already exists in cart
        Optional<CartItem> existingItem = cartItemRepository.findByCartAndProductAndVendor(cart, product, vendor);
        
     // In addToCart method, after creating/updating cart item:
        if (existingItem.isPresent()) {
            CartItem cartItem = existingItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
            cartItem.setPrice(stock.getPrice());
            cartItem.getProduct().setPrice(stock.getPrice()); // ALSO set product price
            return cartItemRepository.save(cartItem);
        } else {
            CartItem newCartItem = new CartItem(cart, product, vendor, quantity);
            newCartItem.setPrice(stock.getPrice());
            newCartItem.getProduct().setPrice(stock.getPrice()); // ALSO set product price
            return cartItemRepository.save(newCartItem);
        }
    }
    
 // In CartService.java, update the getCartItems method:
    public List<CartItem> getCartItems(int userId) {
        Cart cart = getUserCart(userId);
        List<CartItem> cartItems = cartItemRepository.findByCart(cart);
        
        // CRITICAL: Set prices for each cart item
        for (CartItem item : cartItems) {
            try {
                // Get current price from stocks table
                Stock stock = stockRepository.findByProductIdAndVendorId(
                    item.getProduct().getProdId(), 
                    item.getVendor().getVendorId()
                ).orElse(null);
                
                if (stock != null) {
                    // Set the transient price field
                    item.setPrice(stock.getPrice());
                    
                    // ALSO set price in product object for frontend
                    item.getProduct().setPrice(stock.getPrice());
                } else {
                    // Set default price if stock not found
                    item.setPrice(0.0);
                    item.getProduct().setPrice(0.0);
                }
            } catch (Exception e) {
                System.err.println("Error setting price for cart item: " + e.getMessage());
                item.setPrice(0.0);
                item.getProduct().setPrice(0.0);
            }
        }
        
        return cartItems;
    }
    
    // Update quantity
    @Transactional
    public CartItem updateQuantity(int userId, int cartItemId, int quantity) {
        if (quantity < 1) {
            throw new RuntimeException("Quantity must be at least 1");
        }
        
        Cart cart = getUserCart(userId);
        
        CartItem cartItem = cartItemRepository.findByCartAndCartItemId(cart, cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found with ID: " + cartItemId));
        
        // Check stock availability
        Stock stock = stockRepository.findByProductIdAndVendorId(
            cartItem.getProduct().getProdId(), 
            cartItem.getVendor().getVendorId()
        ).orElseThrow(() -> new RuntimeException("Stock not found"));
        
        if (quantity > stock.getQuantity()) {
            throw new RuntimeException("Cannot update to more than available stock. Available: " + stock.getQuantity());
        }
        
        cartItem.setQuantity(quantity);
        cartItem.setPrice(stock.getPrice()); // Update price
        return cartItemRepository.save(cartItem);
    }
    
    // Remove item from cart
    @Transactional
    public void removeFromCart(int userId, int cartItemId) {
        Cart cart = getUserCart(userId);
        
        CartItem cartItem = cartItemRepository.findByCartAndCartItemId(cart, cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found with ID: " + cartItemId));
        
        cartItemRepository.delete(cartItem);
    }
    
    // Clear cart
    @Transactional
    public void clearCart(int userId) {
        Cart cart = getUserCart(userId);
        cartItemRepository.deleteByCart(cart);
    }
    
    // Get cart item count
    public int getCartItemCount(int userId) {
        Cart cart = getUserCart(userId);
        return cartItemRepository.countByCart(cart);
    }
    
    // Get cart total
    public double getCartTotal(int userId) {
        List<CartItem> cartItems = getCartItems(userId);
        return cartItems.stream()
                .mapToDouble(CartItem::getTotalPrice)
                .sum();
    }
}