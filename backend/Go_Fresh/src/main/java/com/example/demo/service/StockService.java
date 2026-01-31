	package com.example.demo.service;
	
	import java.util.List;
	
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.stereotype.Service;
	
	import com.example.demo.model.Product;
	import com.example.demo.model.Stock;
	import com.example.demo.model.Vendor;
	import com.example.demo.repository.ProductRepository;
	import com.example.demo.repository.StockRepository;
	import com.example.demo.repository.VendorRepository;
	
	
	
	@Service
	public class StockService {
	
	    @Autowired
	    private StockRepository stockRepository;
	
	    @Autowired
	    private ProductRepository productRepository;
	
	    @Autowired
	    private VendorRepository vendorRepository;
	    
	    public Stock addStock(int productId, int vendorId, double price, int quantity) {
	
	        Product product = productRepository.findById(productId)
	                .orElseThrow(() -> new RuntimeException("Product not found"));
	
	        Vendor vendor = vendorRepository.findById(vendorId)
	                .orElseThrow(() -> new RuntimeException("Vendor not found"));
	
	        Stock stock = new Stock();
	        stock.setProduct(product);
	        stock.setVendor(vendor);
	        stock.setPrice(price);
	        stock.setQuantity(quantity);
	
	        return stockRepository.save(stock);
	    }
	
	    public Stock updateStock(int stockId, double price, int quantity) {
	
	        Stock stock = stockRepository.findById(stockId)
	                .orElseThrow(() -> new RuntimeException("Stock not found"));
	
	        stock.setPrice(price);
	        stock.setQuantity(quantity);
	
	        return stockRepository.save(stock);
	    }
	    
	    
	    public List<Stock> getStocksByCategoryAndArea(int catId, int areaId) {
	        return stockRepository.findByCategoryAndArea(catId, areaId);
	    }
	    
	    
	    public List<Stock> getStocksByVendorId(int vendorId) {
	        return stockRepository.findByVendorVendorId(vendorId);
	    }
	    
	    
	    public Stock getStockById(int stockId) {
	        return stockRepository.findById(stockId)
	                .orElseThrow(() -> new RuntimeException("Stock not found"));
	    }
	
	    public void deleteStock(int stockId) {
	        stockRepository.deleteById(stockId);
	    }
	    
	    
	//    
	//    public List<Stock> getFilteredStocks(
	//            Integer productId,
	//            Integer vendorId,
	//            Double minPrice,
	//            Double maxPrice,
	//            Boolean inStock) {
	//
	//        return stockRepository.filterStocks(
	//            productId, vendorId, minPrice, maxPrice, inStock
	//        );
	//    }
	    
	    
	    
	}