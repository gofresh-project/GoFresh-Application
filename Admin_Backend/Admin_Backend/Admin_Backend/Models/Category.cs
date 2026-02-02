using System;
using System.Collections.Generic;

namespace Admin_Backend.Models;

public partial class Category
{
    public int CatId { get; set; }

    public string? Category1 { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
