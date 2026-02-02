package com.example.demo.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Cart;
import com.example.demo.model.CartItem;
import com.example.demo.model.CartItemStatus;
import com.example.demo.model.Product;
import com.example.demo.model.Vendor;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
 
 List<CartItem> findByCart(Cart cart);
 
 @Query("SELECT ci FROM CartItem ci WHERE ci.cart = :cart AND ci.status = :status")
 List<CartItem> findByCartAndStatus(@Param("cart") Cart cart, @Param("status") CartItemStatus status);
 
 @Query("SELECT ci FROM CartItem ci WHERE ci.cart = :cart AND ci.product = :product AND ci.vendor = :vendor AND ci.status = :status")
 Optional<CartItem> findByCartAndProductAndVendorAndStatus(
         @Param("cart") Cart cart, 
         @Param("product") Product product, 
         @Param("vendor") Vendor vendor, 
         @Param("status") CartItemStatus status);
 
 void deleteByCart(Cart cart);
}