using Microsoft.AspNetCore.Mvc;
using Admin_Backend.Models;

namespace Admin_Backend.Controllers
{
    [Route("api/admin/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly MyDbContext _context;

        public ProductsController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/admin/products
        [HttpGet]
        public IActionResult GetAllProducts()
        {
            var products = _context.Products.ToList();
            return Ok(products);
        }

        // GET: api/admin/products/5
        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            var product = _context.Products.Find(id);
            if (product == null)
                return NotFound("Product not found");

            return Ok(product);
        }

        // POST: api/admin/products
        [HttpPost]
        public IActionResult AddProduct([FromBody] Product product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();
            return Ok(product);
        }

        // PUT: api/admin/products/5
        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, [FromBody] Product product)
        {
            var existing = _context.Products.Find(id);
            if (existing == null)
                return NotFound("Product not found");

            existing.ProductName = product.ProductName;
            existing.CatId = product.CatId;
            existing.Description = product.Description;
            existing.ImageUrl = product.ImageUrl;

            _context.SaveChanges();
            return Ok(existing);
        }

        // DELETE: api/admin/products/5
        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var product = _context.Products.Find(id);
            if (product == null)
                return NotFound("Product not found");

            _context.Products.Remove(product);
            _context.SaveChanges();
            return Ok("Deleted successfully");
        }

        // GET: api/admin/products/search?name=apple&catId=1
        [HttpGet("search")]
        public IActionResult SearchProducts(string? name, int? catId)
        {
            var query = _context.Products.AsQueryable();

            if (!string.IsNullOrEmpty(name))
                query = query.Where(p => p.ProductName!.Contains(name));

            if (catId != null)
                query = query.Where(p => p.CatId == catId);

            return Ok(query.ToList());
        }
    }
}
