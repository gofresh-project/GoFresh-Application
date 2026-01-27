package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Cart;
import com.example.demo.model.CartItem;
import com.example.demo.model.Product;
import com.example.demo.model.User;
import com.example.demo.model.Vendor;
import com.example.demo.repository.CartItemRepository;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.VendorRepository;

@Service
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

    public CartItem addToCart(int userId, int productId, int vendorId, int quantity) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository
                .findByUserUserIdAndStatus(userId, "ACTIVE")
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    newCart.setStatus("ACTIVE");
                    return cartRepository.save(newCart);
                });

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));

        CartItem cartItem = cartItemRepository
                .findByCartCartIdAndProductProdIdAndVendorVendorId(
                        cart.getCartId(), productId, vendorId)
                .orElseGet(() -> {
                    CartItem item = new CartItem();
                    item.setCart(cart);
                    item.setProduct(product);
                    item.setVendor(vendor);
                    item.setQuantity(0);
                    item.setStatus("ADDED");
                    return item;
                });

        cartItem.setQuantity(cartItem.getQuantity() + quantity);

        return cartItemRepository.save(cartItem);
    }

    public List<CartItem> getCartItems(int userId) {

        Cart cart = cartRepository
                .findByUserUserIdAndStatus(userId, "ACTIVE")
                .orElseThrow(() -> new RuntimeException("No active cart found"));

        return cartItemRepository.findByCartCartId(cart.getCartId());
    }
	
	
}
