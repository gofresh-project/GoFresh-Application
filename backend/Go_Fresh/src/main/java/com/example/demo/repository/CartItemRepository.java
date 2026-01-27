package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {

    List<CartItem> findByCartCartId(int cartId);

    Optional<CartItem> findByCartCartIdAndProductProdIdAndVendorVendorId(
            int cartId, int prodId, int vendorId);
}
