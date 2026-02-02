using System;
using System.Collections.Generic;

namespace Admin_Backend.Models;

public partial class Product
{
    public int ProdId { get; set; }

    public string? ProductName { get; set; }

    public int CatId { get; set; }

    public string? Description { get; set; }

    public string? ImageUrl { get; set; }

    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

    public virtual Category Cat { get; set; } = null!;

    public virtual ICollection<Stock> Stocks { get; set; } = new List<Stock>();
}
