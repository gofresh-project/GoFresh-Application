using System;
using System.Collections.Generic;

namespace Admin_Backend.Models;

public partial class Cart
{
    public int CartId { get; set; }

    public int UserId { get; set; }

    public string? Status { get; set; }

    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual User User { get; set; } = null!;
}
