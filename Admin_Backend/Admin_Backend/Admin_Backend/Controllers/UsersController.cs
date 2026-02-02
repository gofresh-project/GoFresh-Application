using Admin_Backend.Models;
using Microsoft.AspNetCore.Mvc;

[Route("api/admin/users")]
[ApiController]
public class AdminUsersController : ControllerBase
{
    private readonly MyDbContext _context;

    public AdminUsersController(MyDbContext context)
    {
        _context = context;
    }

    // 1️⃣ Get all users
    [HttpGet]
    public IActionResult GetAllUsers()
    {
        if (!Request.Headers.ContainsKey("roleId"))
            return BadRequest("roleId header is missing");

        int roleId = int.Parse(Request.Headers["roleId"]);

        if (roleId != 1)
            return StatusCode(403, "Only admin can view users");

        var users = _context.Users.ToList();
        return Ok(users);
    }

    // 2️⃣ Get user by id
    [HttpGet("{id}")]
    public IActionResult GetUserById(int id)
    {
        if (!Request.Headers.ContainsKey("roleId"))
            return BadRequest("roleId header is missing");

        int roleId = int.Parse(Request.Headers["roleId"]);

        if (roleId != 1)
            return StatusCode(403, "Only admin can view user details");

        var user = _context.Users.Find(id);
        if (user == null)
            return NotFound("User not found");

        return Ok(user);
    }

    // 3️⃣ Enable / Disable user
    [HttpPut("toggle/{id}")]
    public IActionResult ToggleUserStatus(int id)
    {
        if (!Request.Headers.ContainsKey("roleId"))
            return BadRequest("roleId header is missing");

        int roleId = int.Parse(Request.Headers["roleId"]);

        if (roleId != 1)
            return StatusCode(403, "Only admin can enable/disable users");

        var user = _context.Users.Find(id);
        if (user == null)
            return NotFound("User not found");

        user.IsActive = !user.IsActive; // toggle
        _context.SaveChanges();

        return Ok(new
        {
            userId = user.UserId,
            isActive = user.IsActive
        });
    }

    // 4️⃣ Change role
    [HttpPut("changerole/{id}")]
    public IActionResult ChangeUserRole(int id, int roleIdToSet)
    {
        if (!Request.Headers.ContainsKey("roleId"))
            return BadRequest("roleId header is missing");

        int roleId = int.Parse(Request.Headers["roleId"]);

        if (roleId != 1)
            return StatusCode(403, "Only admin can change user role");

        var user = _context.Users.Find(id);
        if (user == null)
            return NotFound("User not found");

        user.RoleId = roleIdToSet;
        _context.SaveChanges();

        return Ok(user);
    }
}
