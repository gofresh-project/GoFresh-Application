using System;
using System.Collections.Generic;

namespace Admin_Backend.Models;

public partial class CartItem
{
    public int CartItemId { get; set; }

    public int CartId { get; set; }

    public int ProductId { get; set; }

    public int Quantity { get; set; }

    public string? Status { get; set; }

    public int VendorId { get; set; }

    public virtual Cart Cart { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;

    public virtual Vendor Vendor { get; set; } = null!;
}
