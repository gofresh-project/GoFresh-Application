using System;
using System.Collections.Generic;

namespace Admin_Backend.Models;

public partial class Rating
{
    public int RatingId { get; set; }

    public int UserId { get; set; }

    public int VendorId { get; set; }

    public int Rating1 { get; set; }

    public virtual User User { get; set; } = null!;

    public virtual Vendor Vendor { get; set; } = null!;
}
