using Microsoft.AspNetCore.Mvc;
using Admin_Backend.Models;

namespace Admin_Backend.Controllers
{
    [Route("api/admin/dashboard")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly MyDbContext _context;

        public DashboardController(MyDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetDashboardData()
        {
            var totalUsers = _context.Users.Count();
            var totalVendors = _context.Vendors.Count();
            var totalProducts = _context.Products.Count();
            var totalOrders = _context.Orders.Count();

            return Ok(new
            {
                users = totalUsers,
                vendors = totalVendors,
                products = totalProducts,
                orders = totalOrders
            });
        }
    }
}
