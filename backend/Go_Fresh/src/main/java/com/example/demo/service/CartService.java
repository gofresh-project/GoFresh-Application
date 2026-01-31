package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.*;
import com.example.demo.repository.*;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CartService {
    
    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private CartItemRepository cartItemRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private VendorRepository vendorRepository;
    
    @Autowired
    private StockRepository stockRepository;
    
    // Get or create active cart for user
    public Cart getOrCreateActiveCart(int userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found with ID: " + userId);
        }
        
        User user = userOpt.get();
        
        // Try to find active cart
        Optional<Cart> cartOpt = cartRepository.findByUserAndStatus(user, CartStatus.ACTIVE);
        
        if (cartOpt.isPresent()) {
            return cartOpt.get();
        } else {
            // Create new cart
            Cart newCart = new Cart(user);
            return cartRepository.save(newCart);
        }
    }
    
    // Add item to cart
    public CartItem addToCart(int userId, int productId, int vendorId, int quantity) {
        // Get or create cart
        Cart cart = getOrCreateActiveCart(userId);
        
        // Get product
        Optional<Product> productOpt = productRepository.findById(productId);
        if (productOpt.isEmpty()) {
            throw new RuntimeException("Product not found with ID: " + productId);
        }
        Product product = productOpt.get();
        
        // Get vendor
        Optional<Vendor> vendorOpt = vendorRepository.findById(vendorId);
        if (vendorOpt.isEmpty()) {
            throw new RuntimeException("Vendor not found with ID: " + vendorId);
        }
        Vendor vendor = vendorOpt.get();
        
        // Check stock availability
        Optional<Stock> stockOpt = stockRepository.findByProductIdAndVendorId(productId, vendorId);
        if (stockOpt.isEmpty()) {
            throw new RuntimeException("Product not available from this vendor");
        }
        
        Stock stock = stockOpt.get();
        if (stock.getQuantity() < quantity) {
            throw new RuntimeException("Insufficient stock. Available: " + stock.getQuantity());
        }
        
        // Check if item already exists in cart
        Optional<CartItem> existingItemOpt = cartItemRepository.findByCartAndProductAndVendorAndStatus(
                cart, product, vendor, CartItemStatus.ADDED);
        
        if (existingItemOpt.isPresent()) {
            // Update existing item
            CartItem existingItem = existingItemOpt.get();
            int newQuantity = existingItem.getQuantity() + quantity;
            
            // Check stock for updated quantity
            if (stock.getQuantity() < newQuantity) {
                throw new RuntimeException("Cannot add more items. Available stock: " + stock.getQuantity());
            }
            
            existingItem.setQuantity(newQuantity);
            existingItem.setPrice(stock.getPrice()); // Update price in case it changed
            return cartItemRepository.save(existingItem);
        } else {
            // Create new cart item
            CartItem newCartItem = new CartItem(cart, product, vendor, quantity, stock.getPrice());
            return cartItemRepository.save(newCartItem);
        }
    }
    
    // Get cart items for user
    public List<CartItem> getCartItems(int userId) {
        Cart cart = getOrCreateActiveCart(userId);
        return cartItemRepository.findByCartAndStatus(cart, CartItemStatus.ADDED);
    }
    
    // Update cart item quantity
    public CartItem updateCartItemQuantity(int userId, int cartItemId, int newQuantity) {
        if (newQuantity <= 0) {
            throw new RuntimeException("Quantity must be greater than 0");
        }
        
        Optional<CartItem> cartItemOpt = cartItemRepository.findById(cartItemId);
        if (cartItemOpt.isEmpty()) {
            throw new RuntimeException("Cart item not found with ID: " + cartItemId);
        }
        
        CartItem cartItem = cartItemOpt.get();
        
        // Verify cart belongs to user
        if (cartItem.getCart().getUser().getUserId() != userId) {
            throw new RuntimeException("Cart item does not belong to user");
        }
        
        // Check stock availability
        Stock stock = stockRepository.findByProductIdAndVendorId(
                cartItem.getProduct().getProdId(), 
                cartItem.getVendor().getVendorId())
                .orElseThrow(() -> new RuntimeException("Stock not found"));
        
        if (stock.getQuantity() < newQuantity) {
            throw new RuntimeException("Insufficient stock. Available: " + stock.getQuantity());
        }
        
        cartItem.setQuantity(newQuantity);
        return cartItemRepository.save(cartItem);
    }
    
    // Remove item from cart
    public boolean removeFromCart(int userId, int cartItemId) {
        Optional<CartItem> cartItemOpt = cartItemRepository.findById(cartItemId);
        if (cartItemOpt.isEmpty()) {
            return false;
        }
        
        CartItem cartItem = cartItemOpt.get();
        
        // Verify cart belongs to user
        if (cartItem.getCart().getUser().getUserId() != userId) {
            return false;
        }
        
        // Mark as removed instead of deleting (soft delete)
        cartItem.setStatus(CartItemStatus.REMOVED);
        cartItemRepository.save(cartItem);
        return true;
    }
    
    // Clear cart
    public void clearCart(int userId) {
        Cart cart = getOrCreateActiveCart(userId);
        List<CartItem> cartItems = cartItemRepository.findByCartAndStatus(cart, CartItemStatus.ADDED);
        
        for (CartItem item : cartItems) {
            item.setStatus(CartItemStatus.REMOVED);
            cartItemRepository.save(item);
        }
    }
    
    // Get cart total
    public double getCartTotal(int userId) {
        List<CartItem> cartItems = getCartItems(userId);
        double total = 0.0;
        
        for (CartItem item : cartItems) {
            total += item.getPrice() * item.getQuantity();
        }
        
        return total;
    }
}