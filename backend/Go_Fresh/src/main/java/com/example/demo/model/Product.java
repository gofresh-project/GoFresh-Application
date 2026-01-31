package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prod_id")
    private Integer prodId;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "description")
    private String description;
    
    
    
    @Column(name = "image_url")
    private String imageUrl;


    public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	// 🔥 MANY PRODUCTS → ONE CATEGORY
    @ManyToOne
    @JoinColumn(name = "cat_id", nullable = false)
    private Category category;

 // Constructors
    public Product() {
        this.price = 0.0;  // Initialize in constructor   // To Avoid Could not write JSON: Cannot invoke "java.lang.Double.doubleValue()" because "this.price" is null
    }
    public int getProdId() {
        return prodId;
    }
    
    
    @Transient
    private Double price = 0.0;  // Initialize with default value  //Could not write JSON: Cannot invoke "java.lang.Double.doubleValue()" because "this.price" is null
    
    
    
    

    public void setProdId(int prodId) {
        this.prodId = prodId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
    
    
    
    
    
    
    
    public Double getPrice() { 
        return price != null ? price : 0.0;  // Return 0.0 if null  //Could not write JSON: Cannot invoke "java.lang.Double.doubleValue()" because "this.price" is null
    }
    
    public void setPrice(Double price) { 
        this.price = price != null ? price : 0.0;  // Never set to null  //Could not write JSON: Cannot invoke "java.lang.Double.doubleValue()" because "this.price" is null
    }	
    
    
    
    
}
