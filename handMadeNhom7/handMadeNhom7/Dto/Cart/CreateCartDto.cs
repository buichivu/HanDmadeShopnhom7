﻿namespace handMadeNhom7.Dto.Cart
{
    public class CreateCartDto
    {
        public int CustomerId { get; set; }
        public string ProductImage { get; set; }
        public string ProductName { get; set; }
        public int Price { get; set; }
        public string ProductDescription { get; set; }
        public int Quantity { get; set; }
    }
}
