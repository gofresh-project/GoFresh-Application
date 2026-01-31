package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Cart;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
    
    // Find active cart for user
    @Query("SELECT c FROM Cart c WHERE c.user.userId = :userId AND c.status = 'ACTIVE'")
    Optional<Cart> findActiveCartByUserId(@Param("userId") int userId);
    
    // Check if user has active cart
    @Query("SELECT COUNT(c) > 0 FROM Cart c WHERE c.user.userId = :userId AND c.status = 'ACTIVE'")
    boolean existsActiveCartByUserId(@Param("userId") int userId);
}