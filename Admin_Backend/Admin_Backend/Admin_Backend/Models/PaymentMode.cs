using System;
using System.Collections.Generic;

namespace Admin_Backend.Models;

public partial class PaymentMode
{
    public int PayModeId { get; set; }

    public string PaymentMethod { get; set; } = null!;
}
