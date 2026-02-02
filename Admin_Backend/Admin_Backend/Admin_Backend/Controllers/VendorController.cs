using Admin_Backend.Models;
using Microsoft.AspNetCore.Mvc;

[Route("api/admin/vendors")]
[ApiController]
public class AdminVendorsController : ControllerBase
{
    private readonly MyDbContext _context;

    public AdminVendorsController(MyDbContext context)
    {
        _context = context;
    }

    [HttpGet("all")]
    public IActionResult GetAllVendors()
    {
        if (!Request.Headers.ContainsKey("roleId"))
            return BadRequest("roleId header is missing");

        int roleId = int.Parse(Request.Headers["roleId"]);
        if (roleId != 1)
            return StatusCode(403, "Only admin can view vendors");

        var vendors = _context.Vendors.ToList();
        return Ok(vendors);
    }


    [HttpGet("pending")]
    public IActionResult GetPendingVendors()
    {
        if (!Request.Headers.ContainsKey("roleId"))
            return BadRequest("roleId header is missing");

        int roleId = int.Parse(Request.Headers["roleId"]);

        if (roleId != 1)
            return StatusCode(403, "Only admin can view pending vendors");

        var vendors = _context.Vendors
            .Where(v => !v.IsApproved && v.IsActive)
            .ToList();

        return Ok(vendors);
    }

    [HttpGet("approved")]
    public IActionResult GetApprovedVendors()
    {
        if (!Request.Headers.ContainsKey("roleId"))
            return BadRequest("roleId header is missing");

        int roleId = int.Parse(Request.Headers["roleId"]);

        if (roleId != 1)
            return StatusCode(403, "Only admin can view approved vendors");

        var vendors = _context.Vendors
            .Where(v => v.IsApproved && v.IsActive)
            .ToList();

        return Ok(vendors);
    }

    [HttpPut("approve/{id}")]
    public IActionResult ApproveVendor(int id)
    {
        if (!Request.Headers.ContainsKey("roleId"))
            return BadRequest("roleId header is missing");

        int roleId = int.Parse(Request.Headers["roleId"]);

        if (roleId != 1)
            return StatusCode(403, "Only admin can approve vendors");

        var vendor = _context.Vendors.Find(id);
        if (vendor == null)
            return NotFound("Vendor not found");

        vendor.IsApproved = true;
        _context.SaveChanges();

        return Ok("Vendor approved successfully");
    }

    [HttpPut("disable/{id}")]
    public IActionResult DisableVendor(int id)
    {
        if (!Request.Headers.ContainsKey("roleId"))
            return BadRequest("roleId header is missing");

        int roleId = int.Parse(Request.Headers["roleId"]);

        if (roleId != 1)
            return StatusCode(403, "Only admin can disable vendors");

        var vendor = _context.Vendors.Find(id);
        if (vendor == null)
            return NotFound("Vendor not found");

        vendor.IsActive = false;
        _context.SaveChanges();

        return Ok("Vendor disabled successfully");
    }

    [HttpPut("enable/{id}")]
    public IActionResult EnableVendor(int id)
    {
        if (!Request.Headers.ContainsKey("roleId"))
            return BadRequest("roleId header is missing");

        int roleId = int.Parse(Request.Headers["roleId"]);
        if (roleId != 1)
            return StatusCode(403, "Only admin can enable vendors");

        var vendor = _context.Vendors.Find(id);
        if (vendor == null)
            return NotFound("Vendor not found");

        vendor.IsActive = true;
        _context.SaveChanges();

        return Ok("Vendor enabled successfully");
    }

}
