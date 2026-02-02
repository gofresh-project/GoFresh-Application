using System;
using System.Collections.Generic;

namespace Admin_Backend.Models;

public partial class Order
{
    public int OrderId { get; set; }

    public int OrderDetailId { get; set; }

    public DateTime Date { get; set; }

    public virtual OrderDetail OrderDetail { get; set; } = null!;
}
