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
@Table(name = "cart_items")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class CartItem {
 
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 @Column(name = "cart_item_id")
 private int cartItemId;
 
 @ManyToOne
 @JoinColumn(name = "cart_id", nullable = false)
 private Cart cart;
 
 @ManyToOne
 @JoinColumn(name = "product_id", nullable = false)
 private Product product;
 
 @ManyToOne
 @JoinColumn(name = "vendor_id", nullable = false)
 private Vendor vendor;
 
 @Column(name = "quantity")
 private int quantity;
 
 @Enumerated(EnumType.STRING)
 @Column(name = "status")
 private CartItemStatus status;
 
 @Column(name = "price")
 private double price;
 
 public CartItem() {
     this.status = CartItemStatus.ADDED;
 }
 
 public CartItem(Cart cart, Product product, Vendor vendor, int quantity, double price) {
     this.cart = cart;
     this.product = product;
     this.vendor = vendor;
     this.quantity = quantity;
     this.price = price;
     this.status = CartItemStatus.ADDED;
 }
 
 // Getters and Setters
 public int getCartItemId() {
     return cartItemId;
 }
 
 public void setCartItemId(int cartItemId) {
     this.cartItemId = cartItemId;
 }
 
 public Cart getCart() {
     return cart;
 }
 
 public void setCart(Cart cart) {
     this.cart = cart;
 }
 
 public Product getProduct() {
     return product;
 }
 
 public void setProduct(Product product) {
     this.product = product;
 }
 
 public Vendor getVendor() {
     return vendor;
 }
 
 public void setVendor(Vendor vendor) {
     this.vendor = vendor;
 }
 
 public int getQuantity() {
     return quantity;
 }
 
 public void setQuantity(int quantity) {
     this.quantity = quantity;
 }
 
 public CartItemStatus getStatus() {
     return status;
 }
 
 public void setStatus(CartItemStatus status) {
     this.status = status;
 }
 
 public double getPrice() {
     return price;
 }
 
 public void setPrice(double price) {
     this.price = price;
 }
}