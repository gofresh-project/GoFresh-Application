package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Cart;
import com.example.demo.model.CartItem;
import com.example.demo.model.Product;
import com.example.demo.model.Vendor;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    
    // Find cart item by cart, product, and vendor
    Optional<CartItem> findByCartAndProductAndVendor(Cart cart, Product product, Vendor vendor);
    
    // Find all cart items for a cart
    List<CartItem> findByCart(Cart cart);
    
    // Find cart item by cart and cart item ID
    Optional<CartItem> findByCartAndCartItemId(Cart cart, int cartItemId);
    
    // Check if product from vendor already exists in cart
    boolean existsByCartAndProductAndVendor(Cart cart, Product product, Vendor vendor);
    
    // Delete all items from a cart
    @Transactional
    @Modifying
    @Query("DELETE FROM CartItem ci WHERE ci.cart = :cart")
    void deleteByCart(@Param("cart") Cart cart);
    
    // Count items in a cart
    int countByCart(Cart cart);
}