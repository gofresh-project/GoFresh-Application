using System;
using System.Collections.Generic;

namespace Admin_Backend.Models;

public partial class Stock
{
    public int StockId { get; set; }

    public int ProductId { get; set; }

    public int VendorId { get; set; }

    public double? Price { get; set; }

    public int Quantity { get; set; }

    public virtual Product Product { get; set; } = null!;

    public virtual Vendor Vendor { get; set; } = null!;
}
