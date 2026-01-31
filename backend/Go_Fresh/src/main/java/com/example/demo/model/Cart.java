package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@Table(name = "carts")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Cart {
 
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 @Column(name = "cart_id")
 private int cartId;
 
 @ManyToOne
 @JoinColumn(name = "user_id", nullable = false)
 private User user;
 
 @Enumerated(EnumType.STRING)
 @Column(name = "status")
 private CartStatus status;
 
 public Cart() {
     this.status = CartStatus.ACTIVE;
 }
 
 public Cart(User user) {
     this.user = user;
     this.status = CartStatus.ACTIVE;
 }
 
 // Getters and Setters
 public int getCartId() {
     return cartId;
 }
 
 public void setCartId(int cartId) {
     this.cartId = cartId;
 }
 
 public User getUser() {
     return user;
 }
 
 public void setUser(User user) {
     this.user = user;
 }
 
 public CartStatus getStatus() {
     return status;
 }
 
 public void setStatus(CartStatus status) {
     this.status = status;
 }
}