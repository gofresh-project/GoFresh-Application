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

    
//    @Query("""
//            SELECT s FROM Stock s
//            WHERE (:productId IS NULL OR s.product.productId = :productId)
//              AND (:vendorId IS NULL OR s.vendor.vendorId = :vendorId)
//              AND (:minPrice IS NULL OR s.price >= :minPrice)
//              AND (:maxPrice IS NULL OR s.price <= :maxPrice)
//              AND (:inStock IS NULL OR s.quantity > 0)
//        """)
//        List<Stock> filterStocks(
//            @Param("productId") Integer productId,
//            @Param("vendorId") Integer vendorId,
//            @Param("minPrice") Double minPrice,
//            @Param("maxPrice") Double maxPrice,
//            @Param("inStock") Boolean inStock
//        );
    
    List<Stock> findByVendorVendorId(int vendorId);
    
}
