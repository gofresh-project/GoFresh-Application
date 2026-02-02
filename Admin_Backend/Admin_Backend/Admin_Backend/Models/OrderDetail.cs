using System;
using System.Collections.Generic;

namespace Admin_Backend.Models;

public partial class OrderDetail
{
    public int OrderDetailsId { get; set; }

    public int CartId { get; set; }

    public int Qty { get; set; }

    public int UserId { get; set; }

    public virtual Cart Cart { get; set; } = null!;

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
