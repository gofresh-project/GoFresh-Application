package com.example.demo.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "cart_items")
public class CartItem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_item_id")
    private int cartItemId;
    
    @ManyToOne
    @JoinColumn(name = "cart_id", nullable = false)
    @JsonIgnore  // Prevent circular reference in JSON
    private Cart cart;
    
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    
    @ManyToOne
    @JoinColumn(name = "vendor_id", nullable = false)
    private Vendor vendor;
    
    @Column(name = "quantity", nullable = false)
    private int quantity;
    
    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private CartItemStatus status = CartItemStatus.ADDED;
    
    // Transient field - not stored in DB, calculated from stocks
    @Transient
    private double price;
    
    // Constructors
    public CartItem() {}
    
    public CartItem(Cart cart, Product product, Vendor vendor, int quantity) {
        this.cart = cart;
        this.product = product;
        this.vendor = vendor;
        this.quantity = quantity;
        this.status = CartItemStatus.ADDED;
    }
    
    // Getters and Setters
    public int getCartItemId() { return cartItemId; }
    public void setCartItemId(int cartItemId) { this.cartItemId = cartItemId; }
    
    public Cart getCart() { return cart; }
    public void setCart(Cart cart) { this.cart = cart; }
    
    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }
    
    public Vendor getVendor() { return vendor; }
    public void setVendor(Vendor vendor) { this.vendor = vendor; }
    
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    
    public CartItemStatus getStatus() { return status; }
    public void setStatus(CartItemStatus status) { this.status = status; }
    
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    
    // Calculate total price
    public double getTotalPrice() {
        return this.price * this.quantity;
    }
}
