package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.Stock;

public interface StockRepository extends JpaRepository<Stock, Integer> {

    Optional<Stock> findByProductProdIdAndVendorVendorId(int prodId, int vendorId);
    
    @Query("""
            SELECT s FROM Stock s
            WHERE s.product.category.catId = :catId
              AND s.vendor.area.areaId = :areaId
        """)
        List<Stock> findByCategoryAndArea(
            @Param("catId") int catId,
            @Param("areaId") int areaId
        );
    
    List<Stock> findByVendor_VendorId(int vendorId);

    
    @Query("""
    	    SELECT s
    	    FROM Stock s
    	    JOIN FETCH s.vendor v
    	    JOIN FETCH v.area a
    	    WHERE s.product.prodId = :productId
    	""")
    	List<Stock> findStocksByProductId(@Param("productId") int productId);

    
    List<Stock> findByVendorVendorId(int vendorId);
    
    
    
    //For Add to Cart
    @Query("SELECT s FROM Stock s WHERE s.product.prodId = :productId AND s.vendor.vendorId = :vendorId")
    Optional<Stock> findByProductIdAndVendorId(@Param("productId") int productId, @Param("vendorId") int vendorId);
    
}
