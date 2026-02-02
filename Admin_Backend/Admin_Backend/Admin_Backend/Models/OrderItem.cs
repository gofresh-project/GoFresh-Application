using System;
using System.Collections.Generic;

namespace Admin_Backend.Models;

public partial class OrderItem
{
    public int OrderItemId { get; set; }

    public int OrderId { get; set; }

    public int CartId { get; set; }
}
