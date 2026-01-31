package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Cart;
import com.example.demo.model.CartStatus;
import com.example.demo.model.User;

import java.util.Optional;


@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
    
    @Query("SELECT c FROM Cart c WHERE c.user = :user AND c.status = :status")
    Optional<Cart> findByUserAndStatus(@Param("user") User user, @Param("status") CartStatus status);
    
    Optional<Cart> findByUser(User user);
}

