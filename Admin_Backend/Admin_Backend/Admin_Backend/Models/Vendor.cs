using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Admin_Backend.Models;

public partial class Vendor
{
    public int VendorId { get; set; }

    public string BusinessRegNo { get; set; } = null!;

    public string BusinessName { get; set; } = null!;

    [Column("is_approved")]
    public bool IsApproved { get; set; }

    [Column("is_active")]
    public bool IsActive { get; set; }
    public int AreaId { get; set; }

    public int UserId { get; set; }

    public virtual Area Area { get; set; } = null!;

    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

    public virtual ICollection<Rating> Ratings { get; set; } = new List<Rating>();

    public virtual ICollection<Stock> Stocks { get; set; } = new List<Stock>();

    public virtual User User { get; set; } = null!;
}
